const router = require('express').Router();
const Subscriber = require('../../models/Subscribers');

// GET all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.findAll();
        res.status(200).json(subscribers);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Updates a subscriber's score
router.put('/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.update(
            {
                score: req.body.score,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json(subscriber);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newSubscriber = await Subscriber.create(req.body);
        res.status(200).json(newSubscriber);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
