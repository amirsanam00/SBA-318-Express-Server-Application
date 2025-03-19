const express = require('express')
const router = express.Router()
const posts = require ("../data/posts")


//Query setup
router.get('/', (req, res) => {
    if(req.query.userId) {
        return res.json(posts.filter(p => p.userId == req.query.useID));
     }
     res.json(posts);
})

//New post:

router.post("/", (req, res) => {
    const newPost = {
        id: posts.length+1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content
    }
    posts.push(newPost);
    res.status(201).json(newPost);
})

module.exports = router