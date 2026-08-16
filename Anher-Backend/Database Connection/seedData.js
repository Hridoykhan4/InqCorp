const { Banners } = require('../Model/Banners')
const { Catalogue } = require('../Model/Catalogue')
const { Categories } = require('../Model/Categories')
const { Gallery } = require('../Model/Gallery')
const { Products } = require('../Model/Prodcuts')

const categories = [
    {
        name: 'Sand',
        imageUrl: ['/images/itc-sand-logistics.webp'],
        bannerImgUrl: ['/images/itc-sand-logistics.webp'],
    },
    {
        name: 'Stone Chips',
        imageUrl: ['/images/itc-stone-chips.webp'],
        bannerImgUrl: ['/images/itc-stone-chips.webp'],
    },
    {
        name: 'Boulder',
        imageUrl: ['/images/itc-boulder-yard.webp'],
        bannerImgUrl: ['/images/itc-boulder-yard.webp'],
    },
    {
        name: 'Filling Materials',
        imageUrl: ['/images/itc-site-delivery.webp'],
        bannerImgUrl: ['/images/itc-site-delivery.webp'],
    },
]

const products = [
    {
        model: 'ITC-SAND-PLASTER',
        name: 'Screened Plaster Sand',
        category: 'Sand',
        description: 'Clean, fine-graded sand selected for plaster, masonry mortar and smooth finishing work. Screening helps maintain consistent workability and reduces oversized particles on site.',
        imageUrl: ['/images/itc-sand-plaster.jpg'],
        parameter: [{ Grade: 'Fine screened' }, { Application: 'Plaster & masonry' }, { Supply: 'Bulk truck delivery' }],
    },
    {
        model: 'ITC-SAND-MEDIUM',
        name: 'Medium River Sand',
        category: 'Sand',
        description: 'General-purpose washed river sand with balanced grading for blockwork, concrete preparation and day-to-day building applications.',
        imageUrl: ['/images/itc-sand-medium.jpg'],
        parameter: [{ Grade: 'Medium' }, { Application: 'Concrete & blockwork' }, { Supply: 'Project volume' }],
    },
    {
        model: 'ITC-SAND-COARSE',
        name: 'Coarse Construction Sand',
        category: 'Sand',
        description: 'Coarse, low-silt aggregate sand for structural concrete and RCC work, supplied against project grading and volume requirements.',
        imageUrl: ['/images/itc-sand-coarse.jpg'],
        parameter: [{ Grade: 'Coarse' }, { Application: 'RCC & structural concrete' }, { Quality: 'Source-verified' }],
    },
    {
        model: 'ITC-CHIPS-05-10',
        name: 'Stone Chips 5–10 mm',
        category: 'Stone Chips',
        description: 'Small-size crushed stone aggregate for levelling, precast elements, drainage layers and specified concrete mixes.',
        imageUrl: ['/images/itc-chips-05-10.jpg'],
        parameter: [{ Size: '5–10 mm' }, { Material: 'Crushed natural stone' }, { Supply: 'Bulk' }],
    },
    {
        model: 'ITC-CHIPS-10-20',
        name: 'Stone Chips 10–20 mm',
        category: 'Stone Chips',
        description: 'The standard structural aggregate range for RCC slabs, beams, columns and foundations, selected for clean grading and dependable strength.',
        imageUrl: ['/images/itc-stone-chips.webp'],
        parameter: [{ Size: '10–20 mm' }, { Application: 'RCC structural work' }, { Supply: 'Bulk truck delivery' }],
    },
    {
        model: 'ITC-CHIPS-20-40',
        name: 'Stone Chips 20–40 mm',
        category: 'Stone Chips',
        description: 'Heavy crushed aggregate for mass concrete, deep foundations, road sub-base and infrastructure applications requiring a larger nominal size.',
        imageUrl: ['/images/itc-chips-20-40.jpg'],
        parameter: [{ Size: '20–40 mm' }, { Application: 'Mass concrete & sub-base' }, { Supply: 'Project volume' }],
    },
    {
        model: 'ITC-STONE-DUST',
        name: 'Crushed Stone Dust',
        category: 'Filling Materials',
        description: 'Finely crushed stone material used for paving-bed preparation, void filling, compaction and selected concrete or block applications.',
        imageUrl: ['/images/itc-stone-dust.jpg'],
        parameter: [{ Grade: 'Crusher fines' }, { Application: 'Paving & compaction' }, { Supply: 'Bulk' }],
    },
    {
        model: 'ITC-BOULDER-NATURAL',
        name: 'Natural Stone Boulder',
        category: 'Boulder',
        description: 'Durable natural boulder for crushing, foundation packing, erosion control and heavy civil work. Size selection is available against project requirements.',
        imageUrl: ['/images/itc-boulder-yard.webp'],
        parameter: [{ Size: 'Project-selected' }, { Application: 'Foundation & civil works' }, { Supply: 'Bulk' }],
    },
    {
        model: 'ITC-FILL-SAND',
        name: 'Selected Filling Sand',
        category: 'Filling Materials',
        description: 'Economical selected sand for controlled backfilling, plot development, floor-base preparation and general earthwork.',
        imageUrl: ['/images/itc-site-delivery.webp'],
        parameter: [{ Grade: 'Selected fill' }, { Application: 'Backfill & site preparation' }, { Supply: 'High volume' }],
    },
]

const gallery = [
    { imageUrl: '/images/itc-sand-logistics.webp', title: 'River sand loading and dispatch', order: 1 },
    { imageUrl: '/images/itc-stone-chips.webp', title: 'Graded stone-chip quality inspection', order: 2 },
    { imageUrl: '/images/itc-site-delivery.webp', title: 'Coordinated project-site delivery', order: 3 },
    { imageUrl: '/images/itc-boulder-yard.webp', title: 'Natural boulder and aggregate yard', order: 4 },
]

const banners = [
    {
        title: 'Materials that keep projects moving',
        region: 'Bangladesh',
        description: 'Quality-checked aggregates, coordinated logistics and dependable project supply.',
        imageUrl: ['/images/itc-sand-logistics.webp'],
    },
    {
        title: 'Graded stone chips for structural work',
        region: 'Project supply',
        description: 'Stone-chip sizes selected around concrete, foundation and civil-work requirements.',
        imageUrl: ['/images/itc-stone-chips.webp'],
    },
    {
        title: 'Delivery planned around your site',
        region: 'Nationwide coordination',
        description: 'Clear dispatch updates and practical delivery planning from confirmation to unloading.',
        imageUrl: ['/images/itc-site-delivery.webp'],
    },
]

const seedCoreData = async () => {
    const operations = []

    for (const category of categories) {
        operations.push(Categories.updateOne(
            { name: category.name },
            { $set: category },
            { upsert: true },
        ))
    }
    for (const product of products) {
        operations.push(Products.updateOne(
            { model: product.model },
            { $set: product },
            { upsert: true },
        ))
    }
    for (const image of gallery) {
        operations.push(Gallery.updateOne(
            { imageUrl: image.imageUrl },
            { $set: image },
            { upsert: true },
        ))
    }

    operations.push(Catalogue.updateOne(
        { title: 'ITC Construction Aggregates — Digital Catalogue' },
        {
            $set: {
                title: 'ITC Construction Aggregates — Digital Catalogue',
                description: 'A practical overview of our sand, stone-chip, boulder and filling-material supply ranges for projects across Bangladesh.',
                imageUrl: '/images/itc-site-delivery.webp',
                pdfUrl: '/pdf/itc-construction-aggregates-catalogue.pdf',
            },
        },
        { upsert: true },
    ))

    for (const banner of banners) {
        operations.push(Banners.updateOne(
            { title: banner.title },
            { $set: banner },
            { upsert: true },
        ))
    }

    await Promise.all(operations)

    return {
        categories: await Categories.countDocuments(),
        products: await Products.countDocuments(),
        gallery: await Gallery.countDocuments(),
        catalogues: await Catalogue.countDocuments(),
        banners: await Banners.countDocuments(),
    }
}

module.exports = { seedCoreData }
