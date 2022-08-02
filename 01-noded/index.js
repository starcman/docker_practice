const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/login', (req, res) => {
    res.json({ success: true, message: 'login successfull'})
})

app.get('/register', (req, res) => {
    res.json({ success: true, message: 'registeration successfull'})
})

app.listen(8000, () => {
    console.log(`listening on port 8000`)
})