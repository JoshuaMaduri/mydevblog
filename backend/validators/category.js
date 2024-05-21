const {check} = require('express-validator')


// Validators

exports.categoryCreateValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is Required'),
];