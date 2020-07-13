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

function dfs(puzzle, searchStr, i, j, used, cur) {
    if (cur == searchStr.length) {
        return true;
    }
    for (let delta_i of [-1,0,1]){
        for (let delta_j of [-1,0,1]){
            if (delta_i * delta_j == 0 && delta_i != delta_j && 
                (i+delta_i >=0 && i+delta_i<puzzle.length) && 
                (j+delta_j >=0 && j+delta_j<puzzle[i+delta_i].length) && !used[i+delta_i][j+delta_j]){
                    if (searchStr.charAt(cur) == puzzle[i+delta_i][j+delta_j]) {
                        used[i+delta_i][j+delta_j] = true;
                        if (dfs(puzzle, searchStr, i+delta_i, j+delta_j, used, cur+1)) {
                            return true;
                        }
                    }
            }
        }
    }
    return false;
}

function dfsSeria(puzzle, searchStr){
    for (let i = 0; i< puzzle.length; i++){
        for (let j = 0; j< puzzle[i].length; j++){
            if (puzzle[i][j] == searchStr.charAt(0)){
                let used = new Array(puzzle.length).fill().map(x=>new Array(puzzle[0].length).fill(false));
                used[i][j] = true;
                if (dfs(puzzle, searchStr, i,j, used, 1)) {
                    return true;
                }
            }
        }
    }
    return false;
}


function findStringInSnakingPuzzle(puzzle, searchStr) {
    puzzle = puzzle.map(x=>x.split(''));
    return dfsSeria(puzzle, searchStr);
    
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
    yield chars;
    chars = chars.split('');
    let counter = new Array(chars.length).fill(0);
    let iter = 0;
    while (iter < chars.length){
        for(let j = counter[iter]; j<iter; counter[iter]++, iter=0, j = counter[iter]) {
            if (iter%2 == 0){
                [chars[iter], chars[0]] =  [chars[0], chars[iter]] 
            }
            else {
                 [chars[iter], chars[counter[iter]]] =  [chars[counter[iter]], chars[iter]] 
            }
            yield chars.join('');
            
        }
        counter[iter]=0; iter++;
    }
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
    let pos = 0;
    let res = 0;
    while(pos<quotes.length){
        let prevPos = pos;
        pos = quotes.slice(prevPos).reduce((acc,val, idx)=> quotes[acc+prevPos]<val? idx:acc, 0) + prevPos;
        res+= Math.max(-quotes.slice(prevPos, pos).reduce((acc,val)=> val + acc, 0) + quotes[pos]*(pos-prevPos), 0);
        pos++; 
    }
    return res;
    
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
        let ans = new Array();
        for (let i = 1; i< url.length; i+=2){
            ans.push(String.fromCharCode(this.urlAllowedChars.indexOf(url.charAt(i-1))*100 + this.urlAllowedChars.indexOf(url.charAt(i))));
        }
        if (url.length%2 == 1){
            ans.push(String.fromCharCode(this.urlAllowedChars.indexOf(url.charAt(url.length-1))*100 + 85));
        }
        return ans.join('');
    },
    
    decode: function(code) {
        let ans = new Array();
        for (let i = 0; i< code.length - 1; i++) {
            ans.push(this.urlAllowedChars.charAt(Math.floor(code.charCodeAt(i)/100)));
            ans.push(this.urlAllowedChars.charAt(Math.floor(code.charCodeAt(i)%100)));
        }
        if (Math.floor(code.charCodeAt(code.length - 1)%100) != 85) {
            ans.push(this.urlAllowedChars.charAt(Math.floor(code.charCodeAt(code.length - 1)/100)));
            ans.push(this.urlAllowedChars.charAt(Math.floor(code.charCodeAt(code.length - 1)%100)));
        }
        else {
            ans.push(this.urlAllowedChars.charAt(Math.floor(code.charCodeAt(code.length - 1)/100)));
        }
        return ans.join('');
    } 
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
