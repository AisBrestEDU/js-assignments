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
    switch(true) {
        case num % 3 === 0 && num % 5 !== 0:
            return 'Fizz'
        case num % 5 === 0 && num % 3 !== 0:
            return 'Buzz'
        case num % 5 === 0 && num % 3 === 0:
            return 'FizzBuzz'
        default:
            return num
    }
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
    while(n) {
        result *= n--;
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
    for (let i = n1; i <= n2; i++) result += i;
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
    return a < b + c && b < a + c && c < a + b;
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
    return !(rect1.top > rect2.top + rect2.width ||
        rect1.top + rect1.width < rect2.top ||
        rect1.left > rect2.left + rect2.height ||
        rect1.height + rect1.left < rect2.left);
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
    return (Math.pow(circle.radius, 2) - ((Math.pow(circle.center.x - point.x, 2)) +
        (Math.pow(circle.center.y - point.y, 2)))) > 0;
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
    for (let i = 0; i < str.length; i++) {
        let tempChar = str[i];
        if (str.indexOf(tempChar) === i && str.indexOf(tempChar, i + 1) === -1) {
            return tempChar;
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
    let resultStr = '';
    if (isStartIncluded === true) resultStr = resultStr + '[';
    else resultStr = resultStr + '(';
    if (a < b) resultStr = resultStr + a.toString() + ', ' + b.toString();
    else resultStr = resultStr + b.toString() + ', ' + a.toString();
    if (isEndIncluded === true) resultStr = resultStr + ']';
    else resultStr = resultStr + ')';
    return resultStr;
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
    let resultStr = '';
    for (let i = str.length - 1; i >= 0; i--) resultStr = resultStr.concat(str[i]);
    return resultStr;
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
    let answer = '';
    for (let i = num.toString().length - 1; i >= 0; i--) answer = answer.concat(num.toString()[i])
    return parseInt(answer);
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
    for (let i = 0; i < ccn.toString().length; i++) {
        let digit = parseInt(ccn.toString()[i]);
        if ((ccn.toString().length - i) % 2 === 0) {
            digit *= 2;
        }
        if (digit > 9){
            digit -= 9
        }
        sum += digit;
    }
    return sum % 10 === 0;
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
    let sum = 0;
    do {
        sum = 0;
        let numLength = num.toString().length;
        for (let i = 0; i < numLength; i++) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        num = sum;

    } while (sum > 9)
    return sum;
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
    let brackets = '[]{}()<>';
    let stack = [];
    for (let item of str) {
        let bracketIndex = brackets.indexOf(item);
        if (bracketIndex % 2 === 0) {
            stack.push(bracketIndex + 1)
        }
        else if (stack.pop() !== bracketIndex) {
            return false;
        }
    }
    return stack.length === 0;
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
    let duration = endDate - startDate;
    let seconds = duration / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;

    let round = (value) => {
        return value - Math.floor(value) > 0.5 ? Math.round(value) : Math.floor(value);
    }

    switch(true){
        case seconds >= 0 && seconds <= 45:
            return 'a few seconds ago';
        case seconds > 45 && seconds <= 90:
            return 'a minute ago'
        case seconds > 90 && minutes <= 45:
            return `${round(minutes)} minutes ago`;
        case minutes > 45 && minutes <= 90:
            return 'an hour ago';
        case minutes > 90 && hours <= 22:
            return `${round(hours)} hours ago`;
        case hours > 22 && hours <= 36:
            return 'a day ago';
        case hours > 36 && days <= 25:
            return `${round(days)} days ago`;
        case days > 25 && days <= 45:
            return 'a month ago';
        case days > 45 && days <= 345:
            return `${Math.round(days / 30)} months ago`;
        case days > 345 && days <= 545:
            return 'a year ago';
        case days > 545:
            return `${round(days / 365)} years ago`;
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
    switch(n) {
        case 2:
            return num.toString(2);
        case 3:
            return num.toString(3);
        case 4:
            return num.toString(4);
        case 5:
            return num.toString(5);
        case 6:
            return num.toString(6);
        case 7:
            return num.toString(7);
        case 8:
            return num.toString(8);
        case 9:
            return num.toString(9);
        case 10:
            return num.toString();
    }
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
    pathes = pathes.map(value => value.split('/'))
    let commonPath = '';
    let sortedArr = [];
    for (let arr of pathes) {
        for (let i = 0; i < arr.length; i++) {
            sortedArr[i] = sortedArr[i] || [];
            sortedArr[i].push(arr[i]);
        }
    }
    let equal = false;
    for (let item of sortedArr) {
        for (let i = 0; i < item.length - 1; i++) {
            equal = item[i] === item[i + 1];
        }
        if (equal) {
            if (item[0] === "") {
                commonPath += '/'
            }
            else {
                commonPath += `${item[0]}/`
            }
        }
    }
    return commonPath;
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
    let resultMatrix = [];
    for (let i = 0; i < m1.length; i++){
        resultMatrix.push([]);
        for (let rowM2 = 0; rowM2 < m2[i].length; rowM2++){
            let multiplicationResult = 0;
            for(let value1 = 0, value2 = 0; value1 < m1[i].length, value2 < m2.length; value1++, value2++) {
                multiplicationResult += m1[i][value1] * m2[value2][rowM2];
            }
            resultMatrix[i].push(multiplicationResult);
        }
    }
    return resultMatrix;
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
    let checkStrings = (str1, str2, str3) => {
        return str1 === str2 && str2 === str3 && str3 !== undefined;
    }

    for (let arrayIndex = 0; arrayIndex < position.length; arrayIndex++){
        if (checkStrings(position[arrayIndex][0], position[arrayIndex][1], position[arrayIndex][2])){
            return position[arrayIndex][0];
        }
        if(checkStrings(position[0][arrayIndex], position[1][arrayIndex], position[2][arrayIndex])) {
            return position[0][arrayIndex];
        }
        if(checkStrings(position[0][0], position[1][1], position[2][2])){
            return position[0][0];
        }
        if(checkStrings(position[0][2], position[1][1], position[2][0])) {
            return position[0][2];
        }
    }
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
