const express = require("express")
const app = express();
const morgan = require("morgan");
const userRoutes = require("./routes/user");
const indexRoutes = require("./routes/index");
const bodyParser = require('body-parser');
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/post';
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
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, 'MongoDB connection error: '));

app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(express.static('public'))


app.use("/", indexRoutes);
app.use("/user", userRoutes);
const port = 8000;
app.listen(port, () => {
    console.log(`A node js API listening on port ${port}!!`)
})