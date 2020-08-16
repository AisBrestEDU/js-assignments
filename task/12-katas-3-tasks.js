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
    let i = 0,
        j = 0,
        searchIndex = 0,
        indexes = [],
        permitions = [true, true, true, true],
        lastStep = -1,
        startIndex = 1;

    while (i < puzzle.length) {
        while (j < puzzle[i].length) {
            if (searchIndex === searchStr.length - 1) {
                return true;
            }

            if (puzzle[i][j] === searchStr[searchIndex]) {
                if (!indexes.some(curr => curr[0] === i && curr[1] === j)) {
                    indexes.push([i, j]);
                }

                if ((puzzle[i].length > j + 1) && puzzle[i][j + 1] === searchStr[searchIndex + 1] && permitions[0] && !indexes.includes([i, j + 1])) {
                    searchIndex++;
                    j++;
                    lastStep = 0;
                    indexes.push([i, j]);
                    continue;
                }
                else if (j !== 0 && puzzle[i][j - 1] === searchStr[searchIndex + 1] && permitions[1] && !indexes.some(curr => curr[0] === i && curr[1] === j - 1)) {
                    searchIndex++;
                    j--;
                    lastStep = 1;
                    indexes.push([i, j]);
                    continue;
                }
                else if (puzzle.length > i + 1 && puzzle[i + 1][j] === searchStr[searchIndex + 1] && permitions[2] && !indexes.some(curr => curr[0] === i + 1 && curr[1] === j)) {
                    searchIndex++;
                    i++;
                    lastStep = 2;
                    indexes.push([i, j]);
                    break;
                }
                else if (i !== 0 && puzzle[i - 1][j] === searchStr[searchIndex + 1] && permitions[3] && !indexes.some(curr => curr[0] === i - 1 && curr[1] === j)) {
                    searchIndex++;
                    i--;
                    lastStep = 3;
                    indexes.push([i, j]);
                    break;
                }
                else {

                    if (lastStep !== -1) {
                        permitions[lastStep] = false;
                    }

                    if (indexes.length !== 1) {
                        let prev = indexes.pop();

                        i = prev[0];
                        j = prev[1] + 1;
                    }
                    else {
                        j++;
                    }

                    if (searchIndex > 0) {
                        searchIndex--;
                    }
                }
            }
            else {
                j++;
            }
        }

        if (j >= 7) {
            j = i < 4 ? 0 : j;
            i = startIndex++;
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
    function getTransposition(chars){
        let results = [];
        for (let i = 0; i < chars.length; i++) {
            if (chars.length > 1) {
                let result = [],
                returnValues = getTransposition(chars.replace(chars[i], ""));
                for(let j = 0; j < returnValues.length; j++){
                    result.push(chars[i] + returnValues[j]);
                }
                results.push(...result);
            }
            else{
                return chars[0];
            }
        }
        return results;
    }

    for(let result of getTransposition(chars)){
        yield result;
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
    let profits = [[[quotes[0]*-1, 1]]];

    for(let i = 1; i < quotes.length; i++){
        let tempProfits = [];
        for(let j = 0; j <  profits[i-1].length; j++){
            if(quotes[i] > quotes[i+1] || i === quotes.length - 1){
                tempProfits.push([profits[i-1][j][0] + quotes[i]*profits[i-1][j][1], 0]);
            }
            tempProfits.push([profits[i-1][j][0]-quotes[i], profits[i-1][j][1]+1]);
        }
        profits[i] = profits[i-1] = [];
        profits[i].push(...tempProfits);
    }

    let result = Math.max(...profits[quotes.length - 1].map(current => current[0]));
    return result < 0 ? 0 : result;
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
    this.largePrime = 7919;
    this.h0 = 100;
    this.urls = [];
    this.base = this.urlAllowedChars.length;
}

UrlShortener.prototype = {

    encode: function(url) {
        let hash = this.getHash(url);
        this.urls[hash] = url;

        if(hash === 0){
            return this.urlAllowedChars[0];
        }

        let s = "";

        while(hash > 0){
            s += this.urlAllowedChars[hash % this.base];
            hash = Math.trunc(hash / this.base);
        }

        return `https://${s.split("").reverse().join("")}.com`;
    },

    decode: function(code) {
        code = code.substring(8, code.length-4);
        let i = 0;
        for(var char of code){
            i = (i*this.base) + this.urlAllowedChars.indexOf(char);
        }

        return this.urls[i];
    },

    getHash : function(link){
        let h = this.h0;

        for(let char of link){
            h = (h + char.charCodeAt(0)) % this.largePrime
        }

        return h;
    }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
