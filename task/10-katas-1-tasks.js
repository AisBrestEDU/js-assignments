'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
  var sides = ['N', 'E', 'S', 'W'];  // use array of cardinal directions only!

  let result = [];
  let azimuth = 0;

  for (let i = 0; i < sides.length; i++) {
    for (let j = 0; j < 8; j++) {
      let compassPoint = {
        abbreviation: 'none',
        azimuth: azimuth
      }
      let firstSide = sides[i];
      let secondSide = sides[sides[i + 1] ? i + 1 : 0];
      if (i === 0 || i === 2) {
        switch (j) {
          case (0):
            compassPoint.abbreviation = firstSide;
            break
          case (1):
            compassPoint.abbreviation = `${firstSide}b${secondSide}`;
            break
          case (2):
            compassPoint.abbreviation = `${firstSide}${firstSide}${secondSide}`;
            break;
          case (3):
            compassPoint.abbreviation = `${firstSide}${secondSide}b${firstSide}`;
            break;
          case (4):
            compassPoint.abbreviation = `${firstSide}${secondSide}`;
            break;
          case (5):
            compassPoint.abbreviation = `${firstSide}${secondSide}b${secondSide}`;
            break;
          case (6):
            compassPoint.abbreviation = `${secondSide}${firstSide}${secondSide}`;
            break;
          case (7):
            compassPoint.abbreviation = `${secondSide}b${firstSide}`;
            break;
        }
      } else {
        switch (j) {
          case (0):
            compassPoint.abbreviation = firstSide;
            break
          case (1):
            compassPoint.abbreviation = `${firstSide}b${secondSide}`;
            break
          case (2):
            compassPoint.abbreviation = `${firstSide}${secondSide}${firstSide}`;
            break;
          case (3):
            compassPoint.abbreviation = `${secondSide}${firstSide}b${firstSide}`;
            break;
          case (4):
            compassPoint.abbreviation = `${secondSide}${firstSide}`;
            break;
          case (5):
            compassPoint.abbreviation = `${secondSide}${firstSide}b${secondSide}`;
            break;
          case (6):
            compassPoint.abbreviation = `${secondSide}${secondSide}${firstSide}`;
            break;
          case (7):
            compassPoint.abbreviation = `${secondSide}b${firstSide}`;
            break;
        }
      }
      result.push(compassPoint)
      azimuth += 11.25;
    }
  }

  return result;
}


/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
  let yielded = [];
  let results = [];

  while (true) {
    if (!str.match(/{[^{}}]*}/)) {
      if (!yielded.includes(str)) {
        yielded.push(str);
        yield str;
      }
      if (results.length) {
        str = results.shift();
        continue;
      } else {
        break;
      }
    }

    let match = str.match(/{[^{}}]*}/)[0];
    let ar = match.slice(1, -1).split(',')

    for (let i = 0; i < ar.length; i++) {
      results.push(str.replace(match, ar[i]));
    }

    str = results.shift();
  }
}


/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
  let result = Array.from({ length: n }, x => Array(n));
  let num = 0,
    rowCount = 0,
    colCount = 0;
  for (let i = 0; i < result.length * 2; i++) {
    if (colCount % 2 != 0 && rowCount == 0) {
      while (colCount >= 0) {
        if (colCount == 0) {
          result[rowCount][colCount] = num;
          num++;
          break
        }
        result[rowCount++][colCount--] = num;
        num++;
      }
      rowCount == result.length - 1 ? colCount++ : rowCount++;
    } else if (rowCount % 2 == 0 && colCount == 0) {
      while (rowCount >= 0) {
        if (rowCount == 0) {
          result[rowCount][colCount] = num;
          num++;
          break
        }
        result[rowCount--][colCount++] = num;
        num++;
      }
      colCount == result.length - 1 ? rowCount++ : colCount++;
    } else if (colCount == result.length - 1) {
      while (rowCount < result.length) {
        if (rowCount == result.length - 1) {
          result[rowCount][colCount] = num;
          num++;
          break
        }
        result[rowCount++][colCount--] = num;
        num++;
      }
      colCount++;
    } else if (rowCount == result.length - 1) {
      while (colCount < result.length) {
        if (colCount == result.length - 1) {
          result[rowCount][colCount] = num;
          num++;
          break
        }
        result[rowCount--][colCount++] = num;
        num++;
      }
      rowCount++;
    }
  }
  return result;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
  if (dominoes.length == 1) return true;

  let cur = dominoes.shift(),
    side1 = cur[0],
    side2 = cur[cur.length - 1];

  for (let i = 0; i < dominoes.length; i++) {
    let nextDominoes = dominoes.slice();

    if (dominoes[i][0] == side2) {
      nextDominoes.splice(i, 1);
      nextDominoes.unshift(cur.concat(dominoes[i]));
      if (canDominoesMakeRow(nextDominoes)) return true;
    } else if (dominoes[i][1] == side2) {
      nextDominoes.splice(i, 1);
      nextDominoes.unshift(cur.concat(dominoes[i].reverse()));
      if (canDominoesMakeRow(nextDominoes)) return true;

    } else if (dominoes[i][0] == side1) {
      nextDominoes.splice(i, 1);
      nextDominoes.unshift(dominoes[i].reverse().concat(cur));

      if (canDominoesMakeRow(nextDominoes)) return true;
    } else if (dominoes[i][1] == side2) {
      nextDominoes.splice(i, 1);
      nextDominoes.unshift(dominoes[i].concat(cur));

      if (canDominoesMakeRow(nextDominoes)) return true;
    }
  }
  return false;
}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
  let result = '';
  nums.push('extra');
  nums.reduce((acc, cur) => {
    if (acc + 1 === cur) return `${acc}-${cur}`;
    if (typeof acc == 'string' && acc.match(/-/)) {
      let range = acc.split('-').map(x => Number(x));
      if (range[1] + 1 === cur) return `${range[0]}-${cur}`;
      if (range[0] + 1 === range[1]) acc = `${range[0]},${range[1]}`;
    }
    result += cur == 'extra' ? `${acc}` : `${acc},`;
    return cur;
  })
  return result;
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
