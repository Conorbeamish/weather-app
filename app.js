const   express     = require("express"),
        request     = require("request"),
        bodyParser  = require("body-parser"),
        expressIp   = require("express-ip");

const app = express()

//Set to serve ejs files
app.set("view engine", "ejs")

//Serve static files
app.use(express.static("public"))

//Use body parser
app.use(bodyParser.urlencoded({ extended: true }));

//Get user Ip location
app.use(expressIp().getIpInfoMiddleware);

//ROUTES
app.get("/", (req, res) => {
    let city = req.ipInfo.city
    let country = req.ipInfo.country
    res.render("index", {city: city, country: country});
});

app.post("/", (req, res) => {

})

//==End ROUTES==

//Connecting to ports
app.listen(process.env.PORT  || 3000, function(){
    console.log("App connected");
});



