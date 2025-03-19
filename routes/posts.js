const express = require('express')
const router = express.Router()
let posts = require ("../data/posts")


//Query setup
router.get('/', (req, res) => {
    if(req.query.userId) {
        return res.json(posts.filter(p => p.userId == req.query.userId));
     }
     res.json(posts);
});

//New post:

router.post("/", (req, res) => {
    const newPost = {
        id: posts.length > 0 ? posts[posts.length -1].id +1 : 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content
    }
    posts.push(newPost);
    res.status(201).json(newPost);
})

//Single post:

router.get("/:id", (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if(!post) return res.status(404).json({error: 'Post not found'})
        res.json(post);
});


module.exports = router