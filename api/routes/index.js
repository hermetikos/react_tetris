// Route to send the web app
const express = require('express');

// set up the router
const router = express.Router();

// the default action should be to return the UI
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/build/index.html'));
});

module.exports = router;