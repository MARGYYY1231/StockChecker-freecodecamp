'use strict';
const StockModel = require("../models").Stock;
const fetch = require("node-fetch");

/**
 * Gets the Stock/s from the link
 * https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/[symbol]/quote
 * where symbol = msft | goog | aapl | ...
 * @param {*} stock 
 */
async function aquireStock(stock) {
  const resp = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`);
  const {symbol, latestPrice } = await resp.json;
  return {symbol, latestPrice};
}

module.exports = function (app) {

  // Main Route Handler - Handles GET requests with Query Parameters
  // Stock: A stock symbol or array of two symbols
  // Like: Optional Flag to like the Stock
  app.route('/api/stock-prices')
    .get(function (req, res){
      const { stock, like } = req.query;
      if(Array.isArray(stock)){
        console.log("Stocks", stock)
      }
    });
    
};
