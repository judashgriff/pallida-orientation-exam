'use strict';

const url = "http://localhost:3000";

let table = document.createElement( "table" );
document.body.appendChild( table );
const input = document.querySelector("#input")
const button = document.querySelector("#button");
const brand = document.querySelector("#brand")
const polBtn = document.querySelector("#pol");
const dipBtn = document.querySelector("#dip");
let branded;

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

const brandClickListener = function() {
    branded.forEach( function( element ) {
        element.addEventListener( 'click', function() {
            console.log( element.textContent );
            ajax( "GET", `/search?brand=${element.textContent}`, render, '' );
        });
    });
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
    element.forEach( function( each, i ) {
        let tableCell = document.createElement( "td" );
        tableCell.textContent = each;
        if ( i === 1 ) {
            tableCell.classList.add("brandItem");
        };
        tableRow.appendChild( tableCell );
    });
    table.appendChild( tableRow );
    branded = document.querySelectorAll(".brandItem")
    brandClickListener()
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

const isSubmitOk = function( bool ) {
    return bool;
} 

const checkAlphaNumeric = function( inputtxt ) {  
    let submitOk;
    let letterNumber = /^[0-9a-zA-Z\-]+$/;  
    if ( inputtxt.match( letterNumber ) && inputtxt.length <= 7 || inputtxt == "" ) {
        submitOk = true;
        isSubmitOk( true );
        return true;
    } else {   
        submitOk = false;
        isSubmitOk( false );
        return false;
    }; 
};

button.addEventListener( "click", function() {
    let inputValue = input.value;
    const validChars = checkAlphaNumeric( inputValue );
    let inputField = brand.value ? "?brand=" : "?q="
    let radio = "";
    let query = "";
    if ( polBtn.checked || dipBtn.checked ) {
        if ( polBtn.checked ) {
            radio = "police=1";
        } else if ( dipBtn.checked ) {
            radio = "diplomat=1"
        };
        query = `?q=${inputValue}&${radio}`;
        if ( brand.value ){
            query += `&brand=${brand.value}`;
        }; 
    } else {
        if ( inputValue ) {
            query = `?q=${inputValue}`;
            if ( brand.value ){
                query += `&brand=${brand.value}`;
            };
        } else {
            query = ``
            if ( brand.value ){
                query += `?brand=${brand.value}`;
            }
        };
    };
    if (isSubmitOk) {
        ajax( "GET", `/search${query}`, render, '' );
    } else {
        alert( "Sorry, the submitted licence plate is not valid" );
    };
});

const render = function( data ) {
    console.log( data );
    table.innerHTML = "";
    printOrganiser( data );
}

