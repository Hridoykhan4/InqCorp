const nodemailer = require('nodemailer')

// Both company inboxes receive every enquiry.
const RECIPIENTS = ['info@safetyplus.com', 'safetyplusindustry@gmail.com']

let transporter = null

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

    const { name = '', email = '', phone = '', subject = '', description = '', type = 'contact' } = data

    const html = `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
          <h2 style="color:#b91c1c;margin:0 0 12px">New ${type} enquiry — SafetyPlus</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:6px 0;font-weight:bold;width:120px">Name</td><td>${name}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Email</td><td>${email}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Phone</td><td>${phone}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Subject</td><td>${subject}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;vertical-align:top">Message</td><td>${description}</td></tr>
          </table>
        </div>`

    try {
        await tx.sendMail({
            from: `"SafetyPlus Website" <${process.env.MAIL_USER || process.env.SMTP_USER}>`,
            to: RECIPIENTS.join(','),
            replyTo: email || undefined,
            subject: `New enquiry: ${subject || name || 'Website contact'}`,
            html,
        })
        return true
    } catch (err) {
        console.error('sendQueryMail failed:', err.message)
        return false
    }
}

module.exports = { sendQueryMail, RECIPIENTS }
