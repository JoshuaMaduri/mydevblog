const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tags');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');

exports.create = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }

        const { title, body, categories, tags } = fields;

        if (!title || title.trim().length === 0) {
            return res.status(400).json({
                error: 'Title is required'
            });
        }

        if (!body || body.trim().length < 200) {
            return res.status(400).json({
                error: 'Content is too short'
            });
        }

        if (!categories || categories.split(',').length === 0) {
            return res.status(400).json({
                error: 'At least one category is required'
            });
        }

        if (!tags || tags.split(',').length === 0) {
            return res.status(400).json({
                error: 'At least one tag is required'
            });
        }

        let blog = new Blog();
        blog.title = title;
        blog.body = body;
        blog.slug = slugify(title).toLowerCase();
        blog.mtitle = `${title} | ${process.env.APP_NAME}`;
        blog.mdesc = stripHtml(body.substring(0, 160)).result;
        blog.postedBy = req.auth._id;

        let arrayOfCategories = categories.split(',');
        let arrayOfTags = tags.split(',');

        console.log(arrayOfCategories)
        console.log(arrayOfTags)

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.type;
        }

        try {


            const result = await blog.save();

            const categoryIds = await Category.find({ name: { $in: arrayOfCategories } }).distinct('_id');
            const tagIds = await Tag.find({ name: { $in: arrayOfTags } }).distinct('_id');

            // Update blog with category IDs
            const updatedBlogWithCategoriesAndTags = await Blog.findByIdAndUpdate(
                result._id,
                { $push: { categories: { $each: categoryIds }, tags: {$each: tagIds} } }, // Push category IDs into the categories array
                { new: true }
            );
        
           res.json(updatedBlogWithCategoriesAndTags)

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
    });
};
