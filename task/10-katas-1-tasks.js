'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    // throw new Error('Not implemented');
    var sides = ['N', 'E', 'S', 'W'];  // use array of cardinal directions only!

    let azimuths = [];
    let azimuthDifference = 11.25;

    for (let i = 0; i < 32; i++) {
        let start = Math.floor(i / 8);
        let end = start == 3 ? 0 : start + 1;

        let direction;

        if (start % 2 == 0) {
            direction = sides[start] + sides[end];
        } else {
            direction = sides[end] + sides[start];
        }


        let azimuth = {
            abbreviation: generateAbbreviation(i, direction, start, end),
            azimuth: azimuthDifference * i
        }

        azimuths.push(azimuth);
    }


    function generateAbbreviation(i, direction, start, end) {
        //N, E...
        if (i % 8 == 0) return sides[start];
        //NE, SE...
        if (i % 4 == 0) return direction;
        //NNE, SSE...
        if (i % 2 == 0) {
            if (i % 8 < 4) {
                return sides[start] + direction;
            } else {
                return sides[end] + direction;
            }
        }
        //NbE, EbS
        if (i % 8 < 4) {
            if (i % 4 < 2) {
                return sides[start] + 'b' + sides[end];
            } else {
                return direction + 'b' + sides[start];
            }
        } else {
            if (i % 4 < 2) {
                return direction + 'b' + sides[end];
            } else {
                return sides[end] + 'b' + sides[start];
            }
        }
    }

    return azimuths;
}


/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    throw new Error('Not implemented');
}


/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    let array = [];
    for (let i = 0; i < n; i++) {
        array[i] = [];
    }

    let i = 1, j = 1;
    for (let value = 0; value < n * n; value++) {
        array[i - 1][j - 1] = value;

        if ((i + j) % 2 == 0) {
            if (j < n) j++;
            else i += 2;
            if (i > 1) i--;
        } else {
            if (i < n) i++;
            else j += 2;
            if (j > 1) j--;
        }
    }

    return array;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    // throw new Error('Not implemented');
    let row = [];
    row[0] = dominoes[0][0];
    row[1] = dominoes[0][1];
    delete dominoes[0];

    let amountOfNotEmpty;

    do {
        amountOfNotEmpty = getAmountOfNotEmpty();

        for (let i = 0; i < dominoes.length; i++) {
            if(!dominoes[i]) continue;

            //I use "delete" instead of "splice" in order to not change the length of "dominoes" array
            if(placeDomino(i)) {
                delete dominoes[i];
            }
        }
    } while(amountOfNotEmpty != getAmountOfNotEmpty());

    if(amountOfNotEmpty > 0) return false;
    else return true;


    function getAmountOfNotEmpty() {
        return dominoes.reduce(function(amount, item, index) {
            if(dominoes[index]) return ++amount;
            else return amount; 
        }, 0);
    }

    //returns true if domino had been placed successfully, else return false
    function placeDomino(i) {
        if(dominoes[i][0] == row[0]) {
            row.unshift(dominoes[i][0]);
            row.unshift(dominoes[i][1]);

            return true;
        } else if(dominoes[i][1] == row[0]) {
            row.unshift(dominoes[i][1]);
            row.unshift(dominoes[i][0]);
        
            return true;
        } else if(dominoes[i][0] == row[row.length - 1]) {
            row.push(dominoes[i][0]);
            row.push(dominoes[i][1]);

            return true;
        } else if(dominoes[i][1] == row[row.length - 1]) {
            row.push(dominoes[i][1]);
            row.push(dominoes[i][0]);

            return true;
        }

        return false;
    }
}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    let result = '';
    let current = [];
    current.push(nums[0]);

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] - 1 == nums[i - 1]) {
            current.push(nums[i]);
        } else {
            concatString();
            current.push(nums[i]);
        }
    }

    function concatString() {
        let length = current.length;

        result += result != '' ? ',' : '';

        if (length <= 2) {
            result += current.join(',');
        } else {
            result += `${current[0]}-${current[length - 1]}`;
        }

        current = [];
    }

    concatString();
    return result;
}

module.exports = {
    createCompassPoints: createCompassPoints,
    expandBraces: expandBraces,
    getZigZagMatrix: getZigZagMatrix,
    canDominoesMakeRow: canDominoesMakeRow,
    extractRanges: extractRanges
};
