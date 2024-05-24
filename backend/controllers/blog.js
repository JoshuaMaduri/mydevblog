const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tags');
const formidable = require('formidable');
const slugify = require('slugify');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');

exports.create = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true; // Allow multiple files
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }

        console.log('Fields:', fields);
        console.log('Files:', files);
        console.log(req.auth._id)

        const { title, body, categories, tags } = fields;

        if (!title || !Array.isArray(title) || typeof title[0] !== 'string' || title[0].length == 0) {
            return res.status(400).json({
                error: 'Title is required and should be a string'
            });
        }

        if (!body || !Array.isArray(body) || typeof body[0] !== 'string' || body[0].length == 0) {
            return res.status(400).json({
                error: 'Body is required and should be a string'
            });
        }

        if (!categories || !Array.isArray(categories) || typeof categories[0] !== 'string' || categories[0].length == 0) {
            return res.status(400).json({
                error: 'At least one category is required'
            })
        };

        if (!tags || !Array.isArray(tags) || typeof tags[0] !== 'string' || tags[0].length == 0) {
            return res.status(400).json({
                error: 'At least one tag is required'
            })
        };

        // Dynamically import the string-strip-html module
        const { stripHtml } = await import('string-strip-html');

        

        let blog = new Blog();
        blog.title = title[0];
        blog.body = body[0];
        blog.slug = slugify(title[0]).toLowerCase();
        blog.mtitle = `${title[0]} | ${process.env.APP_NAME}`;
        blog.mdesc = stripHtml(body[0].substring(0, 160)).result;
        blog.postedBy = req.auth._id;
        //blog.categories = categories;
        //blog.tags = tags;

        let arrayOfCategories = categories && categories.split(',');
        let arrayOfTags = tags && tags.split(',');


        if (files.photo) {
            if (files.photo[0].size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 10mb in size'
                });
            }
            blog.photo.data = fs.readFileSync(files.photo[0].filepath);
            blog.photo.contentType = files.photo[0].mimetype;
        }

        try {
            const result = await blog.save();
            res.json(result);
        } catch (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
    });
};
