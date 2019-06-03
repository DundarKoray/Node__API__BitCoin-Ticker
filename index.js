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
    let crypto = req.body.crypto
    let fiat = req.body.fiat

    let baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"
    let finalURL = `${baseURL}${crypto}${fiat}`

    request(finalURL, function(error, response, body){
        // console.log(body)
        let data = JSON.parse(body)
        let currentPrice = data.last
        let weeklyAvarage = data.averages.week
        
        let currentDate = data.display_timestamp

        //if you need to send more then one item, you need to use res.write and at the end res.end
        res.write(`<p>The current date is ${currentDate}</p>`)
        res.write(`<h1>The current price of ${crypto} is ${currentPrice}${fiat}</h1>`)
        res.send()
        console.log('Currently', currentPrice)
        console.log('Weekly Avarage', weeklyAvarage)
    })
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.")
})
