const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const city=req.body.cityName;
    const apiKey=process.env.APIKEY;
    const url="https://api.openweathermap.org/data/2.5/weather?appid="+ apiKey+"&units=metric&q="+city;

    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp
            const weatherDesc=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imgURL="http://openweathermap.org/img/wn/"+icon+"@4x.png"

            res.write("<h1>The temperature in "+city+" is "+temp+" degree Celcius.</h1>");
            res.write("<p> The weather is currently "+weatherDesc+"</p>");
            res.write("<img src='"+imgURL+"'>");
            res.send();
        });
    });
});


app.listen(3000,function(){
    console.log("Server running at port 3000");
});