const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const {expressjwt} = require('express-jwt');


exports.signup = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }

        const { name, email, password } = req.body;
        const username = shortId.generate();
        const profile = `${process.env.CLIENT_URL}/profile/${username}`;

        const newUser = new User({ name, email, password, profile, username });
        await newUser.save();
        return res.json({
            message: 'Signup success! Please signin.'
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message || 'An error occurred during signup'
        });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, name, role } = user;
        return res.json({
            token,
            user: { _id, username, name, email, role }
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message || 'An error occurred during signin'
        });
    }
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Signout success'
    });
};

exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
});