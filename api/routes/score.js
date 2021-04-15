// Routes pertaining to score
const express = require('express');

// get the score controller
const scoreController = require('../controllers/scoreController');

// set up the router
const router = express.Router();

// set up routes
// note how we go from the root '/'
// by mounting this route on '/score/'
// they will be accessible as
// /score/
// and
// /score/:value
router.get('/', scoreController.getScores);
router.put('/:value', scoreController.putNewScore);

// export the routes
module.exports = router;