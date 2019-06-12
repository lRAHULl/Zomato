const express       = require('express'),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      Hotel         = require("./models/hotel"),
      hotelRouter   = require("./routes/hotel"),
      userRouter    = require("./routes/user"),
      app           = express();
      
mongoose.connect("mongodb://localhost:27017/zomato_app",  { useNewUrlParser: true } );


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(hotelRouter);
app.use(userRouter);


app.get("*", (req, res) => {
    res.send("<h1>The Requested page not found.</h1><a href=/>home</a>")
})
      
const PORT = process.env.PORT;
app.listen(PORT, process.env.IP, () => {
    console.log(`Zomato server has started at port ${PORT}...`);
})