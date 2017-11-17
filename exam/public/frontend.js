'use strict';

const url = "http://localhost:3000";

let body = document.querySelector( "body" );
let table = document.createElement( "table" );
body.appendChild( table );
const input = document.querySelector("#input")
const button = document.querySelector("#button");



const ajax = function( method, res, callback, data ) {
    const xhr = new XMLHttpRequest();
    data = data ? data : null;
    xhr.open( method, url + res );
    xhr.setRequestHeader( 'Content-Type', 'application/json' );
    xhr.send( JSON.stringify( data ) );
    xhr.onreadystatechange = function() {
        if ( xhr.readyState === XMLHttpRequest.DONE ) {
            callback( JSON.parse( xhr.response ) );
        };
    };
};




let capitalize = ( header ) => {return header[0].toUpperCase() + header.slice( 1 )};

function headerMaker( className, header ) {
    let myTableHeader = document.createElement( "th" );
    myTableHeader.textContent = capitalize( className );
    header.appendChild( myTableHeader );
};

function header () {
    let headers = ["Licence plate", "Brand", "Model", "Color", "Year"]
    let header = document.createElement( "tr" );
    headers.forEach( function( element ) {
        headerMaker( element, header );
    });
    table.appendChild( header );
};

function printer( element ) {
    let tableRow = document.createElement( "tr" );
    element.forEach( function( each ) {
        let tableCell = document.createElement( "td" );
        tableCell.textContent = each;
        tableRow.appendChild( tableCell );
    });
    table.appendChild( tableRow );
};

function printOrganiser( item ) {
    header();
    item.forEach( function( element, i ) {
        let toPrint = [element.plate, element.car_brand, 
            element.car_model, element.color, 
            element.year];
        printer( toPrint );
    });
};


let submitOk = true;

const checkAlphaNumeric = function( inputtxt ) {  
    let letterNumber = /^[0-9a-zA-Z\-]+$/;  
    if ( inputtxt.match( letterNumber ) || inputtxt == "" ) {
        submitOk = true;
        return true;
    } else {   
        submitOk = false;
        return false;
    }; 
};

button.addEventListener( "click", function() {
    table.innerHTML = "";
    let inputValue = input.value;
    const validChars = checkAlphaNumeric( inputValue );
    let query = `?q=${inputValue}`;
    submitOk = inputValue.length <= 7 ? true : false;
    submitOk ? ajax( "GET", `/search${query}`, render, '' ) : alert( "Sorry, the submitted licence plate is not valid" );

})

const render = function( data ) {
    console.log( data );
    printOrganiser( data );
}

