'use strict';

const { breadthTraversalTree } = require("./07-yield-tasks");

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
    var sides = ["N", "E", "S", "W"]; // use array of cardinal directions only!
    
    let j = 0,
    left,
    center,
    right,
    azimuth = 0,
    result = [];
    for(let i = 0; i < sides.length*2; i++){
        let octal = []

        left = sides[j % 4];
        center = `${sides[j % 4]}${sides[(j + 1) % 4]}`;
        center = (i % 4) >= 2 ? center.split("").reverse().join("") : center;
        right = sides[(j + 1) % 4];

        if(i % 2 === 0){
            result.push({
                abbreviation : `${left}`,
                azimuth : azimuth
            })
        }
        else{
            [left,right] = [right, left]
            
            result.push({
                abbreviation : `${center}`,
                azimuth : azimuth
            })
        }
        azimuth += 11.25;

        octal.push(`${left}b${right}`);
        octal.push(`${left}${center}`);
        octal.push(`${center}b${left}`);

        if(i % 2 !== 0){
            octal = octal.reverse();
            j++;
        }

        octal.forEach(abbr => {
            result.push({
                abbreviation: abbr,
                azimuth : azimuth
            });
            azimuth += 11.25;
        })
    }
    return result
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
    if(!str.includes("{")){
        return yield "nothing to do";
    }

    let result = [str],
    sent = [];

    while(result.length != 0){
        const changeLine = result[0];
        let sub = changeLine.substring(changeLine.indexOf("}") - changeLine.substring(0,changeLine.indexOf("}")).split("").reverse().join("").indexOf("{"), changeLine.indexOf("}"));
        
        if(sub != ""){
            result.splice(0,1);
        }

        for(let element of sub.split(",")){
            const modifiedStr  = changeLine.replace(`{${sub}}`, element)
            if (!sent.includes(modifiedStr)){
                if(modifiedStr.includes("{")){
                    result.push(modifiedStr);
                }
                else{
                    yield modifiedStr;
                    sent.push(modifiedStr);
                }
            }
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
    let result = [];

    for (let k = 0; k < n; k++) {
        result[k] = [];
    }

    var i = 1,
        j = 1;

    for (let k = 0; k < n * n; k++) {
        result[i-1][j-1] = k;
        
        if((i + j) % 2 === 0){
            if(j < n){
                j++;
            }
            else{
                i +=2;
            }

            if(i > 1){
                i--;
            }
        }
        else{
            if(i < n){
                i++;
            }
            else{
                j+=2;
            }

            if(j > 1){
                j--;
            }
        }
    }

    return result
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
    let odds = 0,
        i = 1,
        flatDoms = dominoes.flat();
    while (odds != 3 && i < 10) {
        let count = flatDoms.reduce((accumulator, current) => {
            if (i === current) {
                accumulator++;
            }
            return accumulator;
        }, 0);

        if (
            count % 2 === 1 ||
            dominoes.some((current) => current[0] === i && current[1] === i)
        )
            odds++;
        i++;
    }

    return odds < 3;
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
    let i = 0,
        result = "";
    while (i < nums.length - 1) {
        let j = i,
            isInc = true;
        while (j < nums.length - 1 && isInc) {
            if (nums[j] != nums[j + 1] - 1) isInc = false;
            j++;
        }

        if (j - !isInc - i < 2) {
            if (i != 0) {
                result += ",";
                i++;
            }
            result += nums.slice(i, j + 1);
            i = j;
        } else {
            result +=
                result === ""
                    ? `${nums[i]}-${nums[j - !isInc]}`
                    : `-${nums[j - !isInc]}`;
            i = j - !isInc;
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
