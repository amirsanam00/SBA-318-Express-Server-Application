const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

//Midlleware part
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))
app.use(express.json())

//View Engine:
app.set("view engine", 'ejs');
// app.set ("views", )

const users = require("./routes/user")
const posts = require("./routes/post")
const comments = require("./routes/comments")


app.use("/users", users)
app.use("/posts", posts)
app.use("/comments", comments)

//Home Route:
app.get("/", (req, res) => {
    res.render(indexedDB, {title: "Home Page"})
})

// Error-Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})