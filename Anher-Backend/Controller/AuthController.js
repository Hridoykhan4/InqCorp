const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const { Admin } = require('../Model/admin')

const TOKEN_TTL_SECONDS = 60 * 60 * 12
const attempts = new Map()

const getSessionSecret = () => {
    const configured = process.env.SESSION_SECRET?.trim()
    if (configured) return configured

    // Development fallback only. Production deployments should always provide
    // SESSION_SECRET (see .env.example / COOLIFY.md).
    return crypto
        .createHash('sha256')
        .update(`${process.env.MongoDB_URL || 'local'}:${process.env.ADMIN_PASSWORD || 'development'}`)
        .digest('hex')
}

const encode = (value) => Buffer.from(value).toString('base64url')

const sign = (value) =>
    crypto.createHmac('sha256', getSessionSecret()).update(value).digest('base64url')

const createSessionToken = (admin) => {
    const now = Math.floor(Date.now() / 1000)
    const payload = encode(JSON.stringify({
        sub: admin._id.toString(),
        email: admin.email,
        role: admin.role,
        iat: now,
        exp: now + TOKEN_TTL_SECONDS,
    }))

    return `${payload}.${sign(payload)}`
}

const verifySessionToken = (token) => {
    if (!token || typeof token !== 'string') return null
    const [payload, signature] = token.split('.')
    if (!payload || !signature) return null

    const expected = sign(payload)
    const actualBuffer = Buffer.from(signature)
    const expectedBuffer = Buffer.from(expected)
    if (
        actualBuffer.length !== expectedBuffer.length ||
        !crypto.timingSafeEqual(actualBuffer, expectedBuffer)
    ) return null

    try {
        const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
        if (!data?.sub || !data?.exp || data.exp <= Math.floor(Date.now() / 1000)) return null
        return data
    } catch {
        return null
    }
}

const publicAdmin = (admin) => ({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
})

const checkRateLimit = (req) => {
    const key = req.ip || req.socket?.remoteAddress || 'unknown'
    const now = Date.now()
    const windowMs = 15 * 60 * 1000
    const current = attempts.get(key)

    if (!current || current.resetAt <= now) {
        attempts.set(key, { count: 1, resetAt: now + windowMs })
        return true
    }

    current.count += 1
    return current.count <= 7
}

const clearRateLimit = (req) => {
    attempts.delete(req.ip || req.socket?.remoteAddress || 'unknown')
}

const login = async (req, res) => {
    if (!checkRateLimit(req)) {
        return res.status(429).json({ message: 'Too many login attempts. Please try again later.' })
    }

    const email = String(req.body?.email || '').trim().toLowerCase()
    const password = String(req.body?.password || '')

    if (!email || !password || password.length > 200) {
        return res.status(400).json({ message: 'Email and password are required.' })
    }

    try {
        const admin = await Admin.findOne({ email, status: true }).select('+password')
        const valid = admin ? await bcrypt.compare(password, admin.password) : false

        if (!valid) {
            return res.status(401).json({ message: 'Invalid email or password.' })
        }

        clearRateLimit(req)
        return res.json({
            message: 'Login successful',
            user: publicAdmin(admin),
            token: createSessionToken(admin),
            expiresIn: TOKEN_TTL_SECONDS,
        })
    } catch (error) {
        console.error('Login error:', error.message)
        return res.status(503).json({ message: 'Admin sign-in is temporarily unavailable.' })
    }
}

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '')
    const sessionData = verifySessionToken(token)

    if (!sessionData) {
        return res.status(401).json({ message: 'Your admin session is missing or has expired.' })
    }

    try {
        const admin = await Admin.findOne({ _id: sessionData.sub, status: true }).lean()
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Administrator access is required.' })
        }
        req.admin = publicAdmin(admin)
        next()
    } catch (error) {
        next(error)
    }
}

const session = (req, res) => res.json({ user: req.admin })

const bootstrapAdmin = async () => {
    const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()
    const password = String(process.env.ADMIN_PASSWORD || '')

    if (!email || !password) {
        console.warn('Admin bootstrap skipped: ADMIN_EMAIL and ADMIN_PASSWORD are not configured.')
        return { configured: false }
    }
    if (password.length < 10) {
        throw new Error('ADMIN_PASSWORD must be at least 10 characters long.')
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const existing = await Admin.findOne({ email }).select('+password')

    if (existing) {
        const passwordMatches = await bcrypt.compare(password, existing.password)
        existing.name = existing.name || 'ITC Administrator'
        existing.role = 'admin'
        existing.status = true
        if (!passwordMatches) existing.password = passwordHash
        await existing.save()
        return { configured: true, created: false, email }
    }

    await Admin.create({
        name: 'ITC Administrator',
        email,
        password: passwordHash,
        role: 'admin',
        status: true,
    })
    return { configured: true, created: true, email }
}

module.exports = {
    authenticate,
    bootstrapAdmin,
    createSessionToken,
    login,
    session,
    verifySessionToken,
}
