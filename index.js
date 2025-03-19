const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const PORT = 3000

//Midlleware part
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json())

//Import routes
const users = require("./routes/users")
const posts = require("./routes/posts")
const comments = require("./routes/comments")

//Use routes
app.use("/users", users)
app.use("/posts", posts)
app.use("/comments", comments)

//Home Route:
app.get("/", (req, res) => {
res.render("index", {title: "Home Page"})
})

//Custom Middleware:Logs the requests:
const loggerMiddleware = (req, res, next) => {
console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
next();
};

app.use(loggerMiddleware); 

//Custom Middleware: Authentication:
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers [`authorization`];
    if(!authHeader || authHeader !== 'Bearer secret-token'){
        return res.status(403).json({message: "Access denied: Invalid token"});
    }
    next();
};

// Error-Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};

//EJS
app.set('view engine', 'ejs')
app.set ('views', './views')

//Static file:
app.use(express.static("./public"));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})