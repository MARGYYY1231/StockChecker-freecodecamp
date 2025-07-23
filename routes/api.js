'use strict';

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
