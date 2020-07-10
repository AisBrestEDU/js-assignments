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
    const diffAzimuth = 11.25;
    let azimuth = -diffAzimuth,
        compass = [];

    for (let i = 0; i < sides.length; i++) 
    {
        let prev = sides[i];
        let next = sides[(i + 1) % sides.length];
        let isEven = (i % 2) ? false : true;
        compass.push(getCompassPosition(`${prev}`));
        compass.push(getCompassPosition(`${prev}b${next}`));
        compass.push(isEven ? getCompassPosition(`${prev}${prev}${next}`) : getCompassPosition(`${prev}${next}${prev}`));
        compass.push(isEven ? getCompassPosition(`${prev}${next}b${prev}`) : getCompassPosition(`${next}${prev}b${prev}`));
        compass.push(isEven ? getCompassPosition(`${prev}${next}`) : getCompassPosition(`${next}${prev}`));
        compass.push(isEven ? getCompassPosition(`${prev}${next}b${next}`) : getCompassPosition(`${next}${prev}b${next}`));
        compass.push(isEven ? getCompassPosition(`${next}${prev}${next}`) :  getCompassPosition(`${next}${next}${prev}`));
        compass.push(getCompassPosition(`${next}b${prev}`));
    }

    function getCompassPosition(abbreviation)
    {
        azimuth += diffAzimuth;
        return { abbreviation: abbreviation, azimuth: azimuth };
    }

    return compass;
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
    let strToArray = [str], 
    tempArray = [];
    while (strToArray.length > 0) 
    {
        str = strToArray.shift();
        let matchStr = str.match(/\{([^{}]+)\}/);
        if (matchStr) 
        {
            for (let value of matchStr[1].split(',')) 
            {
                strToArray.push(str.replace(matchStr[0], value));
            }
        }
        else if (tempArray.indexOf(str) < 0)
        {
            tempArray.push(str);
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
    let matrix = [],
            a=1,
            b=1;
    for (let c = 0; c < n; c++) 
    {
        matrix[c] = [];
    }

    for (let d = 0; d < n*n; d++) 
    {
        matrix[b-1][a-1] = d;
        if ((b + a) % 2 == 0)
        {
            (a < n) ? (a ++) : (b+=2);
            if (b > 1)
            {
                b --;
            }
        }
        else
        {
            (b < n) ? (b ++) : (a += 2);
            if (a > 1)
            {
                a --;
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
    let temp = dominoes.shift(),
         i = 0;
    while (dominoes.length != 0)
    {
        if (dominoes[i][0] == temp[0]) 
        {
            temp = dominoes[i].reverse() + temp;
            dominoes.splice(i, 1);
            i = 0;
            continue;
        }
        if (dominoes[i][1] == temp[0]) 
        {
            temp = dominoes[i] + temp;
            dominoes.splice(i, 1);
            i = 0;
            continue;
        }
        if (dominoes[i][0] == temp[1]) 
        {
            temp = temp + dominoes[i];
            dominoes.splice(i, 1);
            i = 0;
            continue;
        }
        if (dominoes[i][1] == temp[1]) 
        {
            temp = temp + dominoes[i].reverse();
            dominoes.splice(i, 1);
            i = 0;
            continue;
        }
        i++;
        if (i == dominoes.length)
        {
            return false;
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
    let result = [],
        count =0,
        i = 0;
        for (; i < nums.length; i++)
        {
            if ((nums[i + 1] - nums[i] == 1) && (nums[i + 2] - nums[i] == 2)) 
            {  
                count = 0;
                while (nums[i + 1] - nums[i] == 1)
                {
                    i++;
                    count ++;
                }
                result.push(`${nums[i-count]}-${nums[i]}`);
            }
            else 
            {
                result.push(`${nums[i]}`);
            }
        }
    return result.join(',');
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
