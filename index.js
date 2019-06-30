const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 6464

var urlEncodedParser = bodyParser.urlencoded({ extended:false })

const { Pool, Client } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://hzlvifvfwjyloq:6a03cc31b99ce4f5a1454d76693e216452a71764894ca2287ef2a234ca3388d2@ec2-54-243-47-196.compute-1.amazonaws.com:5432/dba1e4ra4k189n?ssl=true'

const pool = new Pool({
  connectionString: connectionString,
})

const client = new Client({
  connectionString: connectionString,
})
client.connect()

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
    if (weight <= 4) {
      price = 3.66;
    } else if (weight <= 8) {
      price = 4.39;
    } else if (weight <= 12) {
      price = 5.19;
    } else if (weight <= 13) {
      price = 5.71;
    }
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
    res.render('pages/results', {param1 : parseFloat(req.body.param1), param2 : req.body.param2, param3 : rateCalc(parseFloat(req.body.param1), req.body.param2).toFixed(2)});
  })
  .get('/:usr', function (req, res) {
    var sql = "SELECT * FROM myTable WHERE usrname = \'" + req.params.usr + "\'";

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows[0].usrname);

        res.render('pages/dbTest');
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
