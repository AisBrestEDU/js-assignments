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
    let tpls = [
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
    ];
    let cntS = 0;
    let cntE = 3;
    let res = "";    
    let b = bankAccount.split("\n");   
    for (let i = 0; i < 9; i++) {
        res += tpls.indexOf(b[0].slice(cntS, cntE) + b[1].slice(cntS, cntE) + b[2].slice(cntS, cntE));   
        cntS += 3;
        cntE += 3;        
    };
    return +res;
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
    let arr = text.split(" ");
    let acc = arr[0];
    for (let i = 1, l = arr.length; i < l; i++) {
        if ((acc.length + arr[i].length + 1) > columns) {
            yield acc;
            acc = arr[i];
        } else {
            acc = acc + " " + arr[i];
        }
    };
    yield acc;
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
    let vals = {"2" : 2, "3" : 3, "4" : 4, "5" : 5, "6" : 6, "7" : 7, "8" : 8, "9" : 9, "10" : 10, "J" : 11, "Q" : 12, "K" : 13}

    let highCardValue;

    let adtCnt = {
        "2" : 0,
        "3" : 0
    };

    hand.forEach(function(val) {
        if (val.slice(0, -1) == "2") {
            adtCnt["2"]++;
        };  
        if (val.slice(0, -1) == "3") {
            adtCnt["3"]++;
        }; 
    });

    if (adtCnt["2"] == 1 && adtCnt["3"] == 1) {
        vals["A"] = 1;
        highCardValue = "K";
    } else {
        vals["A"] = 14;    
        highCardValue = "A";        
    }

    hand.sort(function (a, b) {  
        return vals[a.slice(0, -1)] - vals[b.slice(0, -1)];
    });

    let flash = [hand[0]];
    let flashCompare = hand[0].slice(-1);
    let street = [hand[0]];     
    let pairs = [[hand[0]], []]; 
    let firstPairEnd = false;
    let highCardTrigger = false;

    let valCur = 0;
    let mCur = "";

    for (let i = 1, l = hand.length; i < l; i++) {
        valCur = hand[i].slice(0, -1);
        mCur = hand[i].slice(-1);
        if (valCur == highCardValue) {
            highCardTrigger = true;
        }        
        if (flash.length == i) {
            if (mCur == flashCompare) {
                flash.push(hand[i]);
            };
        };
        if (street.length == i) {
            if (vals[valCur] == vals[street[i - 1].slice(0, -1)] + 1) {
                street.push(hand[i]);
            };
        };
        if (valCur == pairs[0][0].slice(0, -1) && !firstPairEnd) {
            pairs[0].push(hand[i]);
        } else if (hand[i + 1] && (valCur == hand[i + 1].slice(0, -1) && pairs[0].length > 1)) { 
            if (!firstPairEnd) {
                firstPairEnd = true;
                pairs[1].push(hand[i]);                        
            }  
            pairs[1].push(hand[i + 1]);           
        } else if (pairs[0].length == 1) {
            pairs[0][0] = hand[i];            
        }
    };   

    if ((street.length == hand.length) && (flash.length == hand.length)) {
        return PokerRank["StraightFlush"];
    };
    if (pairs[0].length == 4) {
        return PokerRank["FourOfKind"];        
    };
    if ((pairs[0].length == 3 && pairs[1].length == 2) || (pairs[0].length == 2 && pairs[1].length == 3)) {
        return PokerRank["FullHouse"];                
    };
    if (flash.length == hand.length) {
        return PokerRank["Flush"];  
    };
    if (street.length == hand.length) {
        return PokerRank["Straight"];          
    };
    if (pairs[0].length == 3) {
        return PokerRank["ThreeOfKind"];                  
    };
    if (pairs[0].length == 2 && pairs[1].length == 2) {
        return PokerRank["TwoPairs"];                          
    };
    if (pairs[0].length == 2 || pairs[1].length == 2) {
        return PokerRank["OnePair"];                                  
    };
    return PokerRank["HighCard"];
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
    let lines = figure.split("\n");
    let lineM = figure[0];    

    let rec = "";
    let line = "";
    let topLine = "";

    let lineComp = "";
    let nextTopLine = "";

    for (let i = 0, l = lines.length; i < l; i++) {
        line = lines[i];
        if (line.indexOf("-") != -1) {
            if (topLine !== "") {
                rec += topLine;       
                yield rec + "\n";
                rec = "";
                topLine = "";
                i = -1;
                l = lines.length;
            } else if (topLine === "") {
                if (lines[i + 1].indexOf("|") == -1) {
                    break;
                };
                topLine = line.match(/\+-+\+/)[0];
                line = line.replace(/\+-+\+/, "").trim();
                if (line === "") {
                    lines.splice(i, 1);
                    i = -1;
                    l = lines.length;
                    rec += topLine + "\n"; 
                    continue;
                };
                lines[i] = "+" + line;
                nextTopLine = lines[i].match(/\+-+\+/)[0];
                lineComp = lines[i + 1].trim(); 
                while(lineComp[topLine.length - 1] !== "|") {
                    topLine = topLine.slice(0, -1) + "-" + lines[i].match(/\+-+\+/)[0].slice(1); 
                    lines[i] = lines[i].slice(nextTopLine.length - 1);           
                }
                rec += topLine + "\n";                              
            }
        } else if (line.indexOf("|") != -1) {
            rec += line.match(/\| +\|/) + "\n";
            line = line.replace(/\| +\|/, "");
            if (line.indexOf("|") === -1) {
                lines.splice(i, 1);
                i = -1;
                l = lines.length;
            } else {
                lines[i] = "|" + line;
            };
        } else {           
            if (lineM == lineM.match(/\++/)) {
                if (line[i + 1] == undefined) {
                    if (lines[0].length == 1) {
                        rec += "+".repeat(lines.length - 1) + "\n";
                        yield rec;
                        break
                    };
                    yield rec;
                    i = -1;
                    l = lines.length;
                    rec = "";
                    continue;               
                };
                rec += "++\n";
                lines[i] = line.slice(1);
                continue;
            };                    
        }
    };
}

module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
