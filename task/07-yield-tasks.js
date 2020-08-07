'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Returns the lines sequence of "99 Bottles of Beer" song:
 *
 *  '99 bottles of beer on the wall, 99 bottles of beer.'
 *  'Take one down and pass it around, 98 bottles of beer on the wall.'
 *  '98 bottles of beer on the wall, 98 bottles of beer.'
 *  'Take one down and pass it around, 97 bottles of beer on the wall.'
 *  ...
 *  '1 bottle of beer on the wall, 1 bottle of beer.'
 *  'Take one down and pass it around, no more bottles of beer on the wall.'
 *  'No more bottles of beer on the wall, no more bottles of beer.'
 *  'Go to the store and buy some more, 99 bottles of beer on the wall.'
 *
 * See the full text at
 * http://99-bottles-of-beer.net/lyrics.html
 *
 * NOTE: Please try to complete this task faster then original song finished:
 * https://www.youtube.com/watch?v=Z7bmyjxJuVY   :)
 *
 *
 * @return {Iterable.<string>}
 *
 */
function* get99BottlesOfBeer() {

    let song99botles = [
         '99 bottles of beer on the wall, 99 bottles of beer.',
        'Take one down and pass it around, 98 bottles of beer on the wall.',
        '98 bottles of beer on the wall, 98 bottles of beer.',
        'Take one down and pass it around, 97 bottles of beer on the wall.',
        '97 bottles of beer on the wall, 97 bottles of beer.',
        'Take one down and pass it around, 96 bottles of beer on the wall.',
        '96 bottles of beer on the wall, 96 bottles of beer.',
        'Take one down and pass it around, 95 bottles of beer on the wall.',
        '95 bottles of beer on the wall, 95 bottles of beer.',
        'Take one down and pass it around, 94 bottles of beer on the wall.',
        '94 bottles of beer on the wall, 94 bottles of beer.',
        'Take one down and pass it around, 93 bottles of beer on the wall.',
        '93 bottles of beer on the wall, 93 bottles of beer.',
        'Take one down and pass it around, 92 bottles of beer on the wall.',
        '92 bottles of beer on the wall, 92 bottles of beer.',
        'Take one down and pass it around, 91 bottles of beer on the wall.',
        '91 bottles of beer on the wall, 91 bottles of beer.',
        'Take one down and pass it around, 90 bottles of beer on the wall.',
        '90 bottles of beer on the wall, 90 bottles of beer.',
        'Take one down and pass it around, 89 bottles of beer on the wall.',
        '89 bottles of beer on the wall, 89 bottles of beer.',
        'Take one down and pass it around, 88 bottles of beer on the wall.',
        '88 bottles of beer on the wall, 88 bottles of beer.',
        'Take one down and pass it around, 87 bottles of beer on the wall.',
        '87 bottles of beer on the wall, 87 bottles of beer.',
        'Take one down and pass it around, 86 bottles of beer on the wall.',
        '86 bottles of beer on the wall, 86 bottles of beer.',
        'Take one down and pass it around, 85 bottles of beer on the wall.',
        '85 bottles of beer on the wall, 85 bottles of beer.',
        'Take one down and pass it around, 84 bottles of beer on the wall.',
        '84 bottles of beer on the wall, 84 bottles of beer.',
        'Take one down and pass it around, 83 bottles of beer on the wall.',
        '83 bottles of beer on the wall, 83 bottles of beer.',
        'Take one down and pass it around, 82 bottles of beer on the wall.',
        '82 bottles of beer on the wall, 82 bottles of beer.',
        'Take one down and pass it around, 81 bottles of beer on the wall.',
        '81 bottles of beer on the wall, 81 bottles of beer.',
        'Take one down and pass it around, 80 bottles of beer on the wall.',
        '80 bottles of beer on the wall, 80 bottles of beer.',
        'Take one down and pass it around, 79 bottles of beer on the wall.',
        '79 bottles of beer on the wall, 79 bottles of beer.',
        'Take one down and pass it around, 78 bottles of beer on the wall.',
        '78 bottles of beer on the wall, 78 bottles of beer.',
        'Take one down and pass it around, 77 bottles of beer on the wall.',
        '77 bottles of beer on the wall, 77 bottles of beer.',
        'Take one down and pass it around, 76 bottles of beer on the wall.',
        '76 bottles of beer on the wall, 76 bottles of beer.',
        'Take one down and pass it around, 75 bottles of beer on the wall.',
        '75 bottles of beer on the wall, 75 bottles of beer.',
        'Take one down and pass it around, 74 bottles of beer on the wall.',
        '74 bottles of beer on the wall, 74 bottles of beer.',
        'Take one down and pass it around, 73 bottles of beer on the wall.',
        '73 bottles of beer on the wall, 73 bottles of beer.',
        'Take one down and pass it around, 72 bottles of beer on the wall.',
        '72 bottles of beer on the wall, 72 bottles of beer.',
        'Take one down and pass it around, 71 bottles of beer on the wall.',
        '71 bottles of beer on the wall, 71 bottles of beer.',
        'Take one down and pass it around, 70 bottles of beer on the wall.',
        '70 bottles of beer on the wall, 70 bottles of beer.',
        'Take one down and pass it around, 69 bottles of beer on the wall.',
        '69 bottles of beer on the wall, 69 bottles of beer.',
        'Take one down and pass it around, 68 bottles of beer on the wall.',
        '68 bottles of beer on the wall, 68 bottles of beer.',
        'Take one down and pass it around, 67 bottles of beer on the wall.',
        '67 bottles of beer on the wall, 67 bottles of beer.',
        'Take one down and pass it around, 66 bottles of beer on the wall.',
        '66 bottles of beer on the wall, 66 bottles of beer.',
        'Take one down and pass it around, 65 bottles of beer on the wall.',
        '65 bottles of beer on the wall, 65 bottles of beer.',
        'Take one down and pass it around, 64 bottles of beer on the wall.',
        '64 bottles of beer on the wall, 64 bottles of beer.',
        'Take one down and pass it around, 63 bottles of beer on the wall.',
        '63 bottles of beer on the wall, 63 bottles of beer.',
        'Take one down and pass it around, 62 bottles of beer on the wall.',
        '62 bottles of beer on the wall, 62 bottles of beer.',
        'Take one down and pass it around, 61 bottles of beer on the wall.',
        '61 bottles of beer on the wall, 61 bottles of beer.',
        'Take one down and pass it around, 60 bottles of beer on the wall.',
        '60 bottles of beer on the wall, 60 bottles of beer.',
        'Take one down and pass it around, 59 bottles of beer on the wall.',
        '59 bottles of beer on the wall, 59 bottles of beer.',
        'Take one down and pass it around, 58 bottles of beer on the wall.',
        '58 bottles of beer on the wall, 58 bottles of beer.',
        'Take one down and pass it around, 57 bottles of beer on the wall.',
        '57 bottles of beer on the wall, 57 bottles of beer.',
        'Take one down and pass it around, 56 bottles of beer on the wall.',
        '56 bottles of beer on the wall, 56 bottles of beer.',
        'Take one down and pass it around, 55 bottles of beer on the wall.',
        '55 bottles of beer on the wall, 55 bottles of beer.',
        'Take one down and pass it around, 54 bottles of beer on the wall.',
        '54 bottles of beer on the wall, 54 bottles of beer.',
        'Take one down and pass it around, 53 bottles of beer on the wall.',
        '53 bottles of beer on the wall, 53 bottles of beer.',
        'Take one down and pass it around, 52 bottles of beer on the wall.',
        '52 bottles of beer on the wall, 52 bottles of beer.',
        'Take one down and pass it around, 51 bottles of beer on the wall.',
        '51 bottles of beer on the wall, 51 bottles of beer.',
        'Take one down and pass it around, 50 bottles of beer on the wall.',
        '50 bottles of beer on the wall, 50 bottles of beer.',
        'Take one down and pass it around, 49 bottles of beer on the wall.',
        '49 bottles of beer on the wall, 49 bottles of beer.',
        'Take one down and pass it around, 48 bottles of beer on the wall.',
        '48 bottles of beer on the wall, 48 bottles of beer.',
        'Take one down and pass it around, 47 bottles of beer on the wall.',
        '47 bottles of beer on the wall, 47 bottles of beer.',
        'Take one down and pass it around, 46 bottles of beer on the wall.',
        '46 bottles of beer on the wall, 46 bottles of beer.',
        'Take one down and pass it around, 45 bottles of beer on the wall.',
        '45 bottles of beer on the wall, 45 bottles of beer.',
        'Take one down and pass it around, 44 bottles of beer on the wall.',
        '44 bottles of beer on the wall, 44 bottles of beer.',
        'Take one down and pass it around, 43 bottles of beer on the wall.',
        '43 bottles of beer on the wall, 43 bottles of beer.',
        'Take one down and pass it around, 42 bottles of beer on the wall.',
        '42 bottles of beer on the wall, 42 bottles of beer.',
        'Take one down and pass it around, 41 bottles of beer on the wall.',
        '41 bottles of beer on the wall, 41 bottles of beer.',
        'Take one down and pass it around, 40 bottles of beer on the wall.',
        '40 bottles of beer on the wall, 40 bottles of beer.',
        'Take one down and pass it around, 39 bottles of beer on the wall.',
        '39 bottles of beer on the wall, 39 bottles of beer.',
        'Take one down and pass it around, 38 bottles of beer on the wall.',
        '38 bottles of beer on the wall, 38 bottles of beer.',
        'Take one down and pass it around, 37 bottles of beer on the wall.',
        '37 bottles of beer on the wall, 37 bottles of beer.',
        'Take one down and pass it around, 36 bottles of beer on the wall.',
        '36 bottles of beer on the wall, 36 bottles of beer.',
        'Take one down and pass it around, 35 bottles of beer on the wall.',
        '35 bottles of beer on the wall, 35 bottles of beer.',
        'Take one down and pass it around, 34 bottles of beer on the wall.',
        '34 bottles of beer on the wall, 34 bottles of beer.',
        'Take one down and pass it around, 33 bottles of beer on the wall.',
        '33 bottles of beer on the wall, 33 bottles of beer.',
        'Take one down and pass it around, 32 bottles of beer on the wall.',
        '32 bottles of beer on the wall, 32 bottles of beer.',
        'Take one down and pass it around, 31 bottles of beer on the wall.',
        '31 bottles of beer on the wall, 31 bottles of beer.',
        'Take one down and pass it around, 30 bottles of beer on the wall.',
        '30 bottles of beer on the wall, 30 bottles of beer.',
        'Take one down and pass it around, 29 bottles of beer on the wall.',
        '29 bottles of beer on the wall, 29 bottles of beer.',
        'Take one down and pass it around, 28 bottles of beer on the wall.',
        '28 bottles of beer on the wall, 28 bottles of beer.',
        'Take one down and pass it around, 27 bottles of beer on the wall.',
        '27 bottles of beer on the wall, 27 bottles of beer.',
        'Take one down and pass it around, 26 bottles of beer on the wall.',
        '26 bottles of beer on the wall, 26 bottles of beer.',
        'Take one down and pass it around, 25 bottles of beer on the wall.',
        '25 bottles of beer on the wall, 25 bottles of beer.',
        'Take one down and pass it around, 24 bottles of beer on the wall.',
        '24 bottles of beer on the wall, 24 bottles of beer.',
        'Take one down and pass it around, 23 bottles of beer on the wall.',
        '23 bottles of beer on the wall, 23 bottles of beer.',
        'Take one down and pass it around, 22 bottles of beer on the wall.',
        '22 bottles of beer on the wall, 22 bottles of beer.',
        'Take one down and pass it around, 21 bottles of beer on the wall.',
        '21 bottles of beer on the wall, 21 bottles of beer.',
        'Take one down and pass it around, 20 bottles of beer on the wall.',
        '20 bottles of beer on the wall, 20 bottles of beer.',
        'Take one down and pass it around, 19 bottles of beer on the wall.',
        '19 bottles of beer on the wall, 19 bottles of beer.',
        'Take one down and pass it around, 18 bottles of beer on the wall.',
        '18 bottles of beer on the wall, 18 bottles of beer.',
        'Take one down and pass it around, 17 bottles of beer on the wall.',
        '17 bottles of beer on the wall, 17 bottles of beer.',
        'Take one down and pass it around, 16 bottles of beer on the wall.',
        '16 bottles of beer on the wall, 16 bottles of beer.',
        'Take one down and pass it around, 15 bottles of beer on the wall.',
        '15 bottles of beer on the wall, 15 bottles of beer.',
        'Take one down and pass it around, 14 bottles of beer on the wall.',
        '14 bottles of beer on the wall, 14 bottles of beer.',
        'Take one down and pass it around, 13 bottles of beer on the wall.',
        '13 bottles of beer on the wall, 13 bottles of beer.',
        'Take one down and pass it around, 12 bottles of beer on the wall.',
        '12 bottles of beer on the wall, 12 bottles of beer.',
        'Take one down and pass it around, 11 bottles of beer on the wall.',
        '11 bottles of beer on the wall, 11 bottles of beer.',
        'Take one down and pass it around, 10 bottles of beer on the wall.',
        '10 bottles of beer on the wall, 10 bottles of beer.',
        'Take one down and pass it around, 9 bottles of beer on the wall.',
        '9 bottles of beer on the wall, 9 bottles of beer.',
        'Take one down and pass it around, 8 bottles of beer on the wall.',
        '8 bottles of beer on the wall, 8 bottles of beer.',
        'Take one down and pass it around, 7 bottles of beer on the wall.',
        '7 bottles of beer on the wall, 7 bottles of beer.',
        'Take one down and pass it around, 6 bottles of beer on the wall.',
        '6 bottles of beer on the wall, 6 bottles of beer.',
        'Take one down and pass it around, 5 bottles of beer on the wall.',
        '5 bottles of beer on the wall, 5 bottles of beer.',
        'Take one down and pass it around, 4 bottles of beer on the wall.',
        '4 bottles of beer on the wall, 4 bottles of beer.',
        'Take one down and pass it around, 3 bottles of beer on the wall.',
        '3 bottles of beer on the wall, 3 bottles of beer.',
        'Take one down and pass it around, 2 bottles of beer on the wall.',
        '2 bottles of beer on the wall, 2 bottles of beer.',
        'Take one down and pass it around, 1 bottle of beer on the wall.',
        '1 bottle of beer on the wall, 1 bottle of beer.',
        'Take one down and pass it around, no more bottles of beer on the wall.',
        'No more bottles of beer on the wall, no more bottles of beer.',
        'Go to the store and buy some more, 99 bottles of beer on the wall.'
    ];
    
    for(let i = 0; i < song99botles.length; i++){
        yield song99botles[i];
    }           

    return 0;
    
    //throw new Error('Not implemented');
}


/**
 * Returns the Fibonacci sequence:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * See more at: https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * @return {Iterable.<number>}
 *
 */
function* getFibonacciSequence() {

    let num = 39;
    let a = 1, b = 0, temp;

    while (num >= 0){
        yield b;
        temp = a;
        a = a + b;
        b = temp;
        num--;
    }
  
    
    return a;

    //throw new Error('Not implemented');
}


/**
 * Traverses a tree using the depth-first strategy
 * See details: https://en.wikipedia.org/wiki/Depth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 * @example
 *
 *   var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 },
 *       node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
 *   node1.children = [ node2, node6, node7 ];
 *   node2.children = [ node3, node4 ];
 *   node4.children = [ node5 ];
 *   node7.children = [ node8 ];
 *
 *     source tree (root = 1):
 *            1
 *          / | \
 *         2  6  7
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       3   4     8
 *           |
 *           5
 *
 *  depthTraversalTree(node1) => node1, node2, node3, node4, node5, node6, node7, node8
 *
 */
function* depthTraversalTree(root) {

    let result = []
    let stack = []
    if (root) {
        stack.push(root)
    }
    while (stack.length > 0) {
        let node = stack.pop()
        result.push(node)
        if (node.children) {
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i])
            }
        }
    }
    for (let i = 0; i < result.length; i++) {
        yield result[i];
    }
    return result;

    // throw new Error('Not implemented');
}


/**
 * Traverses a tree using the breadth-first strategy
 * See details: https://en.wikipedia.org/wiki/Breadth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 * @example
 *     source tree (root = 1):
 *
 *            1
 *          / | \
 *         2  3  4
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       5   6     7
 *           |
 *           8
 *
 */
function* breadthTraversalTree(root) {

    let result = []
    let stack = []
    if (root) {
      stack.push(root)
    }
    while (stack.length > 0) {
      let node = stack.shift()
      result.push(node)
      if (node.children) {
        for (let i = 0; i< node.children.length ; i++) {
          stack.push(node.children[i])
        }
      }
    }
    for(let i = 0; i < result.length; i++){
      yield result[i];
  }   
    return result;

    //throw new Error('Not implemented');
}


/**
 * Merges two yield-style sorted sequences into the one sorted sequence.
 * The result sequence consists of sorted items from source iterators.
 *
 * @params {Iterable.<number>} source1
 * @params {Iterable.<number>} source2
 * @return {Iterable.<number>} the merged sorted sequence
 *
 * @example
 *   [ 1, 3, 5, ... ], [2, 4, 6, ... ]  => [ 1, 2, 3, 4, 5, 6, ... ]
 *   [ 0 ], [ 2, 4, 6, ... ]  => [ 0, 2, 4, 6, ... ]
 *   [ 1, 3, 5, ... ], [ -1 ] => [ -1, 1, 3, 5, ...]
 */
function* mergeSortedSequences(source1, source2) {

    let z = source1();
  let x = source2();  
  let a = z.next();
  let b = x.next();

  if (a.done) {
    while (!b.done) {
      yield b.value;
      b = x.next();
    }
  }
  if(b.done){
    while (!a.done) {
      yield a.value;
      a = z.next();
    }
  }
  while (!a.done) {
    if(b.value===undefined){
      while (!a.done) {
        yield a.value;
        a = z.next();
      }
    }
    if (a.value < b.value) {
      yield a.value;
      a = z.next();

    } else {
      yield b.value;    
      b = x.next();
    }
  }
  while (!b.done) {
    yield b.value;
    b = x.next();
  }
  
  return z;     

    //hrow new Error('Not implemented');
}

/**
 * Resolve Promises and take values step by step.
 * 
 * @params {Iterable.<Promise>} generator
 * @return {Promise} Promise with value returned via return 
 *
 * @example
 *   async((function*() {
 *      var a = yield new Promise((resolve)=> setTimeout(()=>resolve(5)));
 *      var b = yield Promise.resolve(6);
 *      return a + b;
 *   }).then(value=>console.log(value))  => 11
 *
 *   Most popular implementation of the logic in npm https://www.npmjs.com/package/co
 */
function async(generator) {

    let gen = generator();
    return Promise.resolve(function func(x) {
        let res = gen.next(x);
        if (res.done) return res.value;
        return res.value.then(func);
    }());

    //throw new Error('Not implemented');
}


module.exports = {
    get99BottlesOfBeer: get99BottlesOfBeer,
    getFibonacciSequence: getFibonacciSequence,
    depthTraversalTree: depthTraversalTree,
    breadthTraversalTree: breadthTraversalTree,
    mergeSortedSequences: mergeSortedSequences,
    async               : async
};
