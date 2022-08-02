const mongooose = require('mongoose');
const express = require("express")
const DATABASE = 'mongodb://mymongo:27017/testup';

const app =express()

mongooose.connect(DATABASE).then(() => {
    console.log(`DB connected`)
}).catch(err => {
    console.log(`Error in db connection`)
})


app.get('/', (req, res) => {
    res.send('<h1>You are visiting the root account</h1>')
})

app.listen(8000, () => {
    console.log(`App is listening in 8000`)
})