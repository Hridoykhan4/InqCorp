const mongoose = require('mongoose')

mongoose.set('bufferCommands', false)

let retryTimer = null
let connectPromise = null
let onConnected = null
let shuttingDown = false

const isDatabaseReady = () => mongoose.connection.readyState === 1

const scheduleRetry = () => {
    if (retryTimer || shuttingDown || isDatabaseReady()) return
    retryTimer = setTimeout(() => {
        retryTimer = null
        ConnnectDB().catch(() => {})
    }, 10_000)
    retryTimer.unref?.()
}

const ConnnectDB = async (options = {}) => {
    if (options.onConnected) onConnected = options.onConnected
    if (isDatabaseReady()) return mongoose.connection
    if (connectPromise) return connectPromise

    const uri = process.env.MongoDB_URL?.trim()
    if (!uri) {
        console.error('MongoDB connection skipped: MongoDB_URL is not configured.')
        scheduleRetry()
        return null
    }

    connectPromise = mongoose.connect(uri, {
        serverSelectionTimeoutMS: 12_000,
        connectTimeoutMS: 12_000,
        socketTimeoutMS: 30_000,
        heartbeatFrequencyMS: 10_000,
        maxPoolSize: 10,
        minPoolSize: 0,
    })
        .then(async (connection) => {
            console.log(`MongoDB connected: ${connection.connection.name}`)
            if (onConnected) {
                try {
                    await onConnected()
                } catch (error) {
                    console.error('Database bootstrap error:', error.message)
                }
            }
            return connection.connection
        })
        .catch((error) => {
            console.error(`MongoDB unavailable (${error.name}). Retrying in 10 seconds.`)
            scheduleRetry()
            return null
        })
        .finally(() => {
            connectPromise = null
        })

    return connectPromise
}

mongoose.connection.on('disconnected', () => {
    if (!shuttingDown) {
        console.warn('MongoDB disconnected. Reconnect scheduled.')
        scheduleRetry()
    }
})

mongoose.connection.on('error', (error) => {
    console.error(`MongoDB runtime error: ${error.name}`)
})

const requireDatabase = (req, res, next) => {
    if (isDatabaseReady()) return next()
    return res.status(503).json({
        message: 'Content service is reconnecting. Please try again shortly.',
        code: 'DATABASE_UNAVAILABLE',
    })
}

const closeDatabase = async () => {
    shuttingDown = true
    if (retryTimer) clearTimeout(retryTimer)
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect()
}

module.exports = { ConnnectDB, closeDatabase, isDatabaseReady, requireDatabase }
