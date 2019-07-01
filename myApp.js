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

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  .post('/', function (req, res) {
    var sql = "SELECT * FROM users WHERE usrname = \'" + req.params.usr + "\'";

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows[0].usrname);

        res.render('pages/dbTest', {usrname : result.rows[0].usrname, firstn : result.rows[0].firstn, lastn : result.rows[0].lastn});
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
