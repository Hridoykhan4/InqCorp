const mongoose=require('mongoose')

const Schema=mongoose.Schema

const ProductSchema=Schema({
    model:String,
    name:String,
    category:String,

    description:String,
    imageUrl:[String],
    parameter:[{ type: Object }],
    pdf: { type: Object }
},
{
    timestamps:true
}
)

const Products=mongoose.model('products',ProductSchema)

module.exports={
    Products
}