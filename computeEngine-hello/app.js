const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/hello', function (req, res) {
    res.send('Hello ' + req.query.who + " !")
})

app.listen(3000, function () {
    console.log('listening on port 3000!')
})
