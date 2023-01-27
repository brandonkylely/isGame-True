const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const sequelize = require('./config');
const routes = require('./controllers');

app = express();
const PORT = process.env.PORT || 3001;

// reference: https://www.piesocket.com/blog/nodejs-websocket
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3002 });

// creating connection with websocket
wss.on("connection", ws => {
  console.log("new client connect");
// sending message
  ws.on("message", data => {
    console.log(`Client has sent us: ${data}`)
  });
  // handling when client disconnects
  ws.on("close", () => {
    console.log("the client has disconnected");
  });
  ws.onerror = function () {
    console.log("Some error occured")
  }
});
console.log("The websocket server is running on port 3001")


const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
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

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/login`);
  sequelize.sync({ force: false });
});

