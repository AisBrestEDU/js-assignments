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
    let sides = ['N','E','S','W'];  // use array of cardinal directions only!

    function getPoints(abbreviation, azimuth) {
        let obj = {
            abbreviation: abbreviation,
            azimuth: azimuth
        };

        return obj;
    }

    return sides.reduce((acc, curr, i) => {
        let next;
        let index = !(i % 2);

        if(i === sides.length - 1) {
            next = sides[0];
        } else {
            next = sides[i + 1];
        }

        acc.push(getPoints(`${curr}`, (i * 8 * 11.25).toFixed(2)));
        acc.push(getPoints(`${curr}b${next}`, (11.25 + (i * 8 * 11.25)).toFixed(2)));
        acc.push(getPoints(index ? `${curr}${curr}${next}`:`${curr}${next}${curr}`, (22.5 + (i * 8 * 11.25)).toFixed(2)));
        acc.push(getPoints(index ? `${curr}${next}b${curr}`:`${next}${curr}b${curr}`, (33.75 + (i * 8 * 11.25)).toFixed(2)));
        acc.push(getPoints(index ? `${curr}${next}`:`${next}${curr}`, (45 + (i * 8 * 11.25)).toFixed(2)));
        acc.push(getPoints(index ? `${curr}${next}b${next}`:`${next}${curr}b${next}`, (56.25 + (i * 8 * 11.25)).toFixed(2)));
        acc.push(getPoints(index ? `${next}${curr}${next}`:`${next}${next}${curr}`, (67.5 + (i * 8 * 11.25)).toFixed(2)));
        acc.push(getPoints(`${next}b${curr}`, (78.75 + (i * 8 * 11.25)).toFixed(2)));

        return acc;
    }, []);
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
    let arr = [str];
    let result = [];
    let regex = /{([^\{\}]+)}/;

    while (arr.length) {
        let item = arr.shift();
        let matches = item.match(regex);

        if (matches !== null) {
            matches[1].split(',').map(el => {
                arr.push(item.replace(matches[0], el));
            });
        } else if (result.indexOf(item) === -1) {
            result.push(item);
            yield item;
        }
    }
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
    let arr = new Array(n).fill([]).map((value) => new Array(n));

    let a = 1;
    let b = 1;

    for (let i = 0; i < n * n; i++) {
        arr[a - 1][b - 1] = i;

        if ((a + b) % 2 == 0) {

            if (b < n) {
                b++;
            }
            else {
                a += 2;
            }

            if (a > 1) {
                a--;
            }
        } else {
            if (a < n) {
                a++;
            }
            else {
                b += 2;
            }

            if (b > 1) {
                b--;
            }
        }
    }

    return arr;
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
    let row = String(dominoes.shift());
    let i = 0;
    while (dominoes.length != 0) {
        if (dominoes[i][0] == row[0]) {
            row = dominoes[i].reverse() + row;
            dominoes.splice(i, 1);
            i = 0;
        }
        else if (dominoes[i][1] == row[0]) {
            row = dominoes[i] + row;
            dominoes.splice(i, 1);
            i = 0;
        }
        else if (dominoes[i][0] == row[row.length - 1]) {
            row = row + dominoes[i];
            dominoes.splice(i, 1);
            i = 0;
        }
        else if (dominoes[i][1] == row[row.length - 1]) {
            row = row + dominoes[i].reverse();
            dominoes.splice(i, 1);
            i = 0;
        }
        else {
            i++;
            
            if (i === dominoes.length) {
                return false;
            }
        }
    }

    return true;
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
    let arr = [nums[0]];
    for(let i = 1 ; i < nums.length; i++) {
        if (nums[i] == (nums[ i - 1 ] + 1) ) {
            arr.push(nums[i]);
            console.log(arr);
        }
        if((nums[i] !== (nums[ i - 1 ] + 1))|| (i == nums.length-1) ) {   
            let res = (result.length > 0) ? "," : "";
            if (arr.length == 1) {
                result += res + String(arr[0]);
            }
            else if(arr.length == 2) {
                result += res + String(arr[0]) + "," + String(arr[1]);
            }
            else {
                result += res + String(arr[0]) + "-" + String(arr[arr.length - 1]);
            }
            arr = [nums[i]];
        }
        
    }
    return result;
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
