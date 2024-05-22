const { errorHandler } = require('../helpers/dbErrorHandler')
const Tags = require('../models/tags')
const slugify = require('slugify')




exports.create = async (req, res) => {
    
    try {
        const {name} = req.body
        let slug = slugify(name).toLowerCase()

        let tag = new Tags({name, slug})


        const data = await tag.save();
        res.json(data)
    } catch (err) {
        res.status(400).json({
            error: errorHandler(err)
        })
    }

}

exports.list = async (req, res) => {
    try {
        const tag = await Tags.find({})
        res.json(tag)

    }catch (err) {
        res.status(400).json({
            error: errorHandler(err)
            })
    }

}

exports.read = async (req, res) => {
    try {
        const tag = await Tags.findOne({slug: req.params.slug.toLowerCase()})
        res.json(tag)

    }catch (err) {
        res.status(400).json({
            error: errorHandler(err)
            })
    }

}


exports.remove = async (req, res) => {
    try {
        const tag = await Tags.findOneAndDelete({slug: req.params.slug.toLowerCase()})
        res.json({
            message: `Succesfully removed category ${tag}`
        })

    }catch (err) {
        res.status(400).json({
            error: errorHandler(err)
            })
    }

}