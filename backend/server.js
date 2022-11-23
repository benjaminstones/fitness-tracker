const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5001;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connection to database established successfully!')
})

app.use(cors());
app.use(express.json());

const workoutsRouter = require('./routes/workouts')
const usersRouter = require('./routes/users')
const exercisesRouter = require('./routes/exercises')

app.use('/workouts', workoutsRouter)
app.use('/users', usersRouter)
app.use('/exercises', exercisesRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})