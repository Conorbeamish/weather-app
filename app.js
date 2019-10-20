const   express     = require("express"),
        request     = require("request"),
        bodyParser  = require("body-parser");

const app = express()

//Set to serve ejs files
app.set("view engine", "ejs")

//Serve static files
app.use(express.static("public"))

//Routes
app.get("/", (req, res) => {
    res.render("index");
});

//Connecting to ports
const port = process.env.port || 3000
app.listen(port, function(){
    console.log("App connected on port " + port)
});



