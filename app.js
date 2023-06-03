var baseUrl = "https://api.coinranking.com/v2/coins";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "coinrankingc032026f93e3b94c047c89523ca837327c4dac81e1070686";

var apiUrl = `${proxyUrl}${baseUrl}`;
console.log(apiUrl);

var coinsData, table, sortColumn;
var sortAsc = false;

document.addEventListener('DOMContentLoaded', initializeTable, false);

async function initializeTable() {

  // Select the table
  table = document.querySelector('#cryptoTable tbody');

  // Get All Coins
  const response = await fetch(apiUrl)
  const coins = await response.json()
  coinsData = coins.data.coins

  //Intialize Table
  renderTable();

  // Implement sorting when clicked on table header
  document.querySelectorAll('#cryptoTable thead tr th').forEach(element => {
    element.addEventListener('click', sort, false);
  });

}

//Render Table
function renderTable() {

  if (coinsData.length > 0) {
    var cryptoCoin = "";
  }
  // create html
  coinsData.forEach(coin => {
    console.log(coinsData);
    cryptoCoin += "<tr>";
    cryptoCoin += `<td> ${coin.uuid} </td>`;
    cryptoCoin += `<td> ${coin.btcPrice} </td>`;
    cryptoCoin += `<td> ${coin.rank}</td>`;
    cryptoCoin += `<td> ${coin.tier} </td>`;
    cryptoCoin += `<td> ${coin.name}</td>`;
    cryptoCoin += `<td> $${Math.round(coin.price)} Billion</td>`;
    cryptoCoin += `<td> ${coin.symbol}</td>`; "<tr>";
  });
  //For Loop Ends
  document.getElementById("data").innerHTML = cryptoCoin;
}

function sort(e) {
  let thisSort = e.target.dataset.sortmap;
  if (sortColumn === thisSort) sortAsc = !sortAsc;
  sortColumn = thisSort;
  coinsData.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortAsc ? 1 : -1;
    if (a[sortColumn] > b[sortColumn]) return sortAsc ? -1 : 1;
    return 0;
  });
  renderTable();
}