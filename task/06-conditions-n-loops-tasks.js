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
    if (num % 15 == 0)
        return "FizzBuzz";
    else if (num % 3 == 0)
        return "Fizz";
    else if (num % 5 == 0)
        return "Buzz";
    else
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
    let fact
    if (n === 0 || n === 1) {
        fact = 1;
    } else {
        fact = parseInt(n);
        for (let i = 1; i < n; i++) {
            fact *= i;
        }
    }
    return fact;
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
    let arr = [];
    let sum = 0;
    for (n1; n1 <= n2; n1++) {
        arr.push(n1);
    }
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i]
    }
    return sum
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
    if ((a + b <= c) || (a + c <= b) || (b + c <= a) || (a <= 0) || (b <= 0) || (c <= 0)) {
        return false;
    }
    else {
        return true;
    }
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
    const getPointsCoordinates = (rect) => {
        return {
            leftTopPoint: { x: rect.left, y: -rect.top },
            rightTopPoint: { x: rect.left + rect.width, y: -rect.top  },
            rightBottomPoint: { x: rect.left + rect.width, y: -rect.top - rect.height },
            leftBottomPoint: { x: rect.left, y: -rect.top - rect.height },
        }
    }
    const rect1Points = getPointsCoordinates(rect1);
    const rect2Points = getPointsCoordinates(rect2);
    let result = false;
    Object.entries(rect1Points).forEach(([key, pointCoordinates]) => {
        const betweenByX = pointCoordinates.x >= rect2Points.leftBottomPoint.x && pointCoordinates.x <= rect2Points.rightTopPoint.x;
        const betweenByY = pointCoordinates.y >= rect2Points.leftBottomPoint.y && pointCoordinates.y <= rect2Points.rightTopPoint.y;
        if (betweenByX && betweenByY) {
            result = true;
        }
    });
    Object.entries(rect2Points).forEach(([key, pointCoordinates]) => {
        const betweenByX = pointCoordinates.x >= rect1Points.leftBottomPoint.x && pointCoordinates.x <= rect1Points.rightTopPoint.x;
        const betweenByY = pointCoordinates.y >= rect1Points.leftBottomPoint.y && pointCoordinates.y <= rect1Points.rightTopPoint.y;
        if (betweenByX && betweenByY) {
            result = true;
        }
    });
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
    if ( Math.sqrt((circle.center.x - point.x)**2 + (circle.center.y - point.y)**2) - circle.radius < 0) {
        return true
    }
    else 
        return false
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
        let c = str.charAt(i);
        if (str.indexOf(c) === i && str.indexOf(c, i + 1) === -1) {
          return c;
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
    let string = ''
    let isStIncluded = (isStartIncluded) ? '[':'('
    let interval = (a > b) ? b + ', ' + a : a + ', ' + b
    let isEnIncluded = (isEndIncluded) ? ']' :')' 
    string = `${isStIncluded}${interval}${isEnIncluded}`;
    return string
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
    return str.split('').reverse().join('')
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
    return parseInt(num.toString().split('').reverse().join(''), 10)
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
    let ccnString = ccn.toString();
    if (/[^0-9-\s]+/.test(ccnString)) {
        return false;
    }
    let nCheck = 0;
    let nDigit = 0
    let bEven = false;
    ccnString = ccnString.replace(/\D/g, "");

    for (let n = ccnString.length - 1; n >= 0; n--) {
        let cDigit = ccnString.charAt(n);
        nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) { 
                nDigit -= 9;
            }
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return nCheck % 10 === 0;
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
    let number = num.toString().split('').reduce((acc,item) => Number(acc) + Number(item), 0);
    return number > 9 ? parseInt(number.toString()[0]) + parseInt(number.toString()[number.toString().length - 1]) : number  
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
    const parentheses = "[]{}()<>";
    const stack = [];
    let i, character, bracePosition;

    for(i = 0; character = str[i]; i++) {
        bracePosition = parentheses.indexOf(character);

        if(bracePosition === -1) {
            continue;
        }

        if(bracePosition % 2 === 0) {
            stack.push(bracePosition + 1);
        } else {
            if(stack.length === 0 || stack.pop() !== bracePosition) {
                return false;
            }
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
    const timeStamp = endDate.getTime() - startDate.getTime();
    const seconds45 = 45 * 1000;
    const seconds90 = 90 * 1000;
    const minutes45 = 45 * 60 * 1000;
    const minutes90 = 90 * 60 * 1000;
    const hours22 = 22 * 3600 * 1000;
    const hours36 = 36 * 3600 * 1000;
    const days25 = 25 * 24 * 3600 * 1000;
    const days45 = 45 * 24 * 3600 * 1000;
    const days345 = 345 * 24 * 3600 * 1000;
    const days545 = 545 * 24 * 3600 * 1000;
    if (timeStamp > 0 && timeStamp <= seconds45) {
        return 'a few seconds ago';
    } else if (timeStamp > seconds45 && timeStamp <= seconds90) {
        return 'a minute ago';
    } else if (timeStamp > seconds90 && timeStamp <= minutes45) {
        const seconds = timeStamp / 1000;
        if (seconds % 30 === 0) {
            return `${Math.floor(seconds / 60)} minutes ago`;
        } else {
            return `${Math.ceil(seconds / 60)} minutes ago`;
        }
    } else if (timeStamp > minutes45 && timeStamp <= minutes90) {
        return 'an hour ago';
    } else if (timeStamp > minutes90 && timeStamp <= hours22) {
        const minutes = timeStamp / (1000 * 60);
        if (minutes % 30 === 0) {
            return `${Math.floor(minutes / 60)} hours ago`;
        } else {
            return `${Math.ceil(minutes / 60)} hours ago`;
        }
    } else if (timeStamp > minutes90 && timeStamp <= hours36) {
        return 'a day ago';
    } else if (timeStamp > hours36 && timeStamp <= days25) {
        const hours = timeStamp / (1000 * 60 * 60);
        if (hours % 12 === 0) {
            return `${Math.floor(hours / 24)} days ago`;
        } else {
            return `${Math.ceil(hours / 24)} days ago`;
        }
    } else if (timeStamp > days25 && timeStamp <= days45) {
        return 'a month ago';
    } else if (timeStamp > days45 && timeStamp <= days345) {
        const days = timeStamp / (1000 * 60 * 60 * 24);
        return `${Math.round(days / 30)} months ago`;
    } else if (timeStamp > days345 && timeStamp <= days545) {
        return 'a year ago';
    } else if (timeStamp > days545) {
        const months = timeStamp / (60 * 60 * 24 * 30 * 1000);
        return `${Math.round(months / 12)} years ago`;
    }
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
    return num.toString(n)
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
    const splittedPaths = pathes.map((path) => path.split('/'));
    let result = '';

    splittedPaths[0].forEach((str, index) => {
        const isAllContains = splittedPaths.every((checkingPath) => checkingPath[index] === str);
        if (isAllContains && str.length) {
            if (!result.length) {
                result = result + '/';
            }
            result = result + str + '/';
        } else if (isAllContains && !str.length) {
            result = result + '/';
        }
    });
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
    const aNumRows = m1.length;
    const aNumCols = m1[0].length;
    const bNumRows = m2.length;
    const bNumCols = m2[0].length;

    const m = new Array(aNumRows);
    for (let r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols);
        for (let c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;
            for (let i = 0; i < aNumCols; ++i) {
                m[r][c] += m1[r][i] * m2[i][c];
            }
        }
    }
    return m;
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
    const adjustedPosition = position.map((row) => {
        return new Array(3).fill(undefined).map((element, index) => {
            if (row[index]) {
                return row[index];
            }
            return element;
        });
    });
    const flattedPosition = adjustedPosition.flat(Infinity);
    const rowFilled = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    const columnFilled = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    const diagFilled = [[0, 4, 8], [2, 4, 6]];
    const allPossibleWins = rowFilled.concat(columnFilled).concat(diagFilled);
    let result = undefined;
    allPossibleWins.forEach((winCombination) => {
        if (winCombination.every((index) => flattedPosition[index] === 'X')) {
            result = 'X';
        } else if (winCombination.every((index) => flattedPosition[index] === '0')) {
            result = '0';
        }
    });
    return result;
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
