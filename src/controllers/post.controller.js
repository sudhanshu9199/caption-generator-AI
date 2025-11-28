// post.controller.js
const postModel = require("../models/post.model.js");
const aiService = require("../service/ai.service.js");
const UploadFile = require('../service/storage.service.js');
const {v4: uuidv4} = require('uuid');

async function createPostController(req, res) {
    const file = req.file;
    console.log('File received:', file);

    const base64Image = Buffer.from(file.buffer).toString('base64');

    const caption = await aiService(base64Image);
    console.log('Generate caption:', caption);

    const dataUri = `data:${file.mimetype};base64,${base64Image}`;
    const result = await UploadFile(dataUri, `${uuidv4()}`);

    const post = await postModel.create({
        caption,
        image: result.url,
        user: req.user._id
    })

    res.status(201).json({
        message: 'post created successfully',
        post
    })

    // res.json({
    //     caption,
    //     result
    // })
    
}
module.exports = { createPostController };