const express = require('express')
const app = express()

const morgan = require('morgan')

app.use(morgan('tiny'));

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/hello', function (req, res) {
    res.send('Hello ' + req.query.who + " !")
});


var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port ' + server.address().port);
});
