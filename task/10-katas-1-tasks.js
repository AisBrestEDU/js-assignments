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
    let res = [],
        fullCount = 0;

    let pars = {
        0 : function (c) {
            return `${c}`
        },
        1 : function (c, n, h) {
            return `${c}b${n}`
        },
        2 : function (c, n, h) {
            return `${c}${h}`
        },
        3 : function (c, n, h) {
            return `${h}b${c}`            
        },
        4 : function (c, n, h) {
            return `${h}`            
        },
        5 : function (c, n, h) {
            return `${h}b${n}`            
        },
        6 : function (c, n, h) {
            return `${n}${h}`            
        },
        7 : function (c, n, h) {
            return `${n}b${c}`
        }
    };

    var sides = ['N','E','S','W'];  // use array of cardinal directions only!
    sides.forEach(function (val, i) {
        let sCur = val,
            sNext = sides[i + 1] ? sides[i + 1] : sides[0],
            half,
            hCount = 0,
            f,
            abr,
            az;
        if (i % 2) {
            half = sNext + sCur;  
        } else {
            half = sCur + sNext;           
        }
        while (hCount < 8) {
            f = pars[hCount]; 
            abr = f(sCur, sNext, half);
            res.push({abbreviation : abr, azimuth : fullCount});
            hCount++;
            fullCount += 11.25;
        };
    }); 
    return res;
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
    let res = [];
    let brCounter = 0;
    yield* expandBrace(str);

    function expandBrace(str) {
        brCounter = 0;
        let brLast = 0;
        let bTrigger = 0;
        for (let i = 0, l = str.length; i < l; i++) {
            if (str[i] == "{") {
                brLast = i;
                brCounter++;     
                bTrigger = 1;    
            } else if (str[i] == "}") {
                let parStr = str.slice(brLast + 1, i);     
                brCounter--;
                if (brCounter < 0) {
                    continue;
                }                
                bTrigger = 1;        
                parStr.split(",").forEach(function (val, ii) {
                    let newStr = str.replace(new RegExp(`{${parStr}}`), val);
                    expandBrace(newStr);     
                });            
            };
        };
        if (!bTrigger) {
            if (res.indexOf(str) == -1) {
                res.push(str);        
            }
        };
        return res;
    };
};

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
    let arr = [];

    for (let i = 0; i < n; i++) {
        arr[i] = new Array(n).fill(0);
    };

    let x = 0;
    let y = 0;
    let side = 1;

    for (let i = 1; i < n * n; i++) {
        if (side) {
            y -= 1;
            x += 1; 
            if (y < 0 || x >= n) {                            
                if (y < 0 && x < n) {
                    y = 0;                             
                } else {
                    x = n - 1;
                    y += 2;
                };
                side = 0;
            }
        } else {
            y += 1;
            x -= 1;  
            if (x < 0 || y >= n) {           
                if (x < 0 && y < n) {
                    x = 0;                          
                } else {
                    x += 2;                
                    y = n - 1;
                }
                side = 1;
            }; 
        };
        arr[y][x] = i; 
    };

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
    let last = dominoes.shift()[1];

    let eq = [];

    for (let i = 0, l = dominoes.length; i < l; i++) {
        if (dominoes[i][0] == last) {         
            last = dominoes[i][1];
            dominoes.splice(i, 1);
            i = -1;
            l = dominoes.length;
        } else if (dominoes[i][1] == last) {                     
            last = dominoes[i][0];
            dominoes.splice(i, 1);
            i = -1;
            l = dominoes.length;
        };                
    };
    if (dominoes.length) {
        return false;
    } else {
        return true;
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
    let acc = [];
    let last = nums[0];
    let str = nums[0] + "";
    for (let i = 1, l = nums.length; i < l; i++) {
        last++;
        if (nums[i] == last && !(acc.length < 1 && nums[i + 1] !== last + 1)) {
                acc.push(last);
        } else {
            if (acc.length) {
                str += "-" + acc[acc.length - 1];                        
                acc = [];                
            };
            str += "," + nums[i];
            last = nums[i];
        };
    };
    if (acc.length) {
        str += "-" + acc[acc.length - 1];        
    };
    return str;
}


module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
