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
    let location = req.ipInfo.city
    res.render("index", {location: location});
});

//Connecting to ports
app.listen(process.env.PORT  || 3000, function(){
    console.log("App connected");
});



