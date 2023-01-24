const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const sequelize = require('./config');
const routes = require('./controllers');

app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {console.log(`http://localhost:3001/login`);
sequelize.sync({ force: false });
});

// const path = require('path');
// const express = require('express')
// const session = require('express-session');
// const helpers = require('./utils/helpers');
// const routes = require('./controllers');
// const sequelize = require('./config/connections');
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({ helpers});

// const app = express();
// const PORT = process.env.PORT || 3001;

// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const sess = {
//   secret: 'Super secret secret',
//   cookie: {
//     maxAge: 300000,
//     httpOnly: true,
//     secure: false,
//     sameSite: 'strict',
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));


// app.set('view engine', 'handlebars');


// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(routes)
// app.engine('handlebars', hbs);

// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
// });

