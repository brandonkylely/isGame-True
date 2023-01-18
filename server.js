<<<<<<< HEAD
const express = require('express')
// const routes = require('./routes');
=======
const express = require('express');
>>>>>>> 980ee94830e515cc8d92dbbe11bc5cccc3575a7a
const app = express();
const sequelize = require('./config/connections');
const PORT = process.env.PORT || 3001;


<<<<<<< HEAD
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  });
=======
app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);
sequelize.sync().then(() => app.listen(3001, () => console.log('Server Started')));


>>>>>>> 980ee94830e515cc8d92dbbe11bc5cccc3575a7a

