const express = require('express');
require('./db/mongoose');
// const commentRouter = require('./routers/comment');
const workshopRouter = require('./routers/workshop');
const adminInfoRouter = require('./routers/adminInfo');
const couponRouter = require('./routers/coupon');

const app = express();

// Each app.use(middleware) is called every time a request is sent to the server.

app.use(express.json());
// app.use(commentRouter);
app.use(workshopRouter);
app.use(adminInfoRouter);
app.use(couponRouter);

module.exports = app;
