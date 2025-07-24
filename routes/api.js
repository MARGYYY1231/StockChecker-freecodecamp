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

/**
 * Finds Stock
 * @param {*} stock 
 * @returns 
 */
async function findStock(stock) {
  return await StockModel.findOne({symbol: stock}).exec();
}

async function makeStock(stock, like, ip) {
  
}

/**
 * Save Stock
 * @param {*} stock 
 * @param {*} like 
 * @param {*} ip 
 * @returns 
 */
async function saveStock(stock, like, ip) {
  let saved = {};
  const foundStock = findStock(stock);

  //If Doesnt return anything
  if(!foundStock){
    const makeSaved = await makeStock(stock, like, ip);
    saved = makeSaved;
    return saved;
  }else{
    //If found returns a stock
    if(like && foundStock.likes.indexOf(ip) === -1){
      foundStock.likes.push(ip);
    }
    saved = await foundStock.save();
    return saved;
  }
}

module.exports = function (app) {

  // Main Route Handler - Handles GET requests with Query Parameters
  // Stock: A stock symbol or array of two symbols
  // Like: Optional Flag to like the Stock
  app.route('/api/stock-prices')
    .get(async function (req, res){
      const { stock, like } = req.query;
      
      //If More Than one
      if(Array.isArray(stock)){
        console.log("Stocks", stock);


        //Get Stocks
        const { symbol, latestPrice } = await aquireStock(stock[0]);
        const { symbol: symbol2, latestPrice: latestPrice2} = await aquireStock(stock[1]);

        //Save the Stocks to Database
        const firstStock = await saveStock(stock[0], like, req.ip);
        const secondStock = await saveStock(stock[1], like, req.ip);
      }


      //If Only one
    });
    
};
