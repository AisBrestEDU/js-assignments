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
    let checkedPositions = [];

    function isPositionChecked(x, y) {
        for(let i = 0; i < checkedPositions.length; i++) {
            if(checkedPositions[i].i == x && checkedPositions[i].j == y) return true;
        }

        return false;
    }

    function isNextSymbolNear(i, j, index) {
        if(j != 0 && puzzle[i][j - 1] == searchStr[index + 1] && !isPositionChecked(i, j - 1)) return {i: i, j: j - 1}; //check left
        if(i != 0 && puzzle[i - 1][j] == searchStr[index + 1] && !isPositionChecked(i - 1, j)) return {i: i - 1, j: j}; //check top
        if(j != puzzle[i].length - 1 && puzzle[i][j + 1] == searchStr[index + 1] && !isPositionChecked(i, j + 1)) return {i: i, j: j + 1}; //check right
        if(i != puzzle.length - 1 && puzzle[i + 1][j] == searchStr[index + 1] && !isPositionChecked(i + 1, j)) return {i: i + 1, j: j}; //check bottom

        return false;
    }

    let index = 0;

    for(let i = 0; i < puzzle.length; i++) {
        for(let j = 0; j < puzzle[i].length; j++) {
            if(puzzle[i][j] == searchStr[index]) {
                let nextX = i;
                let nextY = j;
                let aborted = false;

                while(index != searchStr.length - 1) {
                    checkedPositions.push({
                        i: nextX,
                        j: nextY
                    });

                    let nextPosition = isNextSymbolNear(nextX, nextY, index);

                    if(nextPosition) {
                        nextX = nextPosition.i;
                        nextY = nextPosition.j;
                        index++;
                    } else {
                        aborted = true;
                        index = 0;
                        break;
                    }
                }

                if(!aborted) return true;
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
    if (chars.length < 2) {
        return yield chars;
    }

    let permutations = [];

    for (let i = 0; i < chars.length; i++) {
        let char = chars[i];

        if (chars.indexOf(char) != i) continue;

        let remainingString = chars.slice(0, i) + chars.slice(i + 1, chars.length);

        for (let subPermutation of getPermutations(remainingString)) {
            permutations.push(char + subPermutation);
        }

    }

    for(let i = 0; i < permutations.length; i++) {
        yield permutations[i];
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

    function getMaxIndex(start) {
        let maxIndex = start;
        
        for(let i = start + 1; i < quotes.length; i++) {
            if(quotes[i] > quotes[maxIndex]) {
                maxIndex = i;
            }
        }

        return maxIndex;
    }


    let resultIncome = 0;
    let startIndex = 0;

    while (startIndex < quotes.length) {
        let indexOfMaxPrice = getMaxIndex(startIndex);

        if(indexOfMaxPrice == 0) break; 

        let pricesOfStockToBuy = quotes.slice(startIndex, indexOfMaxPrice);

        let moneySpent = pricesOfStockToBuy.reduce((sum, item) => { return sum + item; }, 0);
        let moneyEarned = quotes[indexOfMaxPrice] * pricesOfStockToBuy.length;
        resultIncome += moneyEarned - moneySpent;

        startIndex = indexOfMaxPrice + 1;
    }

    return resultIncome;
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
