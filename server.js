const express = require('express')
// const routes = require('./routes');
const app = express();
const sequelize = require('./config/connections');
const PORT = process.env.PORT || 3001;


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('index.html'));

// const subscribersRouter = require('./routes/subscribers')
// app.use('/subscribers', subscribersRouter)

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  });

