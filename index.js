const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 6464

var urlEncodedParser = bodyParser.urlencoded({ extended:false })

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/home', (req, res) => res.render('pages/home'))
  .post('/result', urlEncodedParser, function (req, res){
    res.render('pages/results', {param1 : parseInt(req.body.param1), param2 : parseInt(req.body.param2)});
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
