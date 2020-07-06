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
    let colours = ["♣", "♦", "♥", "♠"];
    let ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let rankValue = 0;
    let colourValue = 0;
    var numberPartValue = value.substring(0, value.length-1);
    var colourPartValue = value.charAt(value.length-1);
    rankValue = ranks.indexOf(numberPartValue) ;
    colourValue = colours.indexOf(colourPartValue) ;
    var result = rankValue + (colourValue*ranks.length);
    return result;
}

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
