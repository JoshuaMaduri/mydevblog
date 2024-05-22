const { errorHandler } = require('../helpers/dbErrorHandler')
const Category = require('../models/category')
const slugify = require('slugify')


exports.create = async (req, res) => {
    
    try {
        const {name} = req.body
        let slug = slugify(name).toLowerCase()

        let category = new Category({name, slug})


        const data = await category.save();
        res.json(data)
    } catch (err) {
        res.status(400).json({
            error: errorHandler(err)
        })
    }

}

exports.list = async (req, res) => {
    try {
        const category = await Category.find({})
        res.json(category)

    }catch (err) {
        res.status(400).json({
            error: errorHandler(err)
            })
    }

}

exports.read = async (req, res) => {
    try {
        const category = await Category.findOne({slug: req.params.slug.toLowerCase()})
        res.json(category)

    }catch (err) {
        res.status(400).json({
            error: errorHandler(err)
            })
    }

}


exports.remove = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({slug: req.params.slug.toLowerCase()})
        res.json({
            message: `Succesfully removed category ${category}`
        })

    }catch (err) {
        res.status(400).json({
            error: errorHandler(err)
            })
    }

}