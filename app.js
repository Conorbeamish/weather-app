const   express     = require("express"),
        request     = require("request"),
        bodyParser  = require("body-parser"),
        expressIp   = require("express-ip"),
        apiKey      = process.env.OPEN_WEATHER_MAP;

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
    let city = req.ipInfo.city;
    let country = req.ipInfo.country;
    let url = "http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}"
    request(url, (err, response, body) => {
        if(err){
            res.render("index", {weather: null, error: "woops theres an error", city: city, country: country});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render("index", {weather: null, error: "theres been an error", city: city, country: country});
            } else {
                let weatherDisplay = "It's ${weather.main.temp} degrees"
                res.render("index", {city: city, country: country, weather: weatherDisplay});
            }
        }
    })
});

app.post("/", (req, res) => {
    let city = req.body.city
    let country = req.body.city
    res.render("index", {city: city, country: country});
})

//==End ROUTES==

//Connecting to ports
app.listen(process.env.PORT  || 3000, function(){
    console.log("App connected");
});



