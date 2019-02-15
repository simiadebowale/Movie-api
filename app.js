const request = require("request");
const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",function(req, res){
    res.render("search");
});

app.get("/results",(req, res)=>{
    var query = req.query.search + "&apikey=thewdb";
    var url = "http://www.omdbapi.com/?s=" + query ;
    
    request(url, (error, response, body) =>{
    if(!error && response.statusCode === 200){
        var parsedData = JSON.parse(body);
        res.render("results", {parsedData: parsedData});
    }
});
});

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("server is on!");
})