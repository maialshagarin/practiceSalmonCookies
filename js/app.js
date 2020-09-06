// here i use DOM , let  and foreach to do salmon cookies which i take in 201 


"use strict";
// // global  variable 
let footer;
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
// render on table use dom 
let container = document.getElementById('content-area');
//// create table 
let table = document.createElement('table');
container.appendChild(table);
/// create the header raw 
function headerRow() {
    let headerRow = document.createElement('tr');
    table.appendChild(headerRow);

    let th = document.createElement('th');
    headerRow.appendChild(th);
    th.textContent = "  ";

    hours.forEach(element => {
        let th = document.createElement('th');
        headerRow.appendChild(th);
        th.textContent = element;

    });
    let otherTh = document.createElement('th');
    headerRow.appendChild(otherTh);
    otherTh.textContent = "  Daily Total";
}

/// put the hourly sales inside the table to each salmon cookies shops using two foreach and DOM 

function dataInCell() {
    shopsList.forEach(element => {
        let shoprow = document.createElement('tr');
        table.appendChild(shoprow);
        let shopCell = document.createElement('Td');
        shoprow.appendChild(shopCell);
        shopCell.textContent = element.location;



        hours.forEach(hour => {

            let cellInput = document.createElement('td');
            shoprow.appendChild(cellInput);
            cellInput.textContent = element.hourlySales[hour.length];
        });

        let shopLastTd = document.createElement('td');
        shoprow.appendChild(shopLastTd);

        shopLastTd.textContent = element.dailySales;
    });

};



//  DO the footer raw which has the total for each hour and the hole total 
function footerRawData() {
    let footerRowTr = document.createElement('tr');
    footer = footerRowTr;
    table.appendChild(footerRowTr);
    let total = document.createElement('td');
    footerRowTr.appendChild(total);
    total.textContent = 'Totals';

    let megaTotal = 0;

    hours.forEach(element => {
        let td = document.createElement('td');
        footer.appendChild(td);

        let sum = 0;
        shopsList.forEach(shop => {
            sum += shop.hourlySales[element.length];
        });

        td.textContent = sum;

        megaTotal += sum;
    });
    let td = document.createElement('td');

    footer.appendChild(td);

    td.textContent = megaTotal;

}


// form 
////////////// make form , allow user to acsses that  and add the new one to the table ///
let form = document.getElementById('addNewShop');


//////////// this function create the raw which will hold the information for new shop 
function renderRaw() {
    let tr = document.createElement('tr');
    table.appendChild(tr);
    let td = document.createElement('td');
    tr.appendChild(td);
    let thecurrent = shopsList[shopsList.length - 1];
    console.log('thrrrrrrrrrrr', thecurrent);
    td.textContent = thecurrent.location;

    hours.forEach(element => {

        let info = document.createElement('td');
        tr.appendChild(info);
        info.textContent = thecurrent.hourlySales[element.length];
    });
    let newRawTd = document.createElement('td');
    tr.appendChild(newRawTd);
    newRawTd.textContent = thecurrent.dailySales;
}


/////////////// this function listen to the form we add remove the raw  of total add the new raw for the new shop via call the render then re add the total raw  
function afterSubmmit(event) {
    event.preventDefault();

    let locationName = event.target.location.value;
    let min = parseInt(event.target.min.value);
    let max = parseInt(event.target.max.value);
    let avgSales = parseFloat(event.target.average.value);


///// to control what exactly but inside the field form 
    // if (!event.target.name.value || !event.target.minCustomers.value || !event.target.maxCustomers.value || !event.target.avgSale.value) {
    //     return alert('Oops, you forgot something! Please check your entries and try again.');
    //   }
    
    //   if(event.target.minCustomers.value < 0 || event.target.maxCustomers.value < 0 || event.target.avgSale.value < 0) {
    //     return alert ('How are you putting negative values in here? Quit it, you\re not giving away customers and cookies.');
    //   }
    
    //   if (event.target.minCustomers.value > event.target.maxCustomers.value) {
    //     return alert('That\'s not how numbers work, nerd.');
    //   }
    let newShop = new SweetShops(locationName, min, max, avgSales);
    shopsList.push(newShop);
    // newShop.renderRaw(table);
    table.removeChild(footer);

    renderRaw(table);
    footerRawData(table);
}


////////calling the function ///////////
headerRow(table);
dataInCell(table);
footerRawData(table);
form.addEventListener('submit', afterSubmmit);
////////////////////////////////////////