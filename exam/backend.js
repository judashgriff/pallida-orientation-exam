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

app.get( '/search', function( req, res ) {
    console.log( req.query );
    let selector = '';
    if ( Object.keys( req.query ).length > 0 ) {
        selector += "WHERE"
        selector += req.query.q ? ` plate LIKE '%${req.query.q}%' AND` : ''
        selector += req.query.police ? ` plate LIKE 'RB%' AND` : ''
        selector += req.query.diplomat ? ` plate LIKE 'DT%' AND` : ''
        if ( req.query.brand ) {
            selector += ` car_brand LIKE '%${req.query.brand}%'`
        };
    }; 
    if ( selector.endsWith( 'AND' )) {
        selector = selector.substr( 0, selector.length - 4 );
    }; 
  
    let query = `SELECT plate, car_brand, car_model, color, year FROM licence_plates ${selector};`;

    connection.query( query, function( err, result ) {
        if ( err ) {
            console.log( err );
            res.send( { "result": "error", "message": "invalid input" } );
            return;
        };
    res.json( result );
    });
});

app.get( '/search/', function( req, res ) {
    console.log( req.query );
    let selector = '';
    selector += `WHERE car_brand = ${req.query.q}`
    let query = `SELECT plate, car_brand, car_model, color, year FROM licence_plates ${selector};`;

    console.log( query );

    connection.query( query, function( err, result ) {
        if ( err ) {
            console.log( err );
            res.send( { "result": "error", "message": "invalid input" } );
            return;
        };
    res.json( result );
    });
});

app.listen( 3000, function() {
    console.log( "The server is up and runing on port 3000" )
});