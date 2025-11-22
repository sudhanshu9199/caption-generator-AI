const express = require('express');
const authRoutes = require('./routes/auth.route.js')
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(cookieParser());

module.exports = app;