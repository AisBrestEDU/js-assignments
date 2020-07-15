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
    var sides = ['N','E','S','W'];  // use array of cardinal directions only!
    let mainWinds = [], halfWinds = [], quarterWinds = [],
        updateWinds = (array, newArr) => {
            array.map((e, i, arr) => {
                newArr.push(e);
                let el = (i === arr.length - 1) ? arr[0] : arr[i + 1];
                let wind = (i % 2) ? el + e : e + el;
                newArr.push(wind);
            });
        };
    updateWinds(sides, mainWinds);
    updateWinds(mainWinds, halfWinds);
    halfWinds.map((e, i, arr) => {
        let el;
        quarterWinds.push(e);

        switch (i % 4) {
            case 0:
                el = arr[i + 4] || arr[0];
                quarterWinds.push(e + 'b' + el);
                break;
            case 1:
                quarterWinds.push(arr[i + 1] + 'b' + arr[i - 1]);
                break;
            case 2:
                el = arr[i + 2] || arr[0];
                quarterWinds.push(e + 'b' + el);
                break;
            default:
                el = arr[i + 1] || arr[0];
                quarterWinds.push(el + 'b' + arr[i - 3]);
        }
    });

    return quarterWinds.map((e, i) => {
        return {abbreviation: e, azimuth: (360 / quarterWinds.length) * i} 
    });
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
    const queue = [str];
    const result = []; 

    while (queue.length > 0) {
        str = queue.shift();
        let match = str.match(/{([^{}]+)}/);

        if (match) {

            for (let value of match[1].split(',')){
                queue.push(str.replace(match[0], value));
            }
        }
        else if (result.indexOf(str) < 0) {
            result.push(str);

            yield str;
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
    let matrix = new Array(n);

    for (let k = 0; k < n; k++) {
        matrix[k] = (new Array(n));
    }

    let i = 1, j = 1;

    for (let m = 0; m < n * n; m++) {
        matrix[i - 1][j - 1] = m;

        if ((i + j) % 2 === 0) {

            if (j < n){
                j++;
            }
            else{
                i += 2;
            }

            if (i > 1){
                i--;
            }
        } 
        else{

            if (i < n){
                i++;
            }
            else{
                j += 2;
            }

            if (j > 1){
                j--;
            }
        }
    }

    return matrix;
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
    var douplets = dominoes.filter(x => x[0] === x[1]).map(x => x[0]);
    var arr = dominoes.join(); 
	var countOdd = 0; 
    var i = 0; 
    
	do { 
		var countNum = arr.match(new RegExp(i, 'g')); 
        countNum === null && !(countNum = []);
         
		if(countNum.length === 2 && douplets.some(x => x === i)){
            countOdd = 3;
        } 

		countNum.length%2 && countOdd++; 
    } while (++i < 7 && countOdd < 3) 
    
    return countOdd < 3;
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
    let res = "";

    for(let i = 0; i < nums.length; i++){
        let j = 0;

        if((nums[i + 1] - nums[i] == 1) && (nums[i + 2] - nums[i] == 2)){

            while(nums[i + 1] - nums[i] == 1){
                i++;
                j++;
            }

            res += `${nums[i-j]}-${nums[i]},`;
        }
        else{
            res += nums[i] + ",";
        }
    }

    return res.slice(0, res.length - 1);
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
