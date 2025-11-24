const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "unauthenticated, please login first.",
        })
    }

    try {
        const decoded = jwt.verify(token, process.JWT_SECRET)
        
    } catch (error) {
        return res.status(401).json({
            message: "invalid token, please login first.",
        })
    }
})

module.exports = router;