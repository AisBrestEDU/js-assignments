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
    function nfunc(current, step) {
        let save = data[current.y][current.x];
        data[current.y][current.x] = "";

        if (step == search.length)
            return true;

        let result = false,
            steps = [[1, 0], [-1, 0], [0, -1], [0, 1]];

        for (let i = 0; i < 4; i++) {
            let newX = current.x + steps[i][0],
                newY = current.y + steps[i][1];

            if (data[newY][newX] == search[step]) {
                result = result || nfunc({x: newX, y: newY}, step + 1);
            }
        }

        data[current.y][current.x] = save;
        return result;
    }

    let data = Array.from(puzzle);
    let arr = Array.from({length: data[0].length + 2}, () => '');

    data = data.map(item => [''].concat(item.split(''), ['']));
    data = [arr].concat(data, [arr]);

    let search = searchStr.split(''),
        n = data[0].length - 1,
        m = data.length - 1;

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++)
            if (data[i][j] == search[0]) {
                if (nfunc({y: i, x: j}, 1))
                    return true;
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
    let stack = [];
    stack.push({string: "", visited: Array.from({length: chars.length}, () => false)});

    while (stack.length) {
        let item = stack.pop();

        if (item.string.length == chars.length) {
            yield item.string;
            continue;
        }

        for (let i = 0; i < chars.length; i++)
            if (!item.visited[i]) {
                let newArr = Array.from(item.visited);
                newArr[i] = true;

                stack.push({string: item.string + chars[i], visited: newArr});
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
    let maximums = quotes
        .reduceRight((prev, curr) => {
            if (prev.length == 0)
                return [curr];

            prev.push(Math.max(prev[prev.length - 1], curr));

            return prev;
        }, [])
        .reverse();

    maximums.push(0);

    return quotes.reduce((prev, curr, index) => {
        return prev + Math.max(0, maximums[index + 1] - curr);
    }, 0);
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
        let result = "";

        for (let i = 0; i < url.length; i += 2) {
            let a = url.charCodeAt(i);
            let b = url.charCodeAt(i + 1);
            let code = (a << 8) | b;

            result += String.fromCharCode(code);
        }

        return result;
    },

    decode: function(code) {
        let result = "";

        for (let i = 0; i < code.length; i++) {
            let char = parseInt(code.charCodeAt(i), 10);
            let b = char & 255;
            let a = (char >> 8) & 255;

            if (b === 0) {
                result += String.fromCharCode(a)
            } else {
                result += String.fromCharCode(a) + String.fromCharCode(b);
            }
        }

        return result;
    }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
