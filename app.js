const   express     = require("express"),
        request     = require("request"),
        bodyParser  = require("body-parser"),
        expressIp   = require("express-ip");

const app = express()

//Set to serve ejs files
app.set("view engine", "ejs")

//Serve static files
app.use(express.static("public"))

//Get user Ip location
app.use(expressIp().getIpInfoMiddleware);

//Routes
app.get("/", (req, res) => {
    let location = req.ipInfo
    res.render("index", {location: location});
});

//Connecting to ports
const port = process.env.port || 3000
app.listen(port, function(){
    console.log("App connected on port " + port)
});



