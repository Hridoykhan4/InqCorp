require('dotenv').config()

const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const { router } = require('./Routes/route')
const {
    ConnnectDB,
    closeDatabase,
    isDatabaseReady,
} = require('./Database Connection/DB_Connection')
const { Supports } = require('./Model/support')
const { sendQueryMail } = require('./Functions/mailer')
const { bootstrapAdmin, verifySessionToken } = require('./Controller/AuthController')
const { seedCoreData } = require('./Database Connection/seedData')

const app = express()
const server = http.createServer(app)

const defaultOrigins = [
    'https://inqilabtradingcorporation.com.bd',
    'https://www.inqilabtradingcorporation.com.bd',
    'http://localhost:5173',
    'http://localhost:4173',
]

const allowedOrigins = [...new Set([
    ...defaultOrigins,
    ...(process.env.URLS || '').split(','),
].map((origin) => origin.trim().replace(/\/+$/, '')).filter(Boolean))]

const isAllowedOrigin = (origin) => {
    if (!origin) return true
    return allowedOrigins.includes(origin.replace(/\/+$/, ''))
}

const corsOptions = {
    origin(origin, callback) {
        if (isAllowedOrigin(origin)) return callback(null, true)
        return callback(new Error('Origin is not allowed'))
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86_400,
}

app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(cors(corsOptions))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: false, limit: '1mb' }))
app.use((_req, res, next) => {
    res.set({
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Cross-Origin-Resource-Policy': 'cross-origin',
    })
    next()
})

const io = new Server(server, {
    cors: corsOptions,
    transports: ['websocket', 'polling'],
    pingTimeout: 20_000,
})

app.set('io', io)
app.use((req, _res, next) => {
    req.io = io
    next()
})

app.use('/api', router)

app.use('/api/*path', (_req, res) => {
    res.status(404).json({ message: 'API route not found.' })
})

app.use((err, req, res, _next) => {
    const status = err.status || (err.message === 'Origin is not allowed' ? 403 : 500)
    console.error(`${req.method} ${req.originalUrl}:`, err.name || 'Error')
    res.status(status).json({
        message: status >= 500 ? 'The service could not complete this request.' : err.message,
    })
})

const onlineAdmins = new Set()

io.on('connection', (socket) => {
    const session = verifySessionToken(socket.handshake.auth?.token)
    if (session?.role === 'admin') onlineAdmins.add(socket.id)

    socket.on('join', (token) => {
        const joinedSession = verifySessionToken(token || socket.handshake.auth?.token)
        if (joinedSession?.role === 'admin') onlineAdmins.add(socket.id)
    })

    socket.on('sendQueries', async (payload = {}, acknowledge) => {
        const reply = typeof acknowledge === 'function'
            ? acknowledge
            : (data) => socket.emit('insertedSupport', data)

        if (!isDatabaseReady()) {
            return reply({ message: 'We are reconnecting. Please try again in a moment.', status: 503 })
        }

        const query = {
            name: String(payload.name || '').trim().slice(0, 100),
            phone: String(payload.phone || '').trim().slice(0, 30),
            type: String(payload.type || '').trim().slice(0, 80),
            email: String(payload.email || '').trim().toLowerCase().slice(0, 160),
            subject: String(payload.subject || '').trim().slice(0, 160),
            description: String(payload.description || '').trim().slice(0, 3000),
        }

        if (!query.name || !query.phone || !query.description) {
            return reply({ message: 'Name, phone and project details are required.', status: 400 })
        }

        try {
            const result = await Supports.create(query)
            sendQueryMail(query).catch((error) => console.error('Mail delivery error:', error.message))

            reply({ message: 'Thank you. Your enquiry has been received.', status: 200 })
            for (const socketId of onlineAdmins) {
                io.to(socketId).emit('queries', { data: result })
            }
        } catch (error) {
            console.error('Enquiry save error:', error.message)
            reply({ message: 'We could not send this enquiry. Please call or WhatsApp us.', status: 500 })
        }
    })

    socket.on('disconnect', () => onlineAdmins.delete(socket.id))
})

const initializeDatabase = async () => {
    await seedCoreData()
    await bootstrapAdmin()
}

ConnnectDB({ onConnected: initializeDatabase }).catch(() => {})

const port = Number(process.env.PORT) || 5000
server.requestTimeout = 30_000
server.headersTimeout = 35_000
server.keepAliveTimeout = 5_000

server.listen(port, () => {
    console.log(`ITC API listening on port ${port}`)
})

const shutdown = async (signal) => {
    console.log(`${signal} received. Closing cleanly.`)
    server.close(async () => {
        await closeDatabase()
        process.exit(0)
    })
    setTimeout(() => process.exit(1), 10_000).unref()
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error?.message || error)
})
