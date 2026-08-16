const nodemailer = require('nodemailer')

// Both company inboxes receive every enquiry.
const RECIPIENTS = ['kawsar2nt1@gmail.com', 'info@inqilabtrading.com']

let transporter = null

const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

// Build the transporter once from env. Supports either a Gmail app password
// (MAIL_USER + MAIL_PASS) or a generic SMTP host (SMTP_HOST/PORT/USER/PASS).
const getTransporter = () => {
    if (transporter) return transporter

    if (process.env.SMTP_HOST) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        })
    } else if (process.env.MAIL_USER && process.env.MAIL_PASS) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
        })
    }

    return transporter
}

// Send a new-enquiry notification to both inboxes. Never throws — mail failure
// must not break the query-save flow.
const sendQueryMail = async (data = {}) => {
    const tx = getTransporter()
    if (!tx) {
        console.warn('Mailer not configured (set MAIL_USER/MAIL_PASS or SMTP_*). Skipping email.')
        return false
    }

    const safe = Object.fromEntries(
        Object.entries({ name: data.name, email: data.email, phone: data.phone, subject: data.subject, description: data.description, type: data.type || 'contact' })
            .map(([key, value]) => [key, escapeHtml(value)]),
    )

    const html = `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
          <div style="background:linear-gradient(135deg,#0F2257,#1B3A8A);padding:20px 24px;border-radius:10px 10px 0 0">
            <h2 style="color:#C49B2B;margin:0;font-size:18px;letter-spacing:.04em">Kawsar Anher — Inqilab Trading Corporation</h2>
            <p style="color:rgba(255,255,255,.7);margin:4px 0 0;font-size:13px">New ${safe.type} enquiry from the website</p>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px;padding:20px 24px">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:7px 0;font-weight:bold;width:110px;color:#374151">Name</td><td style="color:#111827">${safe.name}</td></tr>
              <tr style="background:#f9fafb"><td style="padding:7px 0;font-weight:bold;color:#374151">Email</td><td style="color:#111827">${safe.email}</td></tr>
              <tr><td style="padding:7px 0;font-weight:bold;color:#374151">Phone</td><td style="color:#111827">${safe.phone}</td></tr>
              <tr style="background:#f9fafb"><td style="padding:7px 0;font-weight:bold;color:#374151">Subject</td><td style="color:#111827">${safe.subject}</td></tr>
              <tr><td style="padding:7px 0;font-weight:bold;vertical-align:top;color:#374151">Message</td><td style="color:#111827">${safe.description}</td></tr>
            </table>
            <p style="margin:16px 0 0;font-size:11px;color:#9ca3af">Sent from inqilabtradingcorporation.com.bd — reply directly to this email to respond to ${safe.name}.</p>
          </div>
        </div>`

    try {
        await tx.sendMail({
            from: `"Kawsar Anher Website" <${process.env.MAIL_USER || process.env.SMTP_USER}>`,
            to: RECIPIENTS.join(','),
            replyTo: data.email || undefined,
            subject: `New enquiry: ${String(data.subject || data.name || 'Website contact').replace(/[\r\n]+/g, ' ').slice(0, 160)}`,
            html,
        })
        return true
    } catch (err) {
        console.error('sendQueryMail failed:', err.message)
        return false
    }
}

module.exports = { sendQueryMail, RECIPIENTS }
