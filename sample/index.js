require('dotenv').config();

var upload = multer();

const app = express();

app.use(cors());
app.use(express.static('assets'))
// app.use(upload.array());
app.use(bodyParser.json());
app.use('/api', userRoute);
app.use(express.static("public"));


//initializing session
app.use(session({
  name:"shadebook_admin_cookie",
  secret: "There is no any secret",
  resave: false,
  saveUninitialized: false
}));

//database connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Mongod connected Successfully");
});

mongoose.set("useCreateIndex", true);

//server
app.listen(process.env.PORT || 4001, function() {
  console.log(`server started in development mode on port ${process.env.PORT || 4001}`);
});