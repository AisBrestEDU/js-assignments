'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    let puz = puzzle.map(a => a.split(""));

    let stack = [{
        ways: [],
        states: []
    }];

    let idx = 0;
    let startSearchPos = 0;
    let line = 0;
    let searchStrCurPos = 0;
    let searchStrCurChar;

    let x = 0;
    let y = 0; 
    
    let fin = searchStr.length;
    let ways = 0;

    for (let i = 0, l = puz.length; i < l; i++) {
        searchStrCurPos = 1;
        startSearchPos = 0;

        line = puz[i];
        idx = line.indexOf(searchStr[0]);

        x = idx;
        y = i;
        while(idx != -1) {
            while (1) {
                searchStrCurChar = searchStr[searchStrCurPos];
                if (puz[y - 1]) {
                    if (puz[y - 1][x] == searchStrCurChar) {
                        stack[0].ways.push([y - 1, x]);
                        puz[y][x] = " ";   
                        stack[0].states.push(puzzle.map(a => a.split("")));
                    }
                };
                if (puz[y + 1]) {
                    if (puz[y + 1][x] == searchStrCurChar) {
                        stack[0].ways.push([y + 1, x]); 
                        puz[y][x] = " ";    
                        stack[0].states.push(puzzle.map(a => a.split("")));                        
                    }
                };
                if (puz[y][x - 1]) {
                    if (puz[y][x - 1] == searchStrCurChar) {
                        stack[0].ways.push([y, x - 1]);   
                        puz[y][x] = " ";  
                        stack[0].states.push(puzzle.map(a => a.split("")));                                                
                    }
                };
                if (puz[y][x + 1]) {
                    if (puz[y][x + 1] == searchStrCurChar) {
                        stack[0].ways.push([y, x + 1]); 
                        puz[y][x] = " ";                           
                        stack[0].states.push(puzzle.map(a => a.split("")));                                                
                    }
                };
                if (stack[0].ways.length == 0) {
                    idx = line.indexOf(searchStr[idx + 1]);        
                    break;
                } else if (stack[0].ways.length >= 1) {
                    ways = stack[0].ways.pop();
                    stack[0].states.pop()
                    y = ways[0];
                    x = ways[1];  
                    searchStrCurPos++;
                    if (searchStrCurPos == fin) {
                        return true;
                    }                   
                };
            };
        };
    };
    return false;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    throw new Error('Not implemented');
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    throw new Error('Not implemented');
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function(url) {
        throw new Error('Not implemented');
    },
    
    decode: function(code) {
        throw new Error('Not implemented');
    } 
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
