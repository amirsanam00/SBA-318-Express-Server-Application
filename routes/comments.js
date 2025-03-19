const express = require ('express')
const router = express.Router()

const comments = require("../data/comments")


//all comments:
router.get("/", (req, res) => {
    res.json(comments)
})

//Access comments for specific post:
router.get("/post/:postId", (req, res) => {
    res.json(comments.filter(c => c.postId == req.params.postId));
});

//Adding new comments:
router.post("/", (req, res) => {
    const newComment ={
        id: comments.length+1,
        postId: req.body.ostId,
        text: req.body.text
    }

    comments.push(newComment);
    res.status(201).json(newComment);
})

module.exports = router