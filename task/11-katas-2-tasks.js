'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    let numberStrings = bankAccount.split('\n');
    let numbersArray = [];
    for (let i = 0; i < numberStrings[0].length; i += 3) {
        numbersArray.push(numberStrings[0].substring(i, i + 3) + '\n' + numberStrings[1].substring(i, i + 3) + '\n' + numberStrings[2].substring(i, i + 3));
    }
    let resultNumber = '';
    for (let number of numbersArray) {
        switch (number) {
            case ' _ \n| |\n|_|':
                resultNumber += '0';
                break;
            case '   \n  |\n  |':
                resultNumber += '1';
                break;
            case ' _ \n _|\n|_ ':
                resultNumber += '2';
                break;
            case ' _ \n _|\n _|':
                resultNumber += '3';
                break;
            case '   \n|_|\n  |':
                resultNumber += '4';
                break;
            case ' _ \n|_ \n _|':
                resultNumber += '5';
                break;
            case ' _ \n|_ \n|_|':
                resultNumber += '6';
                break;
            case ' _ \n  |\n  |':
                resultNumber += '7';
                break;
            case ' _ \n|_|\n|_|':
                resultNumber += '8';
                break;
            case ' _ \n|_|\n _|':
                resultNumber += '9';
                break;
        }
    }
    return Number.parseInt(resultNumber);
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    for (let i = 0; i < text.length; i += columns) {
        if (text[i + columns] === ' ') {
            yield text.substring(i, i + columns);
            i++;
        }
        else if (i + columns > text.length) {
            yield text.substring(i);
        }
        else {
            let subStr = text.substring(i, text.substring(i, i + columns).lastIndexOf(' ') + i);
            yield subStr;
            i -= columns - subStr.length - 1;
        }
    }
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let handRanks = hand.map(v => v.slice(0, -1)).sort((a, b) => ranks.indexOf(a) - ranks.indexOf(b));
    let handSuits = hand.map(v => v.slice(-1));
    if ((ranks.indexOf(handRanks[0]) + 1 === ranks.indexOf(handRanks[1]) &&
        ranks.indexOf(handRanks[1]) + 1 === ranks.indexOf(handRanks[2]) &&
        ranks.indexOf(handRanks[2]) + 1 === ranks.indexOf(handRanks[3]) &&
        ranks.indexOf(handRanks[3]) + 1 === ranks.indexOf(handRanks[4]) ||
        ranks.indexOf(handRanks[0]) === 0 &&
        ranks.indexOf(handRanks[1]) === 1 &&
        ranks.indexOf(handRanks[2]) === 2 &&
        ranks.indexOf(handRanks[3]) === 3 &&
        ranks.indexOf(handRanks[4]) === 12) &&
        handSuits.every(v => v === handSuits[0])) {
        return PokerRank.StraightFlush;
    }
    if (handRanks.slice(0, 4).every(v => v === handRanks[0]) || handRanks.slice(1).every(v => v === handRanks[1])) {
        return PokerRank.FourOfKind;
    }
    if (handRanks.slice(0, 2).every(v => v === handRanks[0]) && handRanks.slice(2).every(v => v === handRanks[2]) ||
        handRanks.slice(0, 3).every(v => v === handRanks[0]) && handRanks.slice(3).every(v => v === handRanks[3])) {
        return PokerRank.FullHouse;
    }
    if (handSuits.every(v => v === handSuits[0])) {
        return PokerRank.Flush;
    }
    if ((ranks.indexOf(handRanks[0]) + 1 === ranks.indexOf(handRanks[1]) &&
        ranks.indexOf(handRanks[1]) + 1 === ranks.indexOf(handRanks[2]) &&
        ranks.indexOf(handRanks[2]) + 1 === ranks.indexOf(handRanks[3]) &&
        ranks.indexOf(handRanks[3]) + 1 === ranks.indexOf(handRanks[4]) ||
        ranks.indexOf(handRanks[0]) === 0 &&
        ranks.indexOf(handRanks[1]) === 1 &&
        ranks.indexOf(handRanks[2]) === 2 &&
        ranks.indexOf(handRanks[3]) === 3 &&
        ranks.indexOf(handRanks[4]) === 12)) {
        return PokerRank.Straight;
    }
    if (handRanks.slice(0, 3).every(v => v === handRanks[0]) ||
        handRanks.slice(1, 4).every(v => v === handRanks[1]) ||
        handRanks.slice(2).every(v => v === handRanks[2])) {
        return PokerRank.ThreeOfKind;
    }
    if (handRanks.slice(0, 2).every(v => v === handRanks[0]) && handRanks.slice(2, 4).every(v => v === handRanks[2]) ||
        handRanks.slice(0, 2).every(v => v === handRanks[0]) && handRanks.slice(3).every(v => v === handRanks[3]) ||
        handRanks.slice(1, 3).every(v => v === handRanks[1]) && handRanks.slice(3).every(v => v === handRanks[3])) {
        return PokerRank.TwoPairs;
    }
    if (handRanks.slice(0, 2).every(v => v === handRanks[0]) ||
        handRanks.slice(1, 3).every(v => v === handRanks[1]) ||
        handRanks.slice(2, 4).every(v => v === handRanks[2]) ||
        handRanks.slice(3).every(v => v === handRanks[3])) {
        return PokerRank.OnePair;
    }
    return PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
    let plusIndices = [];
    let lines = figure.split('\n');
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === '+' ) {
                plusIndices.push([i, j]);
            }
        }
    }

    let rectanglesCorners = [];
    for (let indices of plusIndices) {
        let topLeft = lines[indices[0] + 1][indices[1]] === '|' || lines[indices[0] + 1][indices[1]] === '+'? indices : undefined;
        let bottomLeft = topLeft ? plusIndices.find(v => v[1] === topLeft[1] && v[0] > topLeft[0]) : undefined;
        let bottomRight = bottomLeft ? plusIndices.find(v => v[0] === bottomLeft[0] && v[1] > bottomLeft[1]) : undefined;
        let topRight = topLeft && bottomRight ? plusIndices.find(v => v[0] === topLeft[0] && v[1] === bottomRight[1] && (lines[v[0] + 1][v[1]] === '|' || lines[v[0] + 1][v[1]] === '+')) : undefined;
        if (topLeft && topRight && bottomLeft && bottomRight) {
            rectanglesCorners.push([topLeft, bottomRight]);
        }

        topRight = topLeft ? plusIndices.find(v => v[0] === topLeft[0] && v[1] > topLeft[1] && (lines[v[0] + 1][v[1]] === '|' || lines[v[0] + 1][v[1]] === '+')) : undefined;
        bottomRight = topRight ? plusIndices.find(v => v[1] === topRight[1] && v[0] > topRight[0]) : undefined;
        bottomLeft = bottomRight ? plusIndices.find(v => v[0] === bottomRight[0] && v[1] === topLeft[1]) : undefined;
        if (topRight && bottomLeft && bottomRight && !rectanglesCorners.find(v => v[0] === topLeft && v[1] === bottomRight)) {
            rectanglesCorners.push([topLeft, bottomRight]);
        }
    }

    for (let corner of rectanglesCorners) {
        let rectangle = '';
        let rectangleHeight = corner[1][0] - corner[0][0] + 1;
        let rectangleWidth = corner[1][1] - corner[0][1] + 1;
        for (let i = 0; i < rectangleHeight; i++) {
            for (let j = 0; j < rectangleWidth; j++) {
                if (i === 0 && j === 0 || i === rectangleHeight - 1 && j === 0 || i === 0 && j === rectangleWidth - 1 || i === rectangleHeight - 1 && j === rectangleWidth - 1) {
                    rectangle += '+';
                }
                else if ((i === 0 || i === rectangleHeight - 1) && j !== 0 && j !== rectangleWidth - 1) {
                    rectangle += '-';
                }
                else if ((j === 0 || j === rectangleWidth - 1) && i !== 0 && i !== rectangleHeight - 1) {
                    rectangle += '|';
                }
                else {
                    rectangle += ' ';
                }
            }
            rectangle += '\n';
        }
        yield rectangle;
    }
}


module.exports = {
    parseBankAccount: parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
