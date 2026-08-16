require('dotenv').config()

const mongoose = require('mongoose')
const { bootstrapAdmin } = require('../Controller/AuthController')
const { seedCoreData } = require('../Database Connection/seedData')

const main = async () => {
    if (!process.env.MongoDB_URL) throw new Error('MongoDB_URL is not configured.')

    await mongoose.connect(process.env.MongoDB_URL, {
        serverSelectionTimeoutMS: 20_000,
        connectTimeoutMS: 20_000,
        socketTimeoutMS: 30_000,
        maxPoolSize: 5,
    })

    const counts = await seedCoreData()
    const admin = await bootstrapAdmin()

    console.log(JSON.stringify({ database: mongoose.connection.name, ...counts, admin }, null, 2))
}

main()
    .then(async () => {
        await mongoose.disconnect()
        process.exit(0)
    })
    .catch(async (error) => {
        console.error(`Database setup failed: ${error.name}: ${error.message}`)
        try { await mongoose.disconnect() } catch {}
        process.exit(1)
    })
