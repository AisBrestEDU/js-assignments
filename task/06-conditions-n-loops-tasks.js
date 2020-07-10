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
    if (num%3 === 0 && num%5 === 0) return 'FizzBuzz';
    else if (num%3 === 0) return 'Fizz';
    else if (num%5 === 0) return 'Buzz';
    return num;
    throw new Error('Not implemented');
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
    let res = 1;
    while(n){
        res *= n--;
    }
    return res;
    throw new Error('Not implemented');
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
    let res=0;
    while(n1<=n2){
        res += n1++;
    }
    return res;
    throw new Error('Not implemented');
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
    return ((a+b) > c && (a + c) > b && (b + c) > a) ? true : false;
    throw new Error('Not implemented');
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
    if ((rect1.left + rect1.width) <= rect2.left || (rect1.top + rect1.height) <= rect2.top) { 
        return false; 
    }
    if ((rect2.left + rect2.width ) <= rect1.left || (rect2.top + rect2.height) <= rect1.top) { 
        return false; 
    } 
    return true; 
    throw new Error('Not implemented');
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
    let x = point.x - circle.center.x;
    let y = point.y - circle.center.y;
    if(x**2 + y**2 < circle.radius**2) return true;
    return false;
    throw new Error('Not implemented');
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
    for (let i = 0; i <= str.length; i ++) {
        if (str.indexOf(str.charAt(i)) === str.lastIndexOf(str.charAt(i)) && str.indexOf !== -1) return str.charAt(i);       
    };
    return null;
    throw new Error('Not implemented');
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
    let start = '(';
    let end = ')';
    if(isStartIncluded) start = '[';
    if(isEndIncluded) end = ']';
    if(a < b) return `${start}${a}, ${b}${end}`;
    return `${start}${b}, ${a}${end}`;
    throw new Error('Not implemented');
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
    let res = '';
    for (var i = str.length - 1; i >= 0; i--) {
        res += str[i];
    }
    return res; 
    throw new Error('Not implemented');
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
    let str = num.toString();
    let res = '';
    for (var i = str.length - 1; i >= 0; i--) {
        res += str[i];
    }
    return +res;
    throw new Error('Not implemented');
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

    let arrSum = ccn.toString().split('').reverse();
    let sum = 0;
    for (let i = 0; i < arrSum.length; i++) {
        if (i % 2 == 0) {
            sum += +arrSum[i];
            } else if (+arrSum[i] * 2 > 9) {
                sum += +arrSum[i] * 2 - 9;
            }   else {
                sum += +arrSum[i] * 2;
            }
    } 
    return sum % 10 === 0;
    throw new Error('Not implemented');
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
    let digitRoot = (integer) => {
        let arr = integer.toString().split('');
        let sum = 0;
        for (let i = 0; i < arr.length; i ++) {
            sum += +arr[i];
        }
        return sum;
    }

    let res = digitRoot(num);
    return res > 9 ? digitRoot(res) : res;
    throw new Error('Not implemented');
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
        let arr = str.split('');
        for (let i = 0; i < arr.length;) {
            if (arr[i] === '[' && arr[i + 1] === ']') {
                arr.splice(i,2);
                i = 0;
            } else if (arr[i] === '{' && arr[i + 1] === '}') {
                arr.splice(i,2);
                i = 0;
            } else if (arr[i] === '(' && arr[i + 1] === ')') {
                arr.splice(i,2);
                i = 0;
            } else if (arr[i] === '<' && arr[i + 1] === '>') {
                arr.splice(i,2);
                i = 0;
            } else i++;
        }
        return arr.length === 0; 
    throw new Error('Not implemented');
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

    let timeShift = (time) => {
        return (time - Math.floor(time)) <= 0.5 ? Math.floor(time) : Math.round(time);
    }

    let period = (endDate - startDate)/1000;
    let min = period/60;
    let hour = min/60;
    let day = hour/24;
    let month = day/30;
    let year = month/12;

    if (period <= 45) return 'a few seconds ago';
    if (period <= 90) return 'a minute ago';
    if (min <= 45) return `${timeShift(min)} minutes ago`; 
    if (min <= 90) return 'an hour ago';
    if (hour <= 22) return `${timeShift(hour)} hours ago`;
    if (hour <= 36) return 'a day ago';
    if (day <= 25) return `${timeShift(day)} days ago`;
    if (day <= 45) return 'a month ago';
    if (day <= 345) return `${timeShift(month)} months ago`;
    if (day <= 545) return 'a year ago';
    return `${timeShift(year)} years ago`;

    throw new Error('Not implemented');
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
    throw new Error('Not implemented');
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
    let path = '';
    for (let i = 0; i < pathes[0].length; i++) {
        for (let k = 1; k < pathes.length; k++) {
            if (pathes[0].charAt(i) !== pathes[k].charAt(i)) {
                path = pathes[0].substring(0, i);   
                return path.substring(0, path.lastIndexOf('/') + 1);
            } 
        }
    }
    throw new Error('Not implemented');
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
    let res = Array(m1.length).fill(0)
    for (let i = 0; i < res.length; i++) {
        res[i] = Array(m2[0].length).fill(0);
    }
    for (let i = 0; i < res.length; i++) {
        for (let k = 0; k < res[i].length; k++) {
            for (let j = 0; j < m1[0].length; j++) {
                res[i][k] += m1[i][j] * m2[j][k]
            }
        }
    }
    return res;
    throw new Error('Not implemented');
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

    let X = 0;
    let O = 0;
    
    let checkWinner = (x, y) => {
        if (x === position.length) {
            X = 0;
            return  'X'
        } else if (y === position.length) {
            O = 0;
            return '0';
        } else {
            X = 0;
            O = 0;
            return undefined;
        }
    }

    for (let i = 0; i < position.length; i++) {
        if (position[i][i] === 'X') {
            X += 1;
        } else if (position[i][i] === '0') {
            O += 1
        }
    }

    let winner = checkWinner(X,O);

    for (let i = 0, k = position.length - 1; i < position.length, k >= 0; i++, k-- ) {
        if (position[i][k] === 'X') {
            X += 1;
        } else if (position[i][k] === '0') {
            O += 1
        }
    }

    winner = (winner === 'X' || winner === '0') ? winner : checkWinner(X,O);

    for (let i = 0; i < position.length; i++) {
        for (let j = 0; j < position.length; j++) {
            if (position[i][j] === 'X') {
                X += 1;
            } else if (position[i][j] === '0') {
                O += 1;
            }
        }

        winner = (winner === 'X' || winner === '0') ? winner : checkWinner(X,O);

    }

    winner = (winner === 'X' || winner === '0') ? winner : checkWinner(X,O);

    for (let i = 0; i < position.length; i++) {
        for (let j = 0; j < position.length; j++) {
            if (position[j][i] === 'X') {
                X += 1;
            } else if (position[j][i] === '0') {
                O += 1;
            }
        }

        winner = (winner === 'X' || winner === '0') ? winner : checkWinner(X,O);

    }
    
    winner = (winner === 'X' || winner === '0') ? winner : checkWinner(X,O);
    return winner;

    throw new Error('Not implemented');
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
