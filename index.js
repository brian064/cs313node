const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 6464

var urlEncodedParser = bodyParser.urlencoded({ extended:false })

function rateCalc(weight, type) {
  var price;
  if (type == "sLetters") {
    if (weight <= 1) {
      price = 0.55;
    } else if (weight <= 2) {
      price = 0.70;
    } else if (weight <= 3) {
      price = 0.85;
    } else if (weight <= 3.5) {
      price = 1.00;
    }
  }

  else if (type == "mLetters") {
    if (weight <= 1) {
      price = 0.50;
    } else if (weight <= 2) {
      price = 0.65;
    } else if (weight <= 3) {
      price = 0.80;
    } else if (weight <= 3.5) {
      price = 0.95;
    }
  }

  else if (type == "lEnvelopes") {
    if (weight <= 1) {
      price = 1.15;
    } else if (weight <= 2) {
      price = 1.15;
    } else if (weight <= 3) {
      price = 1.30;
    } else if (weight <= 4) {
      price = 1.45;
    } else if (weight <= 5) {
      price = 1.60;
    } else if (weight <= 6) {
      price = 1.75;
    } else if (weight <= 7) {
      price = 1.90;
    } else if (weight <= 8) {
      price = 2.05;
    } else if (weight <= 9) {
      price = 2.20;
    } else if (weight <= 10) {
      price = 2.35;
    } else if (weight <= 11) {
      price = 2.50;
    } else if (weight <= 12) {
      price = 2.65;
    } else if (weight <= 13) {
      price = 2.80;
    }
  }

  else if (type == "fcps") {
    price = 100;
  }

  return price;
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  .get('/', (req, res) => res.render('pages/home'))
  .post('/result', urlEncodedParser, function (req, res){
    res.render('pages/results', {param1 : parseInt(req.body.param1), param2 : req.body.param2, param3 : rateCalc(parseInt(req.body.param1), req.body.param2)});
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
