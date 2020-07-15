const express = require("express")
const app = express();
const morgan = require("morgan");
const userRoutes = require("./routes/user");
const indexRoutes = require("./routes/index");
const bodyParser = require('body-parser');
const bookRoutes = require("./routes/book");
// connect DB
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


app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(express.static('public'))

app.use("/book", bookRoutes);
app.use("/", indexRoutes);
app.use("/user", userRoutes);
const port = 8000;
app.listen(port, () => {
    console.log(`A node js API listening on port ${port}!!`)
})