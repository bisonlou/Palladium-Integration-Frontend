const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('build'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'build', index.js))
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);


