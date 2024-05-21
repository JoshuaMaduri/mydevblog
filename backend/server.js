const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose')
// bring routes
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

// app
const app = express();

//db
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log('DB connected'))
    .catch(() => console.log('DB not working'))

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// cors
app.use(cors());
if (process.env.NODE_ENV == 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}

// routes
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});