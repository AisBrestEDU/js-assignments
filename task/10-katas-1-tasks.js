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
    function Compass(abbr, azimuth) {
        this.abbreviation = abbr;
        this.azimuth = azimuth;
    }
    let arr = new Array(32),
        sides = ['N', 'E', 'S', 'W'];
    sides.forEach((element, n) => arr[n * 8] = element)

    function generate(abbr_1, abbr_2, start, finish) {
        let medium = (finish + start) / 2;
        if (!Number.isInteger(medium))
            return;
        let med_abbr = abbr_1 + abbr_2;
        if (med_abbr.length > 3) {
            let main_id = (finish - start > 0 ? Math.ceil : Math.trunc)(medium / 8) % 4;
            med_abbr = abbr_1 + 'b' + sides[main_id];
        }
        if (!arr[medium]) {
            arr[medium] = med_abbr;
        }
        generate(abbr_1, arr[medium], start, medium)
        generate(abbr_2, arr[medium], finish, medium)
    }
    generate('N', 'N', 0, 32);
    return arr.map((abbr, n) => new Compass(abbr, 11.25 * n));
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
    function parse(str) {


        let open = str.lastIndexOf('{'),
            close = str.slice(open, str.length).indexOf('}') + open;



        if (open == -1 || close == -1) {
            return str;
        } else {
            let pre = str.slice(0, open);
            let post = str.slice(close + 1, str.length);
            let inside = str.slice(open + 1, close);
            let list = inside.split(',');
            return list
                .map(str => `${pre}${str}${post};`)
                .join('');
        }
    }


    let arr = parse(str).split(';');

    if (arr.length !== 1) {
        arr.pop();
    }

    let s = arr.flatMap(str => parse(str).split(';')).filter(i => i !== '').filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
    });
    let f = s.flatMap(str => parse(str).split(';')).filter(i => i !== '').filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
    }).sort()
    for (let i = 0; i < f.length; i++) {
        yield f[i];
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
    let mtx = [];
    for (let i = 0; i < n; i++) {
        mtx[i] = [];
    }

    let i = 1,
        j = 1;
    for (let e = 0; e < n * n; e++) {
        mtx[i - 1][j - 1] = e;
        if ((i + j) % 2 == 0) {

            if (j < n) j++;
            else i += 2;
            if (i > 1) i--;
        } else {
            if (i < n) i++;
            else j += 2;
            if (j > 1) j--;
        }
    }
    return mtx;
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

    let res = dominoes.reduce(function intersect(a, b) {
        return a.filter((function (n) {
            return b.indexOf(n) == -1;
        })).concat(b.filter((function (n) {
            return a.indexOf(n) == -1;
        })));
    })
    if (res.length == 1 || res.length == 2) {
        return true;
    } else if (res.length == 3 || res.length == 4) {
        return false;
    } else if (res.length == 0) {
        let res2 = dominoes.reduce(function conc(a, b) {
            for (let i = 0; i < a.length; i++) {

                for (let j = 0; j < b.length; j++) {

                    if (a[i] == b[j]) {
                        let k = a[i];
                        a.splice(a.indexOf(k), 1);
                        b.splice(b.indexOf(k), 1);


                    }
                }
            }
            return a.concat(b)
        })
        return res2.length == 2;
    }


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
    let res = [];
    let j = 0;
    for (let i = 0; i < nums.length; i = j + 1) {

        res.push(nums[i]);

        for (j = i + 1; j < nums.length && nums[j] == nums[j - 1] + 1; j++);
        j--;

        if (i == j) {
            res.push(",");
        } else if (i + 1 == j) {
            res.push(",", nums[j], ",");
        } else {
            res.push("-", nums[j], ",");
        }
    }
    res.pop();
    return res.join("");
}

module.exports = {
    createCompassPoints: createCompassPoints,
    expandBraces: expandBraces,
    getZigZagMatrix: getZigZagMatrix,
    canDominoesMakeRow: canDominoesMakeRow,
    extractRanges: extractRanges
};