const express = require('express')
const app = express()
const sequelize = require('./config/connections');


app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3001, () => console.log('Server Started'))


