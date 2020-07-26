const express = require("express")
const serverless = require('serverless-http');
const app = express();
const morgan = require("morgan");
const methodOverride  = require("method-override");
const userRoutes = require("./routes/user");
const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const bookRoutes = require("./routes/book");
const dotenv = require('dotenv');
const busboy = require('connect-busboy');


// connect DB
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://galtv1:anh12345@cluster0.we2qo.mongodb.net/boor_store';
mongoose.connect(mongoDB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    () => {
        console.log("connect DB successfully");
    },
    err => {
        console.log(`connection failed. Error: ${err}`)
    }
);

app.use(busboy());
app.use(methodOverride('_method'));
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/book", bookRoutes);
app.use("/", indexRoutes);

const port = process.env.PORT|| 8000;
app.listen(port, () => {
    console.log(`A node js API listening on port ${port}!!`)
})

module.exports.handler = serverless(app);