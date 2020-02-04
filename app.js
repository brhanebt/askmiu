const express = require("express");
const app = express();
const dotenv = require('dotenv')
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
const postRoute = require('./routes/posts');
const topicRoute = require('./routes/createTopic');
var cors = require('cors')
var followTopics = require('./routes/followtopics');
var cors = require('cors');
var logger = require('morgan');
var fs = require('fs');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{ useUnifiedTopology: true },//   { useNewUrlParser: true },
  () => console.log("Connected to Db")
);

app.set('etag', false); // turn off
app.disable('x-powered-by');


app.use(cors())

app.use(express.json());

app.use(logger('dev'));
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
// setup the logger
app.use(logger('combined', { stream: accessLogStream }));

app.use("/api/v1/user", authRouter);
app.use("/api/v1/posts",postRoute);

app.use("/api/v1/topic", topicRoute);
app.use("/api/v1/topics",followTopics);
app.listen(8080);
