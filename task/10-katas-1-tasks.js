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
    var sides = ['N', 'E', 'S', 'W'];  // use array of cardinal directions only!
    class CompasPoint {
        constructor(abbreviation, azimuth){
            if ( azimuth < 0 ) {
                this.azimuth = 360 + azimuth;
            }
            else {   
                this.azimuth = azimuth;
            }
            this.abbreviation = abbreviation;
        }
    }

    class StartBuilder{
        buildNorthAndSouth(firstChar){
            return [new CompasPoint(firstChar, sides.indexOf(firstChar) * 90)]
            .concat(new MiddleBuilder().buildNorthAndSouth(firstChar));
        }
        buildEastAndWest(firstChar){
            return [new CompasPoint(firstChar, sides.indexOf(firstChar) * 90)]
            .concat(new MiddleBuilder().buildEastAndWest(firstChar));
        }
        
    }

    class MiddleBuilder{
        buildNorthAndSouth(firstChar){
            return new EndBuilder().build(firstChar + 'b', 'b')
            .concat(new EndBuilder().build(firstChar + firstChar, firstChar))
            .concat(new EndBuilder().build(firstChar + sides[(sides.indexOf(firstChar) + 1 ) % 4 ], firstChar))
            .concat(new EndBuilder().build(firstChar+sides[(sides.indexOf(firstChar) + 3 ) % 4 ], firstChar));
        }
        buildEastAndWest(firstChar){
            let prevDirection = sides[(sides.indexOf(firstChar) + 3 ) % 4 ];
            let nextDirection = sides[(sides.indexOf(firstChar) + 1 ) % 4 ];
            return new EndBuilder().build(firstChar + 'b', 'b')
            .concat([new CompasPoint(firstChar + nextDirection + firstChar, 
                                     sides.indexOf(firstChar) * 90 + 22.5 * this.countSign(firstChar, nextDirection))])
            .concat([new CompasPoint(firstChar + prevDirection + firstChar, 
                                     sides.indexOf(firstChar) * 90 + 22.5 * this.countSign(firstChar, prevDirection))])
        }
        
        countSign(firstChar, curChar){
            return Math.sign((sides.indexOf(curChar) + sides.indexOf(firstChar)) % 4 - (sides.indexOf(curChar) + sides.indexOf(firstChar) + 2 ) % 4 );
        }
        
    }

    class EndBuilder{
        build(begin, endChar){
            let startCharIndex = sides.indexOf(begin.charAt(0))
            let prevDirection = sides[(sides.indexOf(endChar) + 3 ) % 4 ];
            let nextDirection = sides[(sides.indexOf(endChar) + 1 ) % 4 ];
            let prevDirectionForb = sides[(startCharIndex + 3 ) % 4 ];
            let nextDirectionForb = sides[(startCharIndex + 1 ) % 4 ];
            if ( begin.charAt(0) === begin.charAt(1) ) {
                return  [new CompasPoint(begin + nextDirection, 
                                     startCharIndex * 90 + 22.5 * this.countSign( begin.charAt(0), nextDirection) ), 
                        new CompasPoint( begin + prevDirection,
                                     startCharIndex * 90 + 22.5 * this.countSign( begin.charAt(0), prevDirection) )
                    ];
            }
            else if( endChar == 'b' ) {
                return [new CompasPoint( begin + nextDirectionForb, 
                                    startCharIndex * 90 + 11.25 * this.countSign( begin.charAt(0), nextDirectionForb) ), 
                        new CompasPoint( begin + prevDirectionForb,
                                    startCharIndex * 90 + 11.25 * this.countSign( begin.charAt(0), prevDirectionForb) )
                   ];
            }
            else {
                return [new CompasPoint( begin, 90 * startCharIndex + 45 * this.countSign( begin.charAt(0), begin.charAt(1) ) ),
                        new CompasPoint( begin + 'b' + begin.charAt(0),
                                         90 * startCharIndex + 45 * this.countSign( begin.charAt(0), begin.charAt(1) ) 
                                         + 11.25 * this.countHardSign( begin.charAt(0), begin.charAt(1), begin.charAt(0) ) ), 
                        new CompasPoint( begin + 'b' + begin.charAt(1),
                                         90 * startCharIndex + 45 * this.countSign( begin.charAt(0), begin.charAt(1)) 
                                         + 11.25 * this.countHardSign( begin.charAt(0), begin.charAt(1), begin.charAt(1) ) )
                       ]
            }
        }
        countSign(firstChar, curChar){
            let res = Math.sign( (sides.indexOf(curChar) + sides.indexOf(firstChar) + 2 ) % 4 - (sides.indexOf(curChar) + sides.indexOf(firstChar)) % 4 )
            return sides.indexOf(curChar) % 2 == 1 ? res : -res;
        }
        countHardSign(firstChar, secChar, thirdChar){
            let sum =  sides.indexOf(firstChar) + sides.indexOf(thirdChar) + sides.indexOf(secChar);
            return sum < 3 || sum > 6 
                            ? sum % 2 === 1 ? -1 : 1
                            : sum % 2 === 0 ? -1 : 1;
        }
    }
    return (new StartBuilder().buildNorthAndSouth('N')
            .concat(new StartBuilder().buildNorthAndSouth('S')
            .concat(new StartBuilder().buildEastAndWest('E')
            .concat(new StartBuilder().buildEastAndWest('W'))))).sort( (l, r) => l.azimuth - r.azimuth );
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
    let ans = Array(1).fill(str);
    let f = true;
    while (f){
        let len = ans.length
        f = false;
        for (let i = 0; i< len; i++){
            let executions = /{([^{}]+)}/.exec(ans[i]); 
            if (executions){
                f = true;
                let variants = executions[1].split(',');
                for (let j = 1; j < variants.length; j++){
                    ans.push(ans[i].replace(executions[0], variants[j]));
                }
                ans[i] = ans[i].replace(executions[0], variants[0]);
            }
            else f|=false;
        }
        
    }
    ans = ans.filter( (x, idx) => ans.indexOf(x) === idx)
    for (let el of ans){
        yield el;
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
    let ans = Array(n).fill(0).map((x)=>Array(n).fill(0))
    let counter = 0, i = 0, j = 0, delta = 1;
    for (let  k = 0; k < (n * 2 - 1); k++) {
        [j,i] = k % 2 == 1 ? [Math.min(k, n - 1), k - Math.min(k, n - 1) ] : [k - Math.min(k, n - 1), Math.min(k, n - 1)]; 
        while (i >= 0 && j >= 0 && j < n && i < n){
            ans[i][j] = counter++;
            j += delta;
            i -= delta;
        }
        delta *= -1;
    }
    return ans;
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
    let maxVal=dominoes.reduce((acc, val) => Math.max(Math.max(val[1], val[0]), acc),0);
    let matrixOfNe = Array(maxVal+1).fill(0).map((x)=>Array(maxVal+1).fill(0));
    
    for (let el of dominoes){
        matrixOfNe[el[0]][el[1]]++;
        matrixOfNe[el[1]][el[0]]++;
    }
    for (let i = 0; i < matrixOfNe.length; i++){
        if (matrixOfNe[i][i] !== 0 && matrixOfNe[i][i] === matrixOfNe[i].reduce( (acc, val) => acc + val, 0)) return false;
    }
    
    if (matrixOfNe.reduce( (acc1, val1) => acc1 + val1.reduce((acc2, val2) => acc2 + val2, 0) % 2, 0) > 2) return false;
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

function accom(acc, val){
    if ( acc[acc.length - 1] + 1 === val || acc.length === 0){
        acc.push(val);
        return acc;
    }
    else{
        
        return acc;
    }
}

function extractRanges(nums) {
    let ans = nums.join(',');
    let curIdx = 0;
    while (curIdx < nums.length){
        let range = nums.slice(curIdx).reduce((acc,val) => accom(acc, val), []);
        if (range.length > 2){
            ans = ans.replace(range.join(','), `${range[0]}-${range[range.length-1]}`)
            curIdx = nums.indexOf(range[range.length - 1]) + 1;
        }
        else curIdx++;
    }
    return ans;
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
