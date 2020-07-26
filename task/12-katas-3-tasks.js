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
  let firstLetter = searchStr[0];
  let origString = searchStr;
  searchStr = searchStr.slice(1);
  let coords = [];
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === firstLetter) {
        coords.push(`${i},${j}`);
        let x = i,
            y = j;
        while (searchStr) {
          if (!coords.includes(`${x},${y + 1}`) && puzzle[x][y + 1] === searchStr[0]) {
            coords.push(`${x},${y + 1}`);
            searchStr = searchStr.slice(1);
            y = y + 1;
          } else if (!coords.includes(`${x},${y - 1}`) && puzzle[x][y - 1] === searchStr[0]) {
            coords.push(`${x},${y - 1}`);
            searchStr = searchStr.slice(1);
            y = y - 1;
          } else if (x < puzzle.length - 1 && !coords.includes(`${x + 1},${y}`) && puzzle[x + 1][y] === searchStr[0]) {
            coords.push(`${x + 1},${y}`);
            searchStr = searchStr.slice(1);
            x = x + 1;
          } else if (x > 0 && !coords.includes(`${x - 1},${y}`) && puzzle[x - 1][y] === searchStr[0]) {
            coords.push(`${x - 1},${y}`);
            searchStr = searchStr.slice(1);
            x = x - 1;
          } else {
            searchStr = origString.slice(1);
            break;
          }
        }
        if (!searchStr) return true;
      }
    }
  }
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
  let charsAr = chars.split('');
  let resultAr = [];
  resultAr.push(charsAr.shift());

  while (charsAr.length) {
    let strLen = resultAr[0].length;
    let arLen = resultAr.length;
    let curSym = charsAr.shift();
    for (let j = 0; j < arLen; j++) {
      let curStr = resultAr.shift();
      for (let i = 0; i <= strLen; i++) {
        resultAr.push(curStr.slice(0, i) + curSym + curStr.slice(i));
      }
    }
  }

  for (let str of resultAr) yield str;
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
  let curMax = 0,
    account = 0,
    stocksAmount = 0;
  for (let i = quotes.length - 1; i >= 0; i--) {
    if (quotes[i] > curMax) {
      account += stocksAmount * curMax;
      curMax = quotes[i];
      stocksAmount = 0;
    } else {
      stocksAmount++;
      account -= quotes[i];
    }
    if (i == 0) {
      account += stocksAmount * curMax;
      curMax = quotes[i];
    }
  }
  return account;
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

  encode: function (url) {
    let short = '';
    for (let i = 0; i < url.length; i += 2) {
      let x = this.urlAllowedChars.indexOf(url[i]);
      let y = url[i + 1] ? this.urlAllowedChars.indexOf(url[i + 1]) : null;
      let code;
      if (y) {
        code = (x + y) * (x + y + 1) / 2 + x
      } else {
        code = x;
      }
      short += String.fromCharCode(code);
    }
    return short;
  },

  decode: function (code) {
    let long = '';
    for (let i = 0; i < code.length; i++) {
      let charCode = code[i].charCodeAt();
      if (charCode < 100) {
        long += this.urlAllowedChars[charCode];
      } else {
        let w = Math.floor((Math.sqrt(8 * charCode + 1) - 1) / 2);
        let t = (w ** 2 + w) / 2;
        long += this.urlAllowedChars[charCode - t] + this.urlAllowedChars[w - (charCode - t)];
      }
    }
    return long;
  }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
