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
    let firstLetterPositions = [], lettersPositions = [];
    for (let i = 0; i < puzzle.length; i++) {
        for (let j = 0; j < puzzle[0].length; j++) {
            if (puzzle[i][j] === searchStr[0]) {
                firstLetterPositions.push([i, j]);
            }
        }
    }

    for (let position of firstLetterPositions) {
        lettersPositions.length = 0;
        lettersPositions.push(position);
        if (findWord(searchStr.substring(1), position)) {
            return true;
        }
    }

    return false;

    function findWord(word, position) {
        if (!word) {
            return true;
        }

        for (let letter of word) {
            let nextLetterPosition = findNextLetter(letter, position);
            if (nextLetterPosition && lettersPositions.findIndex(p => p[0] === nextLetterPosition[0] && p[1] === nextLetterPosition[1]) === -1) {
                lettersPositions.push(nextLetterPosition);
                return findWord(word.substring(1), nextLetterPosition);
            }
            return false;
        }

        function findNextLetter(letter, position) {
            let row = position[0];
            let column = position[1];
            if (column - 1 >= 0 && puzzle[row][column - 1] === letter) {
                return [row, column - 1];
            }
            if (column + 1 <= puzzle[0].length && puzzle[row][column + 1] === letter) {
                return [row, column + 1];
            }
            if (row - 1 >= 0 && puzzle[row - 1][column] === letter) {
                return [row - 1, column];
            }
            if (row + 1 <= puzzle.length && puzzle[row + 1][column] === letter) {
                return [row + 1, column];
            }
            return null;
        }
    }
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
    if (chars.length === 1) {
        yield chars;
    }
    else {
        for (let char of chars) {
            for (let permutation of getPermutations(chars.replace(char, ''))) {
                yield char + permutation;
            }
        }
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
    let buy = [];
    let profit = 0;
    let maxQuote = Math.max(...quotes);
    let maxQuoteIndex = quotes.indexOf(maxQuote);
    for (let i = 0; i < quotes.length; i++) {
        if (i < maxQuoteIndex) {
            buy.push(quotes[i]);
        }
        if (i === maxQuoteIndex) {
            for (let buyQuote of buy) {
                profit += maxQuote - buyQuote;
            }
            return profit + (maxQuoteIndex < quotes.length - 1 ? getMostProfitFromStockQuotes(quotes.slice(maxQuoteIndex + 1)) : 0);
        }
    }
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
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function (url) {
        let encoded = "";
        for (let i = 0; i < url.length; i += 2) {
            encoded += String.fromCharCode(url.charCodeAt(i) << 8 | url.charCodeAt(i + 1));
        }
        return encoded;
    },

    decode: function (code) {
        let decoded = '';
        for (let i = 0; i < code.length; i++) {
            let charCode = code.charCodeAt(i);
            let b = charCode & 255;
            let a = (charCode >> 8) & 255;
            decoded += b === 0 ? String.fromCharCode(a) : String.fromCharCode(a) + String.fromCharCode(b);
        }
        return decoded;
    }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
