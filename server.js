const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
const path = require('path')

const app = express()
const port = 8080

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'))

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})