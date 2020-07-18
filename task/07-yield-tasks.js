"use strict";

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
  let i = 99;
  while (i > 0) {
    if (i === 99) {
      yield "99 bottles of beer on the wall, 99 bottles of beer.";
    }
    i--;
    if (i > 1) {
      yield "Take one down and pass it around, " +
        i +
        " bottles of beer on the wall.";
      yield i + " bottles of beer on the wall, " + i + " bottles of beer.";
    } else if (i === 1) {
      yield "Take one down and pass it around, " +
        i +
        " bottle of beer on the wall.";
      yield i + " bottle of beer on the wall, " + i + " bottle of beer.";
    } else {
      yield "Take one down and pass it around, no more bottles of beer on the wall.";
      yield "No more bottles of beer on the wall, no more bottles of beer.";
      yield "Go to the store and buy some more, 99 bottles of beer on the wall.";
    }
  }
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
  let prev = 0;
  let curr = 1;
  let next;
  yield prev;
  yield curr;

  while (true) {
    next = prev + curr;
    prev = curr;
    curr = next;
    yield next;
  }
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
  let nodes = [root];
  while (nodes.length > 0) {
    let curr = nodes[nodes.length - 1];
    yield curr;
    nodes.pop();
    if (curr.children) {
      for (let el of curr.children.reverse()) {
        nodes.push(el);
      }
    }
  }
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
  let nodes = [root];
  let i = 0;
  while (nodes.length - i > 0) {
    let curr = nodes[i];
    yield curr;
    if (curr.children) {
      for (let el of curr.children) {
        nodes.push(el);
      }
    }
    i++;
  }
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
  source1 = source1();
  source2 = source2();
  while (true) {
    let value1 = source1.next().value;
    let value2 = source2.next().value;
    if (value1 === undefined) yield value2;
    else if (value2 === undefined) yield value1;
    else {
      yield Math.min(value1, value2);
      yield Math.max(value1, value2);
    }
  }
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
  return Promise.resolve(
    (function resolveValue(value) {
      let promise = gen.next(value);
      if (promise.done) {
        return promise.value;
      }
      return promise.value.then(resolveValue);
    })()
  );
}

module.exports = {
  get99BottlesOfBeer: get99BottlesOfBeer,
  getFibonacciSequence: getFibonacciSequence,
  depthTraversalTree: depthTraversalTree,
  breadthTraversalTree: breadthTraversalTree,
  mergeSortedSequences: mergeSortedSequences,
  async: async,
};
