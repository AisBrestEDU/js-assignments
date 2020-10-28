'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
    if (num % 3 === 0 && num % 5 === 0) {
        return 'FizzBuzz';
    }
    if (num % 3 === 0) {
        return 'Fizz';
    }

    if (num % 5 === 0) {
        return 'Buzz';
    }
    return num;
}


/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
    let acc = n;
    if (n === 0 || n === 1) {
        return 1;
    } else {
        for(let i = n; i > 1; i--){
        acc = acc * (i - 1);
        }
    }
    return acc;
}


/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
    let result = n1 + n2;
    let i = n1 + 1;
    while (i < n2) {
        result += i;
        i += 1;
    }
    return result;
}


/**
 * Returns true, if a triangle can be built with the specified sides a,b,c and false in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a,b,c) {
    return ((a + b) > c && (b + c) > a && (a + c) > b);
}


/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object 
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 * 
 *  (5;5)
 *     -------------  
 *     |           | 
 *     |           |  height = 10
 *     ------------- 
 *        width=20    
 * 
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 * 
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 * 
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *  
 */
function doRectanglesOverlap(rect1, rect2) {
    return !(rect2.left > rect1.left + rect1.width ||
        rect1.left > rect2.left + rect2.width ||
        rect1.top > rect2.top + rect2.height ||
        rect2.top > rect1.top + rect1.height)
}


/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of 
 *  {
 *     center: {
 *       x: 5,       
 *       y: 5
 *     },        
 *     radius: 20
 *  }
 * 
 * Point is object of 
 *  {
 *     x: 5,
 *     y: 5
 *  }
 * 
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *   
 */
function isInsideCircle(circle, point) {
    return Math.hypot(circle.center.x - point.x, circle.center.y - point.y) < circle.radius;
}


/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
    for (let i = 0; i < str.length; i += 1) {
        if(str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
            return str[i];
        }
    }
    return null;
}


/**
 * Returns the string representation of math interval, specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
    return (isStartIncluded ? '[' : '(') + Math.min(a, b) + ', ' + Math.max(a, b) + (isEndIncluded ? ']' : ')');
}


/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
    let arr = str.split('');
    return arr.reverse().join('');

//     let i = 0;
//     let result = "";

//   while (i < str.length) {
//     let ch = str [str.length - i - 1];
//     result = result + ch;
//     i = i + 1;
//     }
//   return result;
}


/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
    let numToStr = num.toString();
    let arrOfInts = numToStr.split('');
    return arrOfInts.reverse().join('');
}


/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
    const ccnString = ccn.toString();
    let ccnNumber = 0;
    for(let i = 0; i < ccnString.length; i += 1){
        let ccnNum = Number(ccnString[i]);
        if ((ccnString.length - i) % 2 === 0) {
            ccnNum *= 2;
            if(ccnNum > 9) {
                ccnNum -= 9;
            }
        }
        ccnNumber += ccnNum;   
    }
    return ccnNumber % 10 === 0;
}


/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
    let result = num;
    while (result > 9) {
        let number = result;
        result = 0;
        while (number > 0) {
            result += (number % 10);
            number /= 10;
            number = Math.floor(number);
        }
    }
    return result;
}


/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true 
 */
function isBracketsBalanced(str) {
    let opening = ['(', '[', '{', '<'];
    let closing = [')', ']', '}', '>'];
    let result = [];
    if (closing.includes(str[0]) || str.length % 2 !== 0) {
        return false;
    }
    for (let i = 0; i < str.length; i += 1) {
        if (opening.includes(str[i])) {
            result.push(str[i]);
        } else {
            if (closing.indexOf(str[i]) === opening.indexOf(result[result.length - 1])) {
                result.pop();
            }
        }
    }
    return result.length === 0;
}


/**
 * Returns the human readable string of time period specified by the start and end time.
 * The result string should be constrcuted using the folliwing rules:
 *
 * ---------------------------------------------------------------------
 *   Difference                 |  Result
 * ---------------------------------------------------------------------
 *    0 to 45 seconds           |  a few seconds ago
 *   45 to 90 seconds           |  a minute ago
 *   90 seconds to 45 minutes   |  2 minutes ago ... 45 minutes ago
 *   45 to 90 minutes           |  an hour ago
 *  90 minutes to 22 hours      |  2 hours ago ... 22 hours ago
 *  22 to 36 hours              |  a day ago
 *  36 hours to 25 days         |  2 days ago ... 25 days ago
 *  25 to 45 days               |  a month ago
 *  45 to 345 days              |  2 months ago ... 11 months ago
 *  345 to 545 days (1.5 years) |  a year ago
 *  546 days+                   |  2 years ago ... 20 years ago
 * ---------------------------------------------------------------------
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {string}
 *
 * @example
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:00.200')  => 'a few seconds ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:05.000')  => '5 minutes ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-02 03:00:05.000')  => 'a day ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2015-01-02 03:00:05.000')  => '15 years ago'
 *
 */
function timespanToHumanString(startDate, endDate) {
    let diff = endDate.getTime() - startDate.getTime();
    let sec = 1000;
    let min = sec * 60;
    let hour = min * 60;
    let day = hour * 24;

    if (diff <= (sec * 45)) {
        return 'a few seconds ago';
    }

    if (diff <= (sec * 90)) {
        return 'a minute ago';
    }

    if (diff <= (min * 45)) {
        return `${Math.round ((diff - 1) / min)} minutes ago`;
    }

    if (diff <= (min * 90)) {
        return 'an hour ago';
    }

    if (diff <= (22 * hour)) {
        return `${Math.round ((diff - 1) / hour)} hours ago`;
    }

    if (diff <= (36 * hour)) {
        return 'a day ago';
    }

    if (diff <= (25 * day)) {
        return `${Math.round ((diff - 1) / day)} days ago`;
    }

    if (diff <= (45 * day)) {
        return 'a month ago';
    }

    if (diff <= (345 * day)) {
        return `${Math.round (diff / day / 30)} months ago`;
    }

    if (diff <= (545 * day)) {
        return 'a year ago';
    }
    if (diff <= (345 * day)) {
        return `${Math.round (diff / day / 30)} months ago`;
    } else {
        return `${Math.round (diff / day / 365)} years ago`
    }
}


/**
 * Returns the string with n-ary (binary, ternary, etc, where n<=10) representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
    return num.toString(n);
}


/**
 * Returns the commom directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/webalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
    function minimalLength(arr) {
        let lengths = arr.map((element) => element.length);
        let minimal = Math.min.apply(Math, lengths);
        return minimal;
    }

    let result = [];
    let splited = [];
    let finalResult = '';
    for (let path of pathes) {
        splited.push(path.split('/'));
    }

    for (let i = 0; i < minimalLength(splited); i += 1) {
        let equal = true;

        for (let j = 1; j < splited.length; j += 1) {
            if (splited[0][i] !== splited[j][i]) {
                equal = false;
                break;
            }
        }

        if (equal === false) break;
        else result.push(splited[0][i]);
    }

    if (result.length === 1 && result[0] === '') {
        result[0] = '/';
        finalResult = result.join('/');
    }

    else if(result.length > 1) {
        finalResult = result.join('/') + '/';
    }

    return finalResult;
}


/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
    let result = [];
    for (let i = 0; i < m1.length; i++) {
        result[i] = [];
        for (let j = 0; j < m2[i].length; j++) {
            result[i][j] = 0;
            for (let k = 0; k < m1[i].length; k++)
                result[i][j] += m1[i][k] * m2[k][j];
        }
    }
    return result;
}


/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {
    let newPosition = [...position];

    for (let i = 0; i < newPosition.length; ) {
        let row = newPosition[i];
        if (row.length === 3 && !row.includes(undefined) && row.every((elem) => elem === row[0])) {
            return row[0];
        } else {
            i += 1;
        }
    }
    for (let j = 0; j < newPosition.length; ) {
        let column = [];
        for (let k = 0; k < newPosition.length; k += 1) {
            let current1 = newPosition[k][j];
            column.push(current1);
        }
        if(!column.includes(undefined) && column.every((elem) => elem === column[0])) {
            return column[0];
        } else {
            j += 1;
        }
    }
    let diagonal1 = [];
    let diagonal2 = [];
    for (let a = 0; a < newPosition.length; a += 1) {
        let current2 = newPosition[a][a];
        diagonal1.push(current2);
    }
    if (!diagonal1.includes(undefined) && diagonal1.every((elem) => elem === diagonal1[0])){
        return diagonal1[0];
    } else {
        for (let b = 0, c = newPosition.length - 1; c >= 0; b += 1, c -= 1) {
            let current3 = newPosition[b][c];
            diagonal2.push(current3);
        } 
        if (!diagonal2.includes(undefined) && diagonal2.every((elem) => elem === diagonal2[0])){
            return diagonal2[0];
    }
}
    return undefined;
}


module.exports = {
    getFizzBuzz: getFizzBuzz,
    getFactorial: getFactorial,
    getSumBetweenNumbers: getSumBetweenNumbers,
    isTriangle: isTriangle,
    doRectanglesOverlap: doRectanglesOverlap,
    isInsideCircle: isInsideCircle,
    findFirstSingleChar: findFirstSingleChar,
    getIntervalString : getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    timespanToHumanString : timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition : evaluateTicTacToePosition
};
