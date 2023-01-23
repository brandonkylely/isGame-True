const express = require('express')
// const routes = require('./routes');
const app = express();
const sequelize = require('./config/connections');
const PORT = process.env.PORT || 3001;
// reference: https://www.piesocket.com/blog/nodejs-websocket
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: 3001 });

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

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  });

