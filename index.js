const path = require('path');
const express = require('express');
require('./db/mongoose');
const workshopRouter = require('./routers/workshop');
const adminInfoRouter = require('./routers/adminInfo');
const couponRouter = require('./routers/coupon');
const commentRouter = require('./routers/comment');

const app = express();

// Each app.use(middleware) is called every time a request is sent to the server.

app.use(express.json());
app.use(workshopRouter);
app.use(adminInfoRouter);
app.use(couponRouter);
app.use(commentRouter);

// Serving React app on {port}
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API Running!');
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
