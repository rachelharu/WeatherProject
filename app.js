const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
res.sendFile(__dirname + "/index.html");

});

app.post("/", (req, res) =>{
  const query = req.body.cityName;
  const apiKey = "7fa0575826c4f0218e8806652496ba2c";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently" + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">")
      res.send()
    })
  })
})



app.listen(3000, () => {
  console.log("server is running on port 3000");
})
