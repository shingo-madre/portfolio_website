const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const routes = require('./routes/routes')

require('dotenv').config();

const app = express()
const port = 9000
const mongoString = process.env.DATABASE_URL
const localMongoString = process.env.LOCAL_DB_URL

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'))

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(cors())

app.use('/', routes);

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})