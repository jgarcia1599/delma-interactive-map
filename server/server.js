const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/hifrombackend', function(req, res) {
    results='hello everybody !'
    res.send(JSON.stringify(results));
  }); 

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))