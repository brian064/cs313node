const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 6464

var urlEncodedParser = bodyParser.urlencoded({ extended:false })

function rateCalc(weight, type) {
  var price;
  if (type == "sLetters") {
    if (weight <= 1) {
      price = parseFloat(0.55);
    } else if (weight <= 2) {
      price = parseFloat("0.70");
    } else if (weight <= 3) {
      price = parseFloat("0.85");
    } else if (weight <= 3.5) {
      price = parseFloat("1.00");
    }
  }

  else if (type == "mLetters") {
    if (weight <= 1) {
      price = parseFloat(0.50);
    } else if (weight <= 2) {
      price = parseFloat(0.65);
    } else if (weight <= 3) {
      price = parseFloat(0.80);
    } else if (weight <= 3.5) {
      price = parseFloat(0.95);
    }
  }

  else if (type == "lEnvelopes") {
    if (weight <= 1) {
      price = parseFloat(1.00);
    } else if (weight <= 2) {
      price = parseFloat(1.15);
    } else if (weight <= 3) {
      price = parseFloat(1.30);
    } else if (weight <= 4) {
      price = parseFloat(1.45);
    } else if (weight <= 5) {
      price = parseFloat(1.60);
    } else if (weight <= 6) {
      price = parseFloat(1.75);
    } else if (weight <= 7) {
      price = parseFloat(1.90);
    } else if (weight <= 8) {
      price = parseFloat(2.05);
    } else if (weight <= 9) {
      price = parseFloat(2.20);
    } else if (weight <= 10) {
      price = parseFloat(2.35);
    } else if (weight <= 11) {
      price = parseFloat(2.50);
    } else if (weight <= 12) {
      price = parseFloat(2.65);
    } else if (weight <= 13) {
      price = parseFloat(2.80);
    }
  }

  else if (type == "fcps") {
    price = parseFloat(100);
  }

  return parseFloat(price).toFixed(2);
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  .get('/', (req, res) => res.render('pages/home'))
  .post('/result', urlEncodedParser, function (req, res){
    res.render('pages/results', {param1 : parseInt(req.body.param1), param2 : req.body.param2, param3 : parseInt(rateCalc(parseInt(req.body.param1), req.body.param2))});
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
