//router for handling requests to milestones
const express = require('express');
const router = express.Router();

//GET milestones - dummy implementation
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /milestones'
    });
});

module.exports = router;