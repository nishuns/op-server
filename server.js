// ** import all files
const express = require("express"); // ** npm install express @desc framework used to create REST API
const path = require("path"); // ** inbuilt dependency @desc get access to various function for paths
const mongoose = require("mongoose"); // ** npm install mongoose @desc give access to mongodb database
const sessions = require("express-session"); // ** npm install express-session @desc create sessions
const multer = require("multer"); // ** npm install multer @desc used as body-parser
const cors = require("cors"); // ** npm install cors @desc used to access cors services
// const mongoStore = require("mongo-connect")(sessions); // ** npm install mongo-connect @desc create session in db
require("dotenv").config(); // ** npm install dotenv @desc used to get all env varibles

// ** initialise app
const app = express();
// ** env variables
const { APP_NAME, PORT, DATABASE_URL, SESSIONS_SECRET } = process.env;

// ** initialise multer
var upload = multer();

// ** adding static folder
app.use(express.static(path.join(__dirname, "assets")));
// ** adding JSON reciever as body
app.use(express.json());
// ** use cors
app.use(cors());
// ** adding routes
app.use("/api", require("./routes/index"));
// ** adding sessions
app.use(
   sessions({
      name: "yor_admin_cookie",
      secret: SESSIONS_SECRET,
      resave: false,
      saveUninitialized: false
   })
);

// ** database connection
mongoose
   .connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => {
      console.log("Database Connected Successfully");
   }).catch((error) => {
      throw new Error(error);
   });

const port = PORT || 4001;
app.listen(port, () => {
   console.log(`${APP_NAME} is listening at http://localhost:${port}`);
});
