const express = require('express');
const path = require('path');
const app = express();

port = process.env.SERVER_PORT | 3000;

app.use(express.static(path.join(__dirname, '../app/build')));

// the default action should be to return the UI
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port::${port}`);
})