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
  let result = '';
  let numbers = {
    top: [[' _ '], ['   '], [' _ '], [' _ '], ['   '], [' _ '], [' _ '], [' _ '], [' _ '], [' _ ']],
    middle: [['| |'], ['  |'], [' _|'], [' _|'], ['|_|'], ['|_ '], ['|_ '], ['  |'], ['|_|'], ['|_|']],
    bottom: [['|_|'], ['  |'], ['|_ '], [' _|'], ['  |'], [' _|'], ['|_|'], ['  |'], ['|_|'], [' _|']]
  }
  for (let i = 0; i < 27; i += 3) {
    let top = bankAccount.slice(i, i + 3);
    let middle = bankAccount.slice(i + 28, i + 31);
    let bottom = bankAccount.slice(i + 56, i + 59);
    for (let j = 0; j < 10; j++) {
      if (top == numbers.top[j] && middle == numbers.middle[j] && bottom == numbers.bottom[j]) result += j;
    }
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
  while (text) {
    let line = text.slice(0, columns);
    text = text.slice(columns);
    while (text && line[line.length - 1] !== ' ' && text[0] !== ' ') {
      text = line[line.length - 1].concat(text);
      line = line.slice(0, line.length - 1);
    }
    yield line.trim();
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
 *   [ ' 4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
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
  let sequence = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let storage = {};

  let handRanks = hand.map(x => x.slice(0, x.length - 1)).sort((a, b) => {
    if (a == b) return 0;
    if (a == 'A' && b < 8) return -1;
    if (b == 'A' && a < 8) return 1;
    if (a == 'A') return 1;
    if (b == 'A') return -1;
    if (a == 'K') return 1;
    if (b == 'K') return -1;
    if (a == 'Q') return 1;
    if (b == 'Q') return -1;
    if (a == 'J') return 1;
    if (b == 'J') return -1;
    if (Number(a) > Number(b)) return 1;
    return -1;
  })
  let handSuits = hand.map(x => x.slice(x.length - 1));


  let ind = sequence.indexOf(handRanks[0]);
  let straight = sequence.slice(ind, ind + 5);
  if (handRanks.every((el, i) => el === straight[i])) {
    if (handSuits.every(x => x === handSuits[0])) return PokerRank.StraightFlush;
    return PokerRank.Straight;
  }
  if (handSuits.every(x => x === handSuits[0])) return PokerRank.Flush;


  for (let i of handRanks) {
    if (!storage[i[0]]) storage[i[0]] = 1;
    else storage[i[0]]++;
  }
  let numOfOccurences = Object.values(storage);
  if (numOfOccurences.includes(4)) return PokerRank.FourOfKind;
  else if (numOfOccurences.includes(3) && numOfOccurences.includes(2)) return PokerRank.FullHouse;
  else if (numOfOccurences.includes(2) && numOfOccurences.length == 3) return PokerRank.TwoPairs;
  else if (numOfOccurences.includes(3)) return PokerRank.ThreeOfKind;
  else if (numOfOccurences.includes(2)) return PokerRank.OnePair;
  else return PokerRank.HighCard;
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
  let matrix = [[]],
    angles = {},
    currentSide = 0,
    res = '',
    height = 0;

  for (let i of figure) {
    if (i === '\n') matrix.push([]);
    else matrix[matrix.length - 1].push(i);
  }

  let i = 0;
  while (matrix.some(x => x.includes('+'))) {
    let el = matrix[height][i];
    if (currentSide === 0) {
      if (el === '+') {
        angles.topLeft = [height, i];
        res += el;
        matrix[height].splice(i, 1, '-');
        currentSide++;
      } else if (i === matrix[height].length - 1) {
        height++;
        i = 0;
        continue;
      }

    } else if (currentSide === 1) {
      if (el === '+') {
        angles.topRight = [height, i];
        res += el + '\n';
        if (matrix[height].slice(i + 1, matrix[height].length).every(x => x !== '+')) {
          matrix[height].splice(i, 1, '-')
        };
        height++;
        currentSide++;
        i = angles.topLeft[1];
        continue;
      }
      res += el;

    } else if (currentSide === 2) {
      if (i === angles.topRight[1]) {
        res += el + '\n';
        height++;
        i = angles.topLeft[1];
        continue;
      }
      if (el === '+' && i === angles.topLeft[1]) {
        if (matrix[height][i + 1] !== '-' && matrix[height][i + 1] !== '+') {
          res += '|';
          i++;
          continue;
        }

        if ((matrix[height].slice(0, i).every(x => x !== '+') || matrix.slice(0, height).map(z => z.slice(0, i)).every(x => x.every(y => y !== '+'))) && (height + 1 === undefined || (matrix[height + 1][i] !== '|' && matrix[height + 1][i] !== '+'))) matrix[height].splice(i, 1, '-');
        currentSide++;
      }
      res += el;
    } else if (currentSide === 3) {
      if (el === '+') {
        if (i !== angles.topRight[1]) {
          res += '-';
          i++;
          continue;
        }
        if ((matrix[height].slice(i + 1, matrix[height].length).every(x => x !== '+') || matrix.slice(0, height).map(z => z.slice(i + 1, z.length)).every(x => x.every(y => y !== '+'))) && (height + 1 === undefined || (matrix[height + 1][i] !== '|' && matrix[height + 1][i] !== '+'))) matrix[height].splice(i, 1, '-');
        currentSide++;
      }
      res += el;
    }
    if (currentSide === 4) {
      res += '\n';
      yield res;
      currentSide = 0;
      res = '';
      height = 0;
      i = 0;
      continue;
    }
    i++;
  }
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
