'use strict';

const url = "http://localhost:3000";

let table = document.createElement( "table" );
main.appendChild( table );

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
    let headers = ["name", "author", "category", "publication", "price"]
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
        let toPrint = [element.book_name, element.aut_name, 
            element.cate_descrip, element.pub_name, 
            element.book_price];
        printer( toPrint );
    });
};


const render = function( data ) {
    console.log(data)
}


ajax( "GET", "/search", render, '' )