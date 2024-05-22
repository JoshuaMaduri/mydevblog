const {check} = require('express-validator')


// Validators

exports.tagCreateValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is Required'),
];