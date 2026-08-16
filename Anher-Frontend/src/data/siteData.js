export const FALLBACK_CATEGORIES = [
  { _id: 'sand', name: 'Sand', imageUrl: ['/images/itc-sand-logistics.webp'], bannerImgUrl: ['/images/itc-sand-logistics.webp'] },
  { _id: 'stone-chips', name: 'Stone Chips', imageUrl: ['/images/itc-stone-chips.webp'], bannerImgUrl: ['/images/itc-stone-chips.webp'] },
  { _id: 'boulder', name: 'Boulder', imageUrl: ['/images/itc-boulder-yard.webp'], bannerImgUrl: ['/images/itc-boulder-yard.webp'] },
  { _id: 'filling-materials', name: 'Filling Materials', imageUrl: ['/images/itc-site-delivery.webp'], bannerImgUrl: ['/images/itc-site-delivery.webp'] },
]

export const FALLBACK_PRODUCTS = [
  {
    _id: 'plaster-sand', model: 'ITC-SAND-PLASTER', name: 'Screened Plaster Sand', category: 'Sand',
    description: 'Clean, fine-graded sand for plaster, masonry mortar and smooth finishing work.',
    imageUrl: ['/images/itc-sand-plaster.jpg'],
    parameter: [{ Grade: 'Fine screened' }, { Application: 'Plaster & masonry' }, { Supply: 'Bulk delivery' }],
  },
  {
    _id: 'medium-sand', model: 'ITC-SAND-MEDIUM', name: 'Medium River Sand', category: 'Sand',
    description: 'Balanced general-purpose river sand for blockwork, concrete preparation and building applications.',
    imageUrl: ['/images/itc-sand-medium.jpg'],
    parameter: [{ Grade: 'Medium' }, { Application: 'Concrete & blockwork' }, { Supply: 'Project volume' }],
  },
  {
    _id: 'coarse-sand', model: 'ITC-SAND-COARSE', name: 'Coarse Construction Sand', category: 'Sand',
    description: 'Source-verified coarse aggregate sand selected for structural concrete and RCC work.',
    imageUrl: ['/images/itc-sand-coarse.jpg'],
    parameter: [{ Grade: 'Coarse' }, { Application: 'RCC & structural concrete' }, { Quality: 'Source-verified' }],
  },
  {
    _id: 'chips-5-10', model: 'ITC-CHIPS-05-10', name: 'Stone Chips 5–10 mm', category: 'Stone Chips',
    description: 'Small-size crushed stone for drainage layers, precast elements and specified concrete mixes.',
    imageUrl: ['/images/itc-chips-05-10.jpg'],
    parameter: [{ Size: '5–10 mm' }, { Material: 'Crushed natural stone' }, { Supply: 'Bulk' }],
  },
  {
    _id: 'chips-10-20', model: 'ITC-CHIPS-10-20', name: 'Stone Chips 10–20 mm', category: 'Stone Chips',
    description: 'Standard structural aggregate for RCC slabs, beams, columns and foundations.',
    imageUrl: ['/images/itc-stone-chips.webp'],
    parameter: [{ Size: '10–20 mm' }, { Application: 'RCC structural work' }, { Supply: 'Bulk delivery' }],
  },
  {
    _id: 'chips-20-40', model: 'ITC-CHIPS-20-40', name: 'Stone Chips 20–40 mm', category: 'Stone Chips',
    description: 'Heavy crushed aggregate for mass concrete, deep foundations and road sub-base.',
    imageUrl: ['/images/itc-chips-20-40.jpg'],
    parameter: [{ Size: '20–40 mm' }, { Application: 'Mass concrete & sub-base' }, { Supply: 'Project volume' }],
  },
  {
    _id: 'stone-dust', model: 'ITC-STONE-DUST', name: 'Crushed Stone Dust', category: 'Filling Materials',
    description: 'Crusher fines for paving beds, controlled compaction and selected block applications.',
    imageUrl: ['/images/itc-stone-dust.jpg'],
    parameter: [{ Grade: 'Crusher fines' }, { Application: 'Paving & compaction' }, { Supply: 'Bulk' }],
  },
  {
    _id: 'natural-boulder', model: 'ITC-BOULDER-NATURAL', name: 'Natural Stone Boulder', category: 'Boulder',
    description: 'Durable natural boulder for crushing, foundation packing, erosion control and civil work.',
    imageUrl: ['/images/itc-boulder-yard.webp'],
    parameter: [{ Size: 'Project-selected' }, { Application: 'Foundation & civil works' }, { Supply: 'Bulk' }],
  },
  {
    _id: 'fill-sand', model: 'ITC-FILL-SAND', name: 'Selected Filling Sand', category: 'Filling Materials',
    description: 'Selected material for controlled backfilling, plot development and floor-base preparation.',
    imageUrl: ['/images/itc-site-delivery.webp'],
    parameter: [{ Grade: 'Selected fill' }, { Application: 'Backfill & site preparation' }, { Supply: 'High volume' }],
  },
]

export const FALLBACK_GALLERY = [
  { _id: 'gallery-sand', imageUrl: '/images/itc-sand-logistics.webp', title: 'River sand loading and dispatch', order: 1 },
  { _id: 'gallery-chips', imageUrl: '/images/itc-stone-chips.webp', title: 'Graded stone-chip quality inspection', order: 2 },
  { _id: 'gallery-delivery', imageUrl: '/images/itc-site-delivery.webp', title: 'Coordinated project-site delivery', order: 3 },
  { _id: 'gallery-boulder', imageUrl: '/images/itc-boulder-yard.webp', title: 'Natural boulder and aggregate yard', order: 4 },
]

export const FALLBACK_CATALOGUES = [{
  _id: 'digital-catalogue',
  title: 'ITC Construction Aggregates — Digital Catalogue',
  description: 'Sand, stone-chip, boulder and filling-material ranges for projects across Bangladesh.',
  imageUrl: '/images/itc-site-delivery.webp',
  pdfUrl: '/pdf/itc-construction-aggregates-catalogue.pdf',
}]
