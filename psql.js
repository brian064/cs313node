const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

var urlEncodedParser = bodyParser.urlencoded({ extended:false })

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/dbTest'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
