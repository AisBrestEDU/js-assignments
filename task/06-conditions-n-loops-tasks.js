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
    var mod5 = !(num%5);
    var mod3 = !(num%3);
    if (mod3 || mod5) return (mod3 ? 'Fizz':'' ) + (mod5 ? 'Buzz':'');
    else return num;
    
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
    let res =1;
    for (let i = 1; i<=n; i++){
        res*=i;
    }
    return res;
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
    return (n1+n2)*(n2-n1+1)/2;
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
    return !(a+b<=c || a+c<=b || b+c<=a)
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
    for (let el1 of [rect1.top, rect1.top+rect1.height]){
        for (let el2 of [rect1.left, rect1.left+rect1.width]){
            if (el1>=rect2.top && el1<=rect2.top+rect2.height && el2>=rect2.left && el2<=rect2.left+rect2.width) return true;
        }
    }
    for (let el1 of [rect2.top, rect2.top+rect2.height]){
        for (let el2 of [rect2.left, rect2.left+rect2.width]){
            if (el1>=rect1.top && el1<=rect1.top+rect1.height && el2>=rect1.left && el2<=rect1.left+rect1.width) return true;
        }
    }

    return false;
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
    return (circle.center.x-point.x)**2+(circle.center.y-point.y)**2<circle.radius**2;
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
        if (str.indexOf(c) == i && str.slice(i+1).search(c) == -1) {
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
    return `${isStartIncluded ? '[' : '('}${Math.min(a,b)}, ${Math.max(a,b)}${isEndIncluded ? ']' : ')'}`
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
    let arr = Array.from(str);
    // arr.reverse().join('') hmmm... too easy :)
    for (let i = 0; i<Math.floor(arr.length/2); i++){
        [arr[i], arr[arr.length-i-1]]=[arr[arr.length-i-1], arr[i]]
    }
    return arr.join('');
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
    let res = 0;
    while (num>0){
        res*=10;
        res+=num%10;
        num = Math.floor(num/10);
    }
    return res;
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
    let arr = `${ccn}`.split('').reverse();
    let sum = 0;
    for(let i=0; i<arr.length; i++){
        if(i%2 == 0) {
            sum += +arr[i]; 
        }else {
            +arr[i]*2 > 9 ? sum += +arr[i]*2 -9 : sum += +arr[i]*2; 
        }
    }
    return sum%10 === 0;
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
    while(num>9){
        let res = 0;
        while(num>0){
            res+=num%10;
            num = Math.floor(num/10);
        }
        num = res;
    }
    return num;
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
    let arr = Array(0);
    
    for (let el of str.split('')){
        if (el == '(' || el == '[' || el == '{' || el == '<') {
            arr.push(el);
            continue;
        }
        if ((el == ')' && arr[arr.length - 1] == '(') || (el == '}' && arr[arr.length - 1] == '{') || 
            (el == ']' && arr[arr.length - 1] == '[') || (el == '>' && arr[arr.length - 1] == '<')){
            arr.pop();
            continue;
        }
        else return false
    }
    return arr.length == 0;
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
    function isInInterval(num, begin, end){
        return num>=begin && num<=end;
    }
    let intervals = [
        {begin:0, end:45000},
        {begin:45000, end:90000}, 
        {begin:90000, end:60*45*1000}, 
        {begin:60*45*1000, end:60*90*1000}, 
        {begin:60*90*1000, end:3600*22*1000}, 
        {begin:3600*22*1000, end:3600*36*1000}, 
        {begin:3600*36*1000, end:3600*24*25*1000}, 
        {begin:3600*24*25*1000, end:3600*24*45*1000}, 
        {begin:3600*24*45*1000, end:3600*24*345*1000}, 
        {begin:3600*24*345*1000, end:3600*24*545*1000}, 
        {begin:3600*24*545*1000, end:Number.POSITIVE_INFINITY}
    ]
    let f = new Map();
    f.set(0, 'a few seconds ago');
    f.set(1, 'a minute ago');
    f.set(2, ' minutes ago');
    f.set(3, 'an hour ago');
    f.set(4, ' hours ago');
    f.set(5, 'a day ago');
    f.set(6, ' days ago');
    f.set(7, 'a month ago');
    f.set(8, ' months ago');
    f.set(9, 'a year ago');
    f.set(10, ' years ago');
    let index = 0;
    let sec = endDate.getTime()-startDate.getTime();
    while(!isInInterval(sec, intervals[index].begin, intervals[index].end)){
        index++;
    }
    if (index>1 && index%2 == 0){
        switch (index) {
            case 2:
                return Math.round((sec-1)/1000/60) + f.get(index);
            case 4:
                return Math.round((sec-1)/1000/3600) + f.get(index);
            case 6:
                return Math.round((sec-1)/3600/24/1000) + f.get(index);
            case 8:
                return Math.round((sec-1)/3600/24/30/1000) + f.get(index);
            case 10:
                return Math.round((sec-1)/3600/24/30/12/1000) + f.get(index);
        }
    }
    else return f.get(index);
    
    
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
    let res = Array();
    while (num>0){
        res.push(num%n);
        num = Math.floor(num/n);
    }
    return res.reverse().join('');
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
    let res = ''
    let minLen = pathes.reduce((acc, val) => acc>val.length?val.length: acc, Number.POSITIVE_INFINITY);
    for (let i = 0; i<minLen; i++){
        let f = true
        for (let j = 0; j<pathes.length; j++){
            if (pathes[j][i]!=pathes[0][i]) f = false;
        }
        if (f) res=res+pathes[0][i];
        else break;
    }
    return res.slice(0, res.lastIndexOf('/')+1);
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
    let res = Array()
    for (let i = 0; i<m1.length;i++){
        let res1 = Array();
        for (let j = 0; j<m1.length;j++){
            let res2 = 0;
            for (let k = 0; k<m1[i].length;k++){
                res2 += m1[i][k]*m2[k][j];
            }
            res1.push(res2);
        }
        res.push(res1);
    }
    return res;
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
   
    for (let i of [0,1,2]){
            if(position[i][1] == position[i][0] && position[i][1] == position[i][2] && position[i][2]) return position[i][1];
            if(position[1][i] == position[0][i] && position[1][i] == position[2][i] && position[i][2]) return position[2][i];
    }
    if(position[1][1] == position[0][0] && position[1][1] == position[2][2] && position[2][2]) return position[1][1];
    if(position[0][2] == position[1][1] && position[1][1] == position[2][0] && position[0][2]) return position[2][0];
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
