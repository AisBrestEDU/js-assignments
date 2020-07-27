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
    let map = new Map;
    map.set(
        " _ " +
        "| |" +
        "|_|", 0);
    map.set(
        "   " +
        "  |" +
        "  |", 1);
    map.set(
        " _ " +
        " _|" +
        "|_ ", 2);
    map.set(
        " _ " +
        " _|" +
        " _|", 3);
    map.set(
        "   " +
        "|_|" +
        "  |", 4);
    map.set(
        " _ " +
        "|_ " +
        " _|", 5);
    map.set(
        " _ " +
        "|_ " +
        "|_|", 6);
    map.set(
        " _ " +
        "  |" +
        "  |", 7);
    map.set(
        " _ " +
        "|_|" +
        "|_|", 8);
    map.set(
        " _ " +
        "|_|" +
        " _|", 9);

    let lines = bankAccount.split("\n");
    let i = 0, result = "";

    while (i < lines[0].length) {
        let s = lines[0].substr(i, 3) + lines[1].substr(i, 3) + lines[2].substr(i, 3);
        result += map.get(s);

        i += 3;
    }

    return Number(result);
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
    while (text.length) {
        let i = columns;

        if (text.length > i) {
            while (text[i] != " ")
                i--;
        }

        yield text.substr(0, i);
        text = text.substr(i + 1);
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
    function IndexOfCardByValue(value) {
        return 'A234567891JQK'.indexOf(value.slice(0, 1));
    }

    function indexOfSuit(value) {
        return '♣♦♥♠'.indexOf(value.slice(-1)) * 13;
    }

    function equalityComparison(num1, num2) {
        return cardIndex[num1] === cardIndex[num2];
    }

    function notEqualityСomparison(num1, num2) {
        return cardIndex[num1] !== cardIndex[num2];
    }

    function equalAndnotEqual(equalityComparison, notEqualityСomparison) {
        return equalityComparison && notEqualityСomparison;
    }

    function noName(value) {
        return value[4] - value[0] === 4 && value[1] !== 0 || value[4] - value[1] === 3 && value[0] === 0 && value[1] === 9;
    }

    var cardIndex = hand.map(element => {
        return IndexOfCardByValue(element);
    });
    var indexSuit = hand.map(element => {
        return indexOfSuit(element);
    });
    var IndexInDeck = hand.map(element => {
        return indexOfSuit(element) + IndexOfCardByValue(element);
    });

    cardIndex = cardIndex.sort((a, b) => {
        return a - b;
    });
    IndexInDeck = IndexInDeck.sort((a, b) => {
        return a - b;
    });
    indexSuit = indexSuit.sort((a, b) => {
        return a - b;
    });

    if (noName(IndexInDeck)) return PokerRank.StraightFlush;
    if (equalAndnotEqual(equalityComparison(0, 3), notEqualityСomparison(0, 4)) || equalAndnotEqual(equalityComparison(1, 4), notEqualityСomparison(0, 1))) return PokerRank.FourOfKind;
    if (equalAndnotEqual(equalityComparison(0, 2), notEqualityСomparison(0, 3)) && equalityComparison(3, 4) || equalAndnotEqual(equalityComparison(2, 4), notEqualityСomparison(1, 2))) return PokerRank.FullHouse;
    if (indexSuit[0] === indexSuit[4]) return PokerRank.Flush;
    if (noName(cardIndex)) return PokerRank.Straight;
    if (equalAndnotEqual(equalityComparison(0, 2), notEqualityСomparison(2, 3)) || equalAndnotEqual(equalityComparison(2, 4), notEqualityСomparison(1, 2)) || equalAndnotEqual(equalityComparison(1, 3), notEqualityСomparison(1, 0))) return PokerRank.ThreeOfKind;else {
        var obj = {};

        for (var i = 0; i < cardIndex.length; i++) {
            var str = cardIndex[i];
            obj[str] = true;
        }
        if (Object.keys(obj).length === 3) return PokerRank.TwoPairs;
        if (Object.keys(obj).length === 4) return PokerRank.OnePair;
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
    var countStr = 0;
    var countCol = 0;
    var x = 0;
    var y = 0;
    var points = [];
    var matrix = figure.split('\n');

    function topLeftCornerOfRectangles() {
        return matrix[j][i] === '+' && matrix[j + 1][i] !== ' ' && matrix[j][i + 1] !== undefined && matrix[j + 1][i] !== undefined && matrix[j][i + 1] !== ' ';
    }

    for (var j = 0; j < matrix.length; j++) {
        for (var i = 0; i < matrix[0].length; i++) {
            if (matrix[j][i] === '+' && matrix[j + 1][i] === ' ' && matrix[j][i + 1] === undefined || matrix[j][i] === '+' && matrix[j + 1][i] === undefined && matrix[j][i + 1] === ' ') {
                points.push(j);
                points.push(i);
            }
        }
    }

    for (var j = 0; j < matrix.length; j++) {
        for (var i = 0; i < matrix[0].length; i++) {
            if (topLeftCornerOfRectangles(j, i)) {
                x = i + 1;
                y = j + 1;
                countStr = 0;
                countCol = 0;
                if (j === points[0] && i === points[2] && matrix[points[3]][points[1]] === ' ') continue;
                while (matrix[j + 1][x] === ' ') {
                    x++;
                    countStr++;
                }
                while (matrix[y][i] !== '+') {
                    y++;
                    countCol++;
                }
                yield `+${ '-'.repeat(countStr) }+${ `\n|${ ' '.repeat(countStr) }|`.repeat(countCol) }\n+${ '-'.repeat(countStr) }+\n`;
            }
        }
    }
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
