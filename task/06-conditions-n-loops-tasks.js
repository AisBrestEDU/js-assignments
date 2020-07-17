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
    if (num % 15 === 0) {
        return 'FizzBuzz';
    }

    if (num % 5 === 0) {
        return 'Buzz';
    }

    if (num % 3 === 0) {
        return 'Fizz';
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
    let result = 1;
    for (let i = n; i > 0; i--) {
        result *= i;
    }
    return result;
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
    let result = 0;
    for (let i = n1; i <= n2; i++) {
        result += i;
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
function isTriangle(a, b, c) {
    let biggestSide = Math.max(a, b, c);
    let isTriangleCouldBeBuilt = a + b + c > biggestSide * 2;
    return isTriangleCouldBeBuilt;
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
    let isHeightsCross = (rect2.top < rect1.top | rect2.top + rect2.height < rect1.top)
        | (rect2.top < rect1.top + rect1.height | rect2.top + rect2.height < rect1.top + rect1.height)
    let isWidthCross = (rect2.left < rect1.left | rect2.left + rect2.width < rect1.left)
        | (rect2.left < rect1.left + rect1.width | rect2.left + rect2.width < rect1.left + rect1.width)
    let result = isHeightsCross & isWidthCross;
    return result;
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
    let result = Math.pow((point.x - circle.center.x), 2)
        + Math.pow((point.y - circle.center.y), 2)
        < Math.pow(circle.radius, 2);
    return result;
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
    str = new String(str);
    for (let index = 0; index < str.length; index++) {
        let comparingSymbol = str[index];
        let comparingString = str.replace(comparingSymbol, '')
        let isTheSymbolRepeated = comparingString.indexOf(str[index]) === -1;
        if (isTheSymbolRepeated) {
            return comparingSymbol
        }
        ;
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

    let firstBracket = isStartIncluded ? '[' : '(';
    let lastBracket = isEndIncluded ? ']' : ')';
    let sumNumbers = a + b;
    let minValue = Math.min(a, b);
    let result = firstBracket + minValue + ', ' + (sumNumbers - minValue) + lastBracket;
    return result;
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
    let result = str.split('').reverse().join('');
    return result.toString();

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
    let reversedInputAsArray = num.toString().split('').reverse();
    let reversedInputAsString = reversedInputAsArray.join();
    let result = parseInt(reversedInputAsString.replace(/,/g, ''));
    return result;
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
    let sum = 0;
    let arr = ccn.toString().replace(/\D/g, '0').split('').map(Number);
    for (let i = 0; i < arr.length; i++) {
        let cardNum = arr[i];
        if ((arr.length - i) % 2 === 0) {
            cardNum = cardNum * 2;
            if (cardNum > 9) {
                cardNum = cardNum - 9;
            }
        }
        sum += cardNum;
    }
    let result = sum % 10 === 0;
    return result;
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
    let sumElements = 0;
    let result = 0;
    let inputAsArray = num.toString();
    for (let iterator = 0; iterator < inputAsArray.length; iterator++) {
        let currentNumber = parseInt(inputAsArray[iterator]);
        sumElements += currentNumber;
    }
    let resultAsString = sumElements.toString();

    for (let iterator = 0; iterator < resultAsString.length; iterator++) {
        let currentNumber = parseInt(resultAsString[iterator]);
        result += currentNumber;
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
    let leftBrackets = "{[(<";
    let rightBrackets = "}])>";
    while (str.length > 0) {
        let thereIsOnlyOneSymbol = (str.length === 1)
        if (thereIsOnlyOneSymbol) {
            return false;
        }
        let index = 0;
        while (rightBrackets.indexOf(str[index]) === -1) {
            index++;
        }
        let rightBracketIndex = rightBrackets.indexOf(str[index]);
        let previousBracketIndex = leftBrackets.indexOf(str[index - 1]);
        let IsThisPairCoupledCorrectly = (rightBracketIndex === previousBracketIndex);
        if (!IsThisPairCoupledCorrectly) {
            return false;
        }
        ;
        if (str.length == 2) {
            str = "";
        } else {
            str = str.substring(0, index - 1) + str.substring(index + 1, str.length);
        }
    }
    return true;
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

    let msecs = (new Date(endDate).getTime() - new Date(startDate).getTime());

    let round = function (number) {
        let temp = number * 10;
        if (temp % 10 <= 5) {
            return Math.floor(number)
        }
        return Math.ceil(number);
    }

    let secInSec = 1000;
    let minutesInMsec = secInSec * 60;
    let hoursInMSec = minutesInMsec * 60;
    let daysInMSec = hoursInMSec * 24;
    let monthsInMSec = daysInMSec * 30;
    let yearsInMSec = daysInMSec * 365;

    let t = round(msecs / secInSec);
    let sec = round(msecs / secInSec);
    let minutes = round(msecs / minutesInMsec);
    let hours = round(msecs / hoursInMSec);
    let days = round(msecs / daysInMSec);
    let months = round(msecs / monthsInMSec);
    let years = round(msecs / yearsInMSec);

    if (msecs > 44668800001) {
        return `${years} years ago`
    }
    ;
    if (msecs >= 29894400000) {
        return `a year ago`
    }
    ;
    if (msecs >= 3970799900) {
        return `${months} months ago`
    }
    ;
    if (msecs > 2160000000) {
        return `a month ago`
    }
    ;
    if (msecs > 129600000) {
        return `${days} days ago`
    }
    ;
    if (msecs > 79200000) {
        return `a day ago`
    }
    ;
    if (msecs > 5400000) {
        return `${hours} hours ago`
    }
    ;
    if (msecs > 2700000) {
        return `an hour ago`
    }
    ;
    if (msecs > 90000) {
        return `${minutes} minutes ago`
    }
    ;
    if (msecs > 45000) {
        return `a minute ago`
    }
    ;
    return "a few seconds ago";
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
    let result = num.toString(n);
    return result;
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
    let result = new String();
    for (let i = 0; i < pathes[0].length; i++) {
        if (pathes.every(a => a[i] == pathes[0][i])) {
            result += pathes[0][i];
        } else break;
    }
    if (result[result.length] !== '/') {
        result = result.substring(0, result.lastIndexOf('/') + 1)
    }
    return result;
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
    let rowsQuantity = m1.length;
    let rowsM2 = m2.length;
    let columnsQuantity = m2[0].length;
    let result = [];

    for (let thisColumn = 0; thisColumn < rowsQuantity; thisColumn++) {
        result[thisColumn] = [];
    }
    for (let thisRow = 0; thisRow < columnsQuantity; thisRow++) {
        for (let rowPassing = 0; rowPassing < rowsQuantity; rowPassing++) {
            let thisElementAmount = 0;
            for (let j = 0; j < rowsM2; j++)
                thisElementAmount += m1[rowPassing][j] * m2[j][thisRow];
            result[rowPassing][thisRow] = thisElementAmount;
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
    let OCrossings = []
    let XCrossings = [];
    let winMatches = [123, 456, 789, 147, 258, 369, 753, 159];
    for (let column = 0; column < 3; column++) {
        for (let line = 0; line < 3; line++) {
            let thisElement = position[column][line];
            if (thisElement === 'X') {
                XCrossings.push(column * 3 + line + 1);
            }
            if (thisElement === '0') {
                OCrossings.push(column * 3 + line + 1);
            }
        }
    }

    function contains(where, what) {
        for (let i = 0; i < what.length; i++) {
            if (where.indexOf(what[i]) == -1) return false;
        }
        return true;
    }

    for (let iterator = 0; iterator < winMatches.length; iterator++) {
        let oContainsElement = contains(OCrossings.toString(), winMatches[iterator].toString());
        if (oContainsElement) return '0';
        let xContainsElement = contains(XCrossings.toString(), winMatches[iterator].toString());
        if (xContainsElement) return 'X';
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
    getIntervalString: getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    timespanToHumanString: timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition: evaluateTicTacToePosition
};
