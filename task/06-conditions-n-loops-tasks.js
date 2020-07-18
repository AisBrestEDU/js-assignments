"use strict";

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
  if (num % 3 === 0 && num % 5 !== 0) {
    return "Fizz";
  } else if (num % 5 === 0 && num % 3 !== 0) {
    return "Buzz";
  } else if (num % 3 === 0 && num % 5 === 0) {
    return "FizzBuzz";
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
  let factorial = 1;
  for (let i = 1; i <= n; i++) {
    factorial *= i;
  }
  return factorial;
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
  let sum = 0;
  for (let i = n1; i <= n2; i++) {
    sum += i;
  }
  return sum;
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
  return a + b > c && a + c > b && c + b > a;
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
  return !(
    rect1.top > rect2.top + rect2.height ||
    rect1.top + rect1.height < rect2.top ||
    rect1.left > rect2.left + rect2.width ||
    rect1.left + rect1.width < rect2.left
  );
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
  return (
    Math.sqrt(
      (circle.center.x - point.x) ** 2 + (circle.center.y - point.y) ** 2
    ) < circle.radius
  );
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
    let singleChar = str.charAt(i);
    if (
      str.indexOf(singleChar) === i &&
      str.indexOf(singleChar, i + 1) === -1
    ) {
      return singleChar;
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
  let interval = "";
  if (b < a) {
    let c = a;
    a = b;
    b = c;
  }
  if (isStartIncluded) {
    if (isEndIncluded) {
      interval = "[" + a + ", " + b + "]";
    } else {
      interval = "[" + a + ", " + b + ")";
    }
  } else if (isEndIncluded) {
    interval = "(" + a + ", " + b + "]";
  } else {
    interval = "(" + a + ", " + b + ")";
  }

  return interval;
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
  let reversed = "";
  for (let i = 0; i <= str.length; i++) {
    reversed += str.charAt(str.length - i);
  }
  return reversed;
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
  let reversed = "";
  for (let i = 0; i <= str.length; i++) {
    reversed += str.charAt(str.length - i);
  }
  return reversed;
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
  let str = ccn.toString();
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    let currentNum = Number(str.charAt(i));
    if ((str.length - i) % 2 === 0) {
      currentNum = Number(str.charAt(i)) * 2;
      if (currentNum > 9) {
        currentNum -= 9;
      }
    }
    sum += currentNum;
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
  let sum;
  while (num > 9) {
    sum = 0;
    let str = num.toString();
    for (let i = 0; i < str.length; i++) {
      sum += Number(str.charAt(i));
    }
    num = sum;
  }
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
  const map = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };
  const closing = Object.values(map);
  const balancedBrackets = [];

  for (let char of str) {
    if (map[char]) {
      balancedBrackets.push(char);
    } else if (closing.includes(char) && char !== map[balancedBrackets.pop()]) {
      return false;
    }
  }
  return !balancedBrackets.length;
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
  let res = "";
  let period = endDate - startDate;
  if (period <= 45000) {
    res = "a few seconds ago";
  } else if (period > 45000 && period <= 90000) {
    res = "a minute ago";
  } else if (period > 90000 && period <= 2.7e6) {
    if (period % 60000 > 30000) {
      res = Math.ceil(period / 60000) + " minutes ago";
    } else {
      res = Math.floor(period / 60000) + " minutes ago";
    }
  } else if (period > 2.7e6 && period <= 5.4e6) {
    res = "an hour ago";
  } else if (period > 5.4e6 && period <= 7.92e7) {
    if (period % 3.6e6 > 1.8e6) {
      res = Math.ceil(period / 3.6e6) + " hours ago";
    } else {
      res = Math.floor(period / 3.6e6) + " hours ago";
    }
  } else if (period > 7.92e7 && period <= 1.296e8) {
    res = "a day ago";
  } else if (period > 1.296e8 && period <= 2.16e9) {
    if (period % 8.64e7 > 4.32e7) {
      res = Math.ceil(period / 8.64e7) + " days ago";
    } else {
      res = Math.floor(period / 8.64e7) + " days ago";
    }
  } else if (period > 2.16e9 && period <= 3.888e9) {
    res = "a month ago";
  } else if (period > 3.888e9 && period <= 2.981e10) {
    if (period % 2.592e9 > 1.296e9) {
      res = Math.ceil(period / 2.592e9) + " months ago";
    } else {
      res = Math.floor(period / 2.592e9) + " months ago";
    }
  } else if (period > 2.981e10 && period <= 4.709e10) {
    res = "a year ago";
  } else if (period % 3.154e10 > 1.577e10) {
    res = Math.ceil(period / 3.154e10) + " years ago";
  } else {
    res = Math.floor(period / 3.154e10) + " years ago";
  }
  return res;
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
  let res = [];
  while (Math.floor(num / n) !== 0 && num >= n) {
    res.unshift(num % n);
    num = Math.floor(num / n);
  }
  res.unshift(num);
  return res.join("");
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
  let common = "";
  let partsFrom1 = pathes[0].split("/"); //parts of first path
  let flag = true; //define if each path has current filename
  let firstSign = true; //define if each path has '/'
  partsFrom1.shift();
  for (let i = 0; i < partsFrom1.length; i++) {
    pathes.forEach((path) => {
      if (path.search(RegExp(`${partsFrom1[i]}/`)) < 0) {
        flag = false;
      }
      if (path.charAt(0) !== "/") {
        firstSign = false;
      }
    });
    if (firstSign === true && i === 0) {
      common += "/";
    }
    if (flag === true) {
      common += partsFrom1[i] + "/";
    }
  }
  return common;
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
  let m = new Array(m1.length);
  for (let i = 0; i < m1.length; i++) {
    m[i] = new Array(m2[0].length);
    for (let j = 0; j < m2[0].length; j++) {
      m[i][j] = 0;
      for (let r = 0; r < m1[0].length; r++) {
        m[i][j] += m1[i][r] * m2[r][j];
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
  let players = ["0", "X"];
  let winner;
  players.forEach((player) => {
    let result = true;
    for (let j = 0; j < 3; j++) {
      //first diagonal
      result = result && position[j][j] === player;
    }
    if (result) {
      winner = player;
    }
    result = true;
    for (let j = 0; j < 3; j++) {
      //second diagonal
      result = result && position[2 - j][j] === player;
    }
    if (result) {
      winner = player;
    }
    for (let k = 0; k < 3; k++) {
      result = true;
      for (let j = 0; j < 3; j++) {
        //lines
        result = result && position[k][j] === player;
      }
      if (result) {
        winner = player;
      }
      result = true;
      for (let j = 0; j < 3; j++) {
        //colums
        result = result && position[j][k] === player;
      }
      if (result) {
        winner = player;
      }
    }
    return false;
  });
  return winner;
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
  evaluateTicTacToePosition: evaluateTicTacToePosition,
};
