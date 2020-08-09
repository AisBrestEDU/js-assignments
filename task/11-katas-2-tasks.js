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
    let digits = [
        " _ | ||_|",
        "     |  |",
        " _  _||_ ",
        " _  _| _|",
        "   |_|  |",
        " _ |_  _|",
        " _ |_ |_|",
        " _   |  |",
        " _ |_||_|",
        " _ |_| _|"
    ],
    result = "",
    i = 0;

    while(i < bankAccount.length/3 - 1){
        let letter = "";
        for(let j = 0; j< 3; j++){
            for(let k = 0; k < 3; k++){
                letter += bankAccount[bankAccount.length/3 * j + i + k];    
            }
        }

        result += digits.indexOf(letter);
        i+=3;
    }
    return result;
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
    let words = text.split(" "),
    line = "";
    
    for(let i = 0; i< words.length; i++){
        if((line.length + words[i].length <= columns)){
            line += `${words[i]} `;
        }
        else{
            yield line.substr(0, line.length - 1);
            line = `${words[i]} `;
        }

        if(i === words.length - 1){
            yield line.substr(0, line.length - 1);
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
    function isOneSuit(current){
        return current[current.length - 1] === hand[0][hand[0].length - 1];
    }

    function pairsCount(accumulator, current){
        current === 2 ? accumulator++ : accumulator;
        return accumulator
    }
    
    function isInc(ranks, cardsRank){
        let isInc = true;
        for(let i = 0; i < ranks.length - 1; i++){
            if(cardsRank.indexOf(ranks[i]) + 1 != cardsRank.indexOf(ranks[i+1])){
                isInc = false;
                break;
            }
        }

        return isInc;
    }

    let cardsRank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    juniorStraight = ["2", "3", "4", "5", "A"],
    ranks = hand.map(current => current.slice(0, current.length - 1)).sort((a,b) => {
        if (cardsRank.indexOf(a) > cardsRank.indexOf(b)) {
            return 1;
          }
          if (cardsRank.indexOf(a) < cardsRank.indexOf(b)) {
            return -1;
          }
          return 0;
    }),
    repeats = [];

    if(hand.every(isOneSuit)){
        if(ranks.every(current => current === juniorStraight[ranks.indexOf(current)])){
            return PokerRank.StraightFlush;
        }

        if(isInc(ranks, cardsRank)){
            return PokerRank.StraightFlush;
        }
        else{
            return PokerRank.Flush;
        }
    }

    for(let i = 0; i < ranks.length; i++){
        if(!ranks.includes(ranks[i], i + 1)){
            repeats.push(ranks.reduce((accumulator, current) => {
                ranks[i] === current ? accumulator++ : accumulator;
                return accumulator;    
            }, 0));
        }
    }

    if(repeats.some(item => item === 4)){
        return PokerRank.FourOfKind;
    }

    if(repeats.some(item => item === 3) && repeats.some(item => item === 2)){
        return PokerRank.FullHouse;
    }

    if(repeats.some(item => item === 3)){
        return PokerRank.ThreeOfKind;
    }

    if(isInc(ranks, cardsRank) || ranks.every(current => current === juniorStraight[ranks.indexOf(current)])){
        return PokerRank.Straight;
    }

    let pairsAmmount = repeats.length != 0 ? repeats.reduce(pairsCount, 0) : 0;
    if(pairsAmmount >= 1){
        return pairsAmmount === 1 ? PokerRank.OnePair : PokerRank.TwoPairs; 
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
    let figureStrings = figure.split('\n'),
    rectangles = ["", ""],
    isWrite = true;

    for(let i = 0; i < figureStrings.length-1; i++){
        let face = figureStrings[i].trim();
        const separatorsAmount = face.split("").reduce((accumulator, current) => {
            if(current === "|"){
                accumulator++;
            }
            return accumulator;
        }, 0);


        isWrite = separatorsAmount === 0 ? !isWrite : isWrite;
        if(separatorsAmount === 0){
            if(!isWrite){
                continue;
            }
            else if(isWrite && rectangles[0] === ""){
                let smallRectangle = "++\n++\n";
                for(let j = 0; j < face.length - 1; j++){
                    yield smallRectangle;
                }
            }
            else{
                let horizontalFace = `+${"-".repeat(rectangles[0].substring(0, rectangles[0].substring(1, rectangles[0].length-1).indexOf("|")).length)}+`;
                let shape = `${horizontalFace}\n${rectangles[0]}${horizontalFace}\n`;
                yield shape;
                rectangles[0] = "";

                if(rectangles[1] !== ""){
                    horizontalFace = `+${"-".repeat(rectangles[1].substring(0, rectangles[1].substring(1, rectangles[1].length-1).indexOf("|")).length)}+`;
                    shape = `${horizontalFace}\n${rectangles[1]}${horizontalFace}\n`;
                    yield shape;
                    rectangles[1] = "";
                }
                isWrite = !isWrite;
            }
        }
        else if(separatorsAmount === 2){
            rectangles[0] += face + "\n";
        }
        else if(separatorsAmount === 3){
            rectangles[0] += face.substr(0, face.substring(1, face.length - 1).indexOf("|")+2) + "\n";
            rectangles[1] += face.substr(face.substring(1, face.length-1).indexOf("|")+1) + "\n";
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
