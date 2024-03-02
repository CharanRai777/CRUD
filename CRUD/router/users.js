// router/users.js

const express = require('express');
const router = express.Router();
const User = require('../model/user');
router.get('/add', (req, res) => {
    res.render('add_user', { title: 'Add User' });
});
// POST route to handle adding a new user
router.post('/add', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        // Create a new user instance
        const newUser = new User({ name, email, phone });
        // Save the user to the database
        await newUser.save();
        res.send('User added successfully');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Error adding user');
    }
});

module.exports = router;
