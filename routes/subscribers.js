const express = require('express');
const Subscribers = require('../models/Subscribers');
const router = express.Router()

// Getting all subscribers
router.get('/', async (req, res) => {
try {
    const userData = await Subscribers.findAll();
    res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// Creating One
router.post('/', async (req, res) => {
    try {
        const userData = await Subscribers.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
})
// Getting One
router.get('/:id', async (req, res) => {
    try {
        const userData = await Subscribers.findByPk(req.params.id);
        if (!userData) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Updating One
router.put('/:id', async (req, res) => {
    try {
        const userData = await Subscribers.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (userData[0]) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})
// Deleting One
router.delete('/:id', async (req, res) => {
    try {
        const userData = await Subscribers.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!userData) {
            res.status(404).json({ message: 'No user with this id!'})
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router