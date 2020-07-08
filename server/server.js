const csvToJson = require('csvtojson');
const express = require('express')
const app = express()
const port = 5000

//path to csv file we want to make into json
const path_to_csv = 'data/delma.csv'

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/hifrombackend', (req, res) =>{
    results='hello everybody !'
    res.send(JSON.stringify(results));
  }); 

app.get('/delmadata',(req,res) =>{
  csvToJson().fromFile(path_to_csv)
  .then((jsonObj)=>{
    res.send(jsonObj);
  })

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))