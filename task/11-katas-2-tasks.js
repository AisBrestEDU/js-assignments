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
    function getDigitString(strArr, position) {
        let strDigit = '';
        for (let i = 0; i < strArr.length; i++) {
            strDigit += strArr[i].slice(position, position + 3);
        }
        return strDigit;
    }

    let alphabetStr =    [' _     _  _     _  _  _  _  _ ',
                          '| |  | _| _||_||_ |_   ||_||_|',    
                          '|_|  ||_  _|  | _||_|  ||_| _|'];
    //Building the Map(key: string, value: integer)
    //Every digit is 3 char wide
    let alphbetMap = new Map();
    for (let i = 0; i < 10; i++) {
        alphbetMap.set(getDigitString(alphabetStr, i * 3), i);
    }

    let bankAccountArr = bankAccount.split('\n');
    bankAccountArr.pop();
    let result = '';

    for (let i = 0; i < bankAccountArr[0].length; i += 3) {
        result += alphbetMap.get(getDigitString(bankAccountArr, i));
    }

    return Number.parseInt(result);

    

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
    //let reg = `[ ].{0,${columns}}(?= )/g`;
    let reg = /\s(.{0,26})(?= )/g;
    let textWithSpaces = ` ${text} `;
    let some = textWithSpaces.match(reg);
    return some;
    
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
    function isFlush(arr) {
        let m = arr[0].slice(-1);
        let flush = arr.every( current => current.slice(-1) === m )
        return (flush ? PokerRank.Flush : PokerRank.HighCard);
    }
    function isStraight(arr)
    {

        //Building Map
        let valueMap = new Map();
        for (let i = 2; i <= 10; i++) {
            valueMap.set(i.toString(), i);
        }
        valueMap.set('J', 11);
        valueMap.set('Q', 12);
        valueMap.set('K', 13);
        valueMap.set('A', 14);

        //Sorting
        let cardsValue = arr.map(current => current.slice(0,-1));
        cardsValue = cardsValue.sort((a, b) => {
             return valueMap.get(a) - valueMap.get(b);
        });

        if(cardsValue.join('') === '2345A')
            return PokerRank.Straight;

        //Checking sequence
        for (let i = 1; i < cardsValue.length; i++) {
            let previous = valueMap.get(cardsValue[i - 1]);
            let current = valueMap.get(cardsValue[i]);
            if (previous + 1 !== current) return PokerRank.HighCard;
        }
        return PokerRank.Straight;
    }

    function getRankBasedOnSameCards(arr)
    {
        let result = 1;
        let cardsValue = arr.map(current => current.slice(0,-1));
        let matchArr = new Array(5).fill(0);
        for (let i = 0; i < cardsValue.length; i++) {
            for (let j = 0; j < cardsValue.length; j++) {
                if (cardsValue[i] === cardsValue[j])
                    matchArr[i] +=1;
            }
        }
        if (matchArr.includes(4))                           return PokerRank.FourOfKind;
        if (matchArr.includes(3) && matchArr.includes(2))   return PokerRank.FullHouse;
        if (matchArr.includes(3))                           return PokerRank.ThreeOfKind;

        let countOfPairs = matchArr.filter(element => element === 2).length;
        if (countOfPairs === 4)       return PokerRank.TwoPairs;
        if (countOfPairs === 2)       return PokerRank.OnePair;
        return PokerRank.HighCard;
    }

    let flush = isFlush(hand);
    let straight = isStraight(hand);
    if (flush && straight) return PokerRank.StraightFlush;
    let sameCard = getRankBasedOnSameCards(hand);

    return Math.max(flush, straight, sameCard);
    
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
   throw new Error('Not implemented');
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
