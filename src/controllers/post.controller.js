// post.controller.js
const postModel = require("../models/post.model.js");
const aiService = require("../service/ai.service.js");

async function createPostController(req, res) {
    const file = req.file;
    console.log('File received:', file);

    const base64Image = new Buffer.from(file.buffer).toString('base64');

    const caption = await aiService(base64Image);
    console.log('Generate caption:', caption);

    res.json({
        caption
    })
    
}
module.exports = { createPostController };