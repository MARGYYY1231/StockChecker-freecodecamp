const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    //Viewing one stock
    test('Viewing one stock', function(done){
        chai.request(server)
        .get('/api/stock-prices/')
        .query({stock : 'GOLD'})
        .end((err, res) => {
            assert.equal(res.status, 200);

            assert.property(res.body, 'stockData');
            assert.property(res.body.stockData, 'stock');
            assert.property(res.body.stockData, 'price');
            assert.property(res.body.stockData, 'likes');

            assert.equal(res.body.stockData.stock, 'GOLD');
            assert.exists(res.body.stockData.price, 'GOLD has a price.');

            done();
        });
    });

    //Viewing one stock and liking it
    test('Viewing one stock and liking it', function(done){
        chai.request(server)
        .get('/api/stock-prices/')
        .query({stock : 'GOLD', like : true})
        .end((err, res) => {
            assert.equal(res.status, 200);
            
            assert.property(res.body, 'stockData');
            assert.property(res.body.stockData, 'stock');
            assert.property(res.body.stockData, 'price');
            assert.property(res.body.stockData, 'likes');

            assert.equal(res.body.stockData.stock, 'GOLD');
            assert.isNumber(res.body.stockData.likes);
            assert.equal(res.body.stockData.likes, 1);
            assert.exists(res.body.stockData.price, 'GOLD has a price.');

            done();
        });
    });
    
    //Viewing one stock and liking it again
    test('Viewing one stock and liking it again', function(done){

    });

    //Viewing two stocks
    test('Viewing two stocks', function(done){

    });

    //Viewing two stocks and liking them
    test('Viewing two stocks and liking them', function(done){

    });
});
