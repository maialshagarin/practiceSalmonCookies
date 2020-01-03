// here i use jQuery to do salmon cookies which i take in 201 


"use strict";
// // global  variable 
// let footer;
let hours = ["6 am ", "7 am ", "8 am ", "9 am ", "10 am ", "11 am ", "12 am ", "1 pm ", "2 pm ", "3 pm ", "4 pm ", "5 pm ", "6 pm ", "7 pm "];


// constructor function 
function SweetShops(location, minCus, maxCus, theAverge) {
    this.location = location;
    this.minCus = minCus;
    this.maxCus = maxCus;
    this.theAverge = theAverge;
    this.hourlySales = []; // store the result of each our 
    this.dailySales = 0; // calculating the sum of th hour 
    this.random();
    this.hourlyDailySales();

};


// caluclate a random number (a method to generate a random number of customers per hour which is value above the minCus )
SweetShops.prototype.random = function () {
    let range = this.maxCus - this.minCus;
    let rand = Math.random() * range + this.minCus;
    return Math.ceil(rand);
}


// calculating the sales per our push it in array then sum the hourly sales to get the daily sale 
SweetShops.prototype.hourlyDailySales = function () {
    hours.forEach(element => {
        let cookiesSoldThisHour = Math.ceil(this.random() * this.theAverge);
        this.hourlySales.push(cookiesSoldThisHour);
        this.dailySales += cookiesSoldThisHour;

    });
}


// set the data of each shop to the constactour function  
let seattle = new SweetShops('Seattle', 23, 65, 6.3);
let tokyo = new SweetShops('Tokyo', 3, 24, 1.2);
let dubai = new SweetShops('Dubai', 11, 38, 3.7);
let paris = new SweetShops('Paris', 20, 38, 2.3);
let lima = new SweetShops('Lima', 2, 16, 4.6);

let shopsList = [seattle, tokyo, paris, lima, dubai]



// ///////////////////////////////////////////////////////////////////
// render on table use jquery  
$('#content-area').html('<table></table>');
let row = $(`<tr></tr>`);
let headerRowCell = $(`<th></th>`);
let cell = $(`<td></td>`);






////////// header row /////////////

function headerRow() {
    //     let headerRow = document.createElement('tr');
    //     table.appendChild(headerRow);
    $('table').append(row.append(headerRowCell.text('xxxxx')));

    hours.forEach(element => {
        // console.log("element", element)
        $('tr').append(`<th>${element}</th>`)
    });
    $('tr').append(`<th> Daily total <th>`);
}





///// cell information for table ( table body) //////

function dataInCell() {
    // to show the name of location 
    shopsList.forEach(element => {
        $('table').append($(`<tr class ="${element.location}" ><td> ${element.location}</td></tr>`));
        // to add the daily sale for each hour for each shop 
        hours.forEach(hour => {

            $(`.${element.location}`).append($(`<td>${element.hourlySales[hour.length]}</td>`))
        });
        $(`.${element.location}`).append($(`<td>${element.dailySales}</td>`))
    });
}



//  DO the footer raw which has the total for each hour and the hole total 
function footerRawData() {
    $('table').append($(`<tr class ="TheFooter" > <td>Totals</td></tr>)`));
    let megaTotal = 0;

    hours.forEach(element => {
        let sum = 0;
        shopsList.forEach(shop => {
            sum += shop.hourlySales[element.length];
        });
        $(`.TheFooter`).append(`<td>${sum} </td>`)

        megaTotal += sum;
    });

    $(`.TheFooter`).append(`<td>${megaTotal}</td>`)

}




// //////////// this function create the raw which will hold the information for new shop that came from the form in the below function 
function renderRaw() {
    let thecurrent = shopsList[shopsList.length - 1];
    $('table').append($(`<tr class ="${thecurrent.location}" ><td> ${thecurrent.location}</td></tr>`));
   
    hours.forEach(element => {

        $(`.${thecurrent.location}`).append(`<td>${thecurrent.hourlySales[element.length]} </td>`)

    });

    $(`.${thecurrent.location}`).append($(`<td>${thecurrent.dailySales}</td>`))


}




// form 
// ////////////// make form , allow user to acsses that  and add the new one to the table ///
$('#addNewShop').submit(function (afterSubmmit) {
    afterSubmmit.preventDefault();

    let locationName = event.target.location.value;
    let min = parseInt(event.target.min.value);
    let max = parseInt(event.target.max.value);
    let avgSales = parseFloat(event.target.average.value);

    let newShop = new SweetShops(locationName, min, max, avgSales);
    shopsList.push(newShop);
//////remove the footer row then render the new one after that return the footer row 
    $(`.TheFooter`).remove();

    renderRaw(shopsList[-1]);
    footerRawData();

})




// ////////calling the function ///////////
headerRow();
dataInCell();
footerRawData();
// ////////////////////////////////////////