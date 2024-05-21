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
            error: err
        })
    }

}