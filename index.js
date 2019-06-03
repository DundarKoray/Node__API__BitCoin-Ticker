const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const app = express()

app.use('/style.css', express.static(__dirname +'/style.css'));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

//this prints whatever is selected in first section BTC, LTC, ETH
app.post("/", function(req, res){
    // console.log(req.body.crypto)

    request("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", function(error, response, body){
        console.log(body)
    })
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.")
})
