const express = require('express')
const router = express.Router()
let users = require("../data/users")


router
    .get("/", (req, res) => {
    res.json(users)
})


//Use Id to find specific user:
router.get("/:id", (req, res) => {
    const user = users.find( u => u.id === parseInt(req.params.id));
    if (!user) return res.status (404).json({error: "User not found"});
    res.json(user);
})

//Create a new user:
router.post('/', (req, res) => {
    const newUser = { 
        id: users.length >0 ? users[users.length -1].id:1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
})

//Updating user info:
router.put("/:id", (req, res) => {
    const user = users.find(u => u.id == parseInt(req.params.id));
    if(!user) return res.status(404).json({error: "User not found"});

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json(user);
});

//Delete user:
router.delete ("/:id", (req, res) => {
    const usersIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if(usersIndex === -1) 
        return res.status(404).json({error: "User not found"})

    users.splice(usersIndex, 1);
    res.json({message: "User deleted"})
});

module.exports = router