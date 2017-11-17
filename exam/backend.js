'use strict' 

const mysql = require('mysql');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/', express.static("./public"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'exam'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

app.get('/search', function( req, res ) {
//   console.log(req.query.category)
  let selector = '';
//   if (Object.keys(req.query).length > 0) {
//     selector += "WHERE"
//     selector += req.query.category ? ` cate_descrip = \'${req.query.category}\' AND` : ''
//     selector += req.query.publisher ? ` pub_name = \'${req.query.publisher}\' AND` : ''
//     selector += req.query.plt ? ` book_price < \'${req.query.plt}\' AND` : ''
//     selector += req.query.pgt ? ` book_price > \'${req.query.pgt}\' AND` : ''
//   } 
//   if (selector.endsWith('AND')) {
//     selector = selector.substr(0, selector.length - 4);
//   }; 
  
  let qu = `
  SELECT plate, car_brand, car_model, color, year FROM licence_plates
  ${selector};`;

  console.log(qu);

    connection.query(qu, function( err, result ) {
        if ( err ) {
            console.log( err.toString());
        return;
    };
        res.json( result );
    });
});

app.listen(3000, function() {
    console.log("The server is up and runing on port 3000")
})