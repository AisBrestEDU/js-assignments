'use strict';


function concatenateStrings(value1, value2) {
    return value1 + value2;
}
function getStringLength(value) {
    return value.length;
}
function getStringFromTemplate(firstName, lastName) {
    let hello = "Hello, ";
    return (hello + (firstName+" " + lastName) + '!');
}
function extractNameFromTemplate(value) {
    let hello = "Hello, ";
    if (value.indexOf(hello) != -1) {
        return (value.substring(hello.length, value.length-1)) ;
    }
    throw new Error('Not implemented');
}
function getFirstChar(value) {
    return value[0];
}
function removeLeadingAndTrailingWhitespaces(value) {
    return value.trim();
    // var nullSpace = " ";
    // if(value[0] == nullSpace)
    // {
    //     return value.substring(1, value.length);
    // }
}

//  * Returns a string that repeated the specified number of times.
//  *
//  * @param {string} value
//  * @param {string} count
//  * @return {string}
//  *
//  * @example
//  *   'A', 5  => 'AAAAA'
//  *   'cat', 3 => 'catcatcat'
//  */
function repeatString(value, count) {
    let result = "";
    for (let i = 0; i < count; i++) {
        result += value;
    }
    return result;
}
function removeFirstOccurrences(str, value) {
    let position = str.indexOf(value);
    let substringDoesntExistIndicator = -1;
    if (position == substringDoesntExistIndicator) {
        throw new Error('Not implemented');
    }
    return str.replace(value, "");
}
function unbracketTag(str) {
    var length = str.length;
    return str.substring(1, length - 1);
}
function convertToUpperCase(str) {
    return str.toUpperCase();
}
function extractEmails(str) {
    let separator = ";";
    return str.split(separator);
}
function getRectangleString(width, height) {
    let upperString = '┌' + '─'.repeat(width - 2) + '┐\n';
    let middleString = '│' + ' '.repeat(width - 2) + '│\n';
    let lowerString = '└' + '─'.repeat(width - 2) + '┘\n';
    return (upperString + middleString.repeat(height - 2) + lowerString);
}
function encodeToRot13(str) {
    let asciiCodeOfLetterA = 65;
    let asciiCodeOfLetterN = 78;
    let tableShift = asciiCodeOfLetterN - asciiCodeOfLetterA;
    let result = "";
    let mediator = str.split("");
    for (let i = 0; i < mediator.length; i++) {
        let compareAbleAsciiCode = mediator[i].toUpperCase().charCodeAt(0);
        let asciiCodeOfSelectedLetter = mediator[i].charCodeAt(0);
        let addingLetter = mediator[i];
        let codeOfAddingLetter;
        if (mediator[i] == "?"){
            var u = "foo";
        }
        if(asciiCodeOfSelectedLetter >= 65 & compareAbleAsciiCode <=122)
        {
            if (compareAbleAsciiCode >= asciiCodeOfLetterN)
            {
                codeOfAddingLetter = asciiCodeOfSelectedLetter - tableShift;
                addingLetter = String.fromCharCode(codeOfAddingLetter);
            }
        else
            {
            codeOfAddingLetter = asciiCodeOfSelectedLetter + tableShift;
            addingLetter = String.fromCharCode(codeOfAddingLetter);
            }
        }
        result += addingLetter;
    }
    return result;
}

function isString(value) {
    return typeof value === 'string' || value instanceof String;
}
/**
 * Returns playid card id.
 *
 * Playing cards inittial deck inclides the cards in the following order:
 *
 *  'A♣','2♣','3♣','4♣','5♣','6♣','7♣','8♣','9♣','10♣','J♣','Q♣','K♣',
 *  'A♦','2♦','3♦','4♦','5♦','6♦','7♦','8♦','9♦','10♦','J♦','Q♦','K♦',
 *  'A♥','2♥','3♥','4♥','5♥','6♥','7♥','8♥','9♥','10♥','J♥','Q♥','K♥',
 *  'A♠','2♠','3♠','4♠','5♠','6♠','7♠','8♠','9♠','10♠','J♠','Q♠','K♠'
 *
 * (see https://en.wikipedia.org/wiki/Standard_52-card_deck)
 * Function returns the zero-based index of specified card in the initial deck above.
 *
 * @param {string} value
 * @return {number}
 *
 * @example
 *   'A♣' => 0
 *   '2♣' => 1
 *   '3♣' => 2
 *     ...
 *   'Q♠' => 50
 *   'K♠' => 51
 */
function getCardId(value) {
    // let colour;
    // (function (colour) {
    //     colour[colour["\u2663"] = 1] = "\u2663";
    //     colour[colour["\u2666"] = 2] = "\u2666";
    //     colour[colour["\u2665"] = 3] = "\u2665";
    //     colour[colour["\u2660"] = 4] = "\u2660";
    // })(colour || (colour = {}));
    // let rank;
    // (function (rank) {
    //     rank[rank["A\u2663"] = 1] = "A\u2663";
    //     rank[rank["2\u2663"] = 2] = "2\u2663";
    //     rank[rank["3\u2663"] = 3] = "3\u2663";
    //     rank[rank["4\u2663"] = 4] = "4\u2663";
    //     rank[rank["5\u2663"] = 5] = "5\u2663";
    //     rank[rank["6\u2663"] = 6] = "6\u2663";
    //     rank[rank["7\u2663"] = 7] = "7\u2663";
    //     rank[rank["8\u2663"] = 8] = "8\u2663";
    //     rank[rank["9\u2663"] = 9] = "9\u2663";
    //     rank[rank["10\u2663"] = 10] = "10\u2663";
    //     rank[rank["J\u2663"] = 11] = "J\u2663";
    //     rank[rank["Q\u2663"] = 12] = "Q\u2663";
    //     rank[rank["K\u2663"] = 13] = "K\u2663";
    // })(rank || (rank = {}));
    let colours = ["♣", "♦", "♥", "♠"];
    let ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let separatedInputString = value.split("");
    let rankValue = 0;
    let colourValue = 0;
    var numberPartValue = value.substring(0, value.length-1);
    var colourPartValue = value.charAt(value.length-1);
    rankValue = ranks.indexOf(numberPartValue) ;
    colourValue = colours.indexOf(colourPartValue) ;
    var result = rankValue + (colourValue*ranks.length);
    return result;
}





// /********************************************************************************************
//  *                                                                                          *
//  * Plese read the following tutorial before implementing tasks:                             *
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String  *
//  *                                                                                          *
//  ********************************************************************************************/
//
//
//
// /**
//  * Returns the result of concatenation of two strings.
//  *
//  * @param {string} value1
//  * @param {string} value2
//  * @return {string}
//  *
//  * @example
//  *   'aa', 'bb' => 'aabb'
//  *   'aa',''    => 'aa'
//  *   '',  'bb'  => 'bb'
//  */
// function concatenateStrings(value1, value2) {
//     throw new Error('Not implemented');
// }
//
//
// /**
//  * Returns the length of given string.
//  *
//  * @param {string} value
//  * @return {number}
//  *
//  * @example
//  *   'aaaaa' => 5
//  *   'b'     => 1
//  *   ''      => 0
//  */
// function getStringLength(value) {
//     throw new Error('Not implemented');
// }
//
// /**
//  * Returns the result of string template and given parameters firstName and lastName.
//  * Please do not use concatenation, use template string :
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings
//  *
//  * @param {string} firstName
//  * @param {string} lastName
//  * @return {string}
//  *
//  * @example
//  *   'John','Doe'      => 'Hello, John Doe!'
//  *   'Chuck','Norris'  => 'Hello, Chuck Norris!'
//  */
// function getStringFromTemplate(firstName, lastName) {
//     throw new Error('Not implemented');
// }
//
// /**
//  * Extracts a name from template string 'Hello, First_Name Last_Name!'.
//  *
//  * @param {string} value
//  * @return {string}
//  *
//  * @example
//  *   'Hello, John Doe!' => 'John Doe'
//  *   'Hello, Chuck Norris!' => 'Chuck Norris'
//  */
// function extractNameFromTemplate(value) {
//     throw new Error('Not implemented');
// }
//
//
// /**
//  * Returns a first char of the given string.
//  *
//  * @param {string} value
//  * @return {string}
//  *
//  * @example
//  *   'John Doe'  => 'J'
//  *   'cat'       => 'c'
//  */
// function getFirstChar(value) {
//     throw new Error('Not implemented');
// }
//
// /**
//  * Removes a leading and trailing whitespace characters from string.
//  *
//  * @param {string} value
//  * @return {string}
//  *
//  * @example
//  *   '  Abracadabra'    => 'Abracadabra'
//  *   'cat'              => 'cat'
//  *   '\tHello, World! ' => 'Hello, World!'
//  */
// function removeLeadingAndTrailingWhitespaces(value) {
//     throw new Error('Not implemented');
// }
//
// /**
//  * Returns a string that repeated the specified number of times.
//  *
//  * @param {string} value
//  * @param {string} count
//  * @return {string}
//  *
//  * @example
//  *   'A', 5  => 'AAAAA'
//  *   'cat', 3 => 'catcatcat'
//  */
// function repeatString(value, count) {
//     throw new Error('Not implemented');
// }
//
// /**
//  * Remove the first occurrence of string inside another string
//  *
//  * @param {string} str
//  * @param {string} value
//  * @return {string}
//  *
//  * @example
//  *   'To be or not to be', 'not'  => 'To be or to be'
//  *   'I like legends', 'end' => 'I like legs',
//  *   'ABABAB','BA' => 'ABAB'
//  */
// function removeFirstOccurrences(str, value) {
//     throw new Error('Not implemented');
// }
//
// /**
//  * Remove the first and last angle brackets from tag string
//  *
//  * @param {string} str
//  * @return {string}
//  *
//  * @example
//  *   '<div>' => 'div'
//  *   '<span>' => 'span'
//  *   '<a>' => 'a'
//  */
// function unbracketTag(str) {
//     throw new Error('Not implemented');
// }
//
//
// /**
//  * Converts all characters of the specified string into the upper case
//  *
//  * @param {string} str
//  * @return {string}
//  *
//  * @example
//  *   'Thunderstruck' => 'THUNDERSTRUCK'
//  *  'abcdefghijklmnopqrstuvwxyz' => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
//  */
// function convertToUpperCase(str) {
//     throw new Error('Not implemented');
// }
//
// /**
//  * Extracts e-mails from single string with e-mails list delimeted by semicolons
//  *
//  * @param {string} str
//  * @return {array}
//  *
//  * @example
//  *   'angus.young@gmail.com;brian.johnson@hotmail.com;bon.scott@yahoo.com' => ['angus.young@gmail.com', 'brian.johnson@hotmail.com', 'bon.scott@yahoo.com']
//  *   'info@gmail.com' => ['info@gmail.com']
//  */
// function extractEmails(str) {
//     throw new Error('Not implemented');
// }
//
// /**
//  * Returns the string representation of rectangle with specified width and height
//  * using pseudograhic chars
//  *
//  * @param {number} width
//  * @param {number} height
//  * @return {string}
//  *
//  * @example
//  *
//  *            '┌────┐\n'+
//  *  (6,4) =>  '│    │\n'+
//  *            '│    │\n'+
//  *            '└────┘\n'
//  *
//  *  (2,2) =>  '┌┐\n'+
//  *            '└┘\n'
//  *
//  *             '┌──────────┐\n'+
//  *  (12,3) =>  '│          │\n'+
//  *             '└──────────┘\n'
//  *
//  */
// function getRectangleString(width, height) {
//     throw new Error('Not implemented');
// }
//
//
// /**
//  * Encode specified string with ROT13 cipher
//  * See details:  https://en.wikipedia.org/wiki/ROT13
//  *
//  * @param {string} str
//  * @return {string}
//  *
//  * @example
//  *
//  *   'hello' => 'uryyb'
//  *   'Why did the chicken cross the road?' => 'Jul qvq gur puvpxra pebff gur ebnq?'
//  *   'Gb trg gb gur bgure fvqr!' => 'To get to the other side!'
//  *   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' => 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'
//  *
//  */
// function encodeToRot13(str) {
//     throw new Error('Not implemented');
// }
//
// /**
//  * Returns true if the value is string; otherwise false.
//  * @param {string} value
//  * @return {boolean}
//  *
//  * @example
//  *   isString() => false
//  *   isString(null) => false
//  *   isString([]) => false
//  *   isString({}) => false
//  *   isString('test') => true
//  *   isString(new String('test')) => true
//  */
// function isString(value) {
//     throw new Error('Not implemented');
// }
//
//
// /**
//  * Returns playid card id.
//  *
//  * Playing cards inittial deck inclides the cards in the following order:
//  *
//  *  'A♣','2♣','3♣','4♣','5♣','6♣','7♣','8♣','9♣','10♣','J♣','Q♣','K♣',
//  *  'A♦','2♦','3♦','4♦','5♦','6♦','7♦','8♦','9♦','10♦','J♦','Q♦','K♦',
//  *  'A♥','2♥','3♥','4♥','5♥','6♥','7♥','8♥','9♥','10♥','J♥','Q♥','K♥',
//  *  'A♠','2♠','3♠','4♠','5♠','6♠','7♠','8♠','9♠','10♠','J♠','Q♠','K♠'
//  *
//  * (see https://en.wikipedia.org/wiki/Standard_52-card_deck)
//  * Function returns the zero-based index of specified card in the initial deck above.
//  *
//  * @param {string} value
//  * @return {number}
//  *
//  * @example
//  *   'A♣' => 0
//  *   '2♣' => 1
//  *   '3♣' => 2
//  *     ...
//  *   'Q♠' => 50
//  *   'K♠' => 51
//  */
// function getCardId(value) {
//     throw new Error('Not implemented');
// }


module.exports = {
    concatenateStrings: concatenateStrings,
    getStringLength: getStringLength,
    getStringFromTemplate: getStringFromTemplate,
    extractNameFromTemplate: extractNameFromTemplate,
    getFirstChar: getFirstChar,
    removeLeadingAndTrailingWhitespaces: removeLeadingAndTrailingWhitespaces,
    repeatString: repeatString,
    removeFirstOccurrences: removeFirstOccurrences,
    unbracketTag: unbracketTag,
    convertToUpperCase: convertToUpperCase,
    extractEmails: extractEmails,
    getRectangleString: getRectangleString,
    encodeToRot13: encodeToRot13,
    isString: isString,
    getCardId: getCardId
};
