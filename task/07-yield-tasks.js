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
    let bottles;
    let bottlesLeft;
    for (let i = 99; i >= 1; i--) {
        if (i === 1) {
            bottles = "bottle";
            bottlesLeft = "no more bottles of beer on the wall.";
        } else {
            bottles = "bottles";
            if((i-1)===1)
                bottlesLeft = i - 1 + " bottle of beer on the wall.";
            else bottlesLeft = i - 1 + " bottles of beer on the wall.";
        }

        yield  (i+ " " + bottles + " of beer on the wall, "+i+ " " + bottles + " of beer.");
        yield ("Take one down and pass it around, "+bottlesLeft);
        if(i===1) {
            yield  'No more bottles of beer on the wall, no more bottles of beer.';
            yield 'Go to the store and buy some more, 99 bottles of beer on the wall.';
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

    let previous_first = 0, previous_second = 1, next = 1;

    while(true) {
        yield previous_first;
        next = previous_first + previous_second;
        previous_first = previous_second;
        previous_second = next;


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
    let stack=[root];
    let n;
    while(stack.length>0) {
        n = stack.pop();
        yield n;
          if (!n.children) {
            continue;
        }

        for (let i = n.children.length-1; i>=0; i--) {
            stack.push(n.children[i]);
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
    let stack=[root];
    let n;
    while(stack.length>0) {
        n = stack.shift();
        yield n;
        if (!n.children) {
            continue;
         }
        //
        // stack.push(...n.children);
        for (let i =0; i <n.children.length; i++) {
            stack.push(n.children[i]);
        }
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
   let gen1 = source1();
   let gen2 = source2();
   while(true){
       let t = gen1.next();
       let g = gen2.next();
       if(t.done  === false && g.done === false){
           if(t.value < g.value){
               yield t.value; yield g.value;
           }
           else{
               yield g.value; yield t.value;
           }
       }else{
           if(t.done === false) yield t.value;
           if(g.done === false) yield g.value;
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
    //https://www.digitalocean.com/community/tutorials/understanding-generators-in-javascript-ru
    function asyncAlt(generatorFunction) {
        // Return a function
        return function() {
            // Create and assign the generator object
            const generator = generatorFunction()

            // Define a function that accepts the next iteration of the generator
            function resolve(next) {
                // If the generator is closed and there are no more values to yield,
                // resolve the last value
                if (next.done) {
                    return Promise.resolve(next.value)
                }

                // If there are still values to yield, they are promises and
                // must be resolved.
                return Promise.resolve(next.value).then(response => {
                    return resolve(generator.next(response))
                })
            }

            // Begin resolving promises
            return resolve(generator.next())
        }
    }
    return new Promise((resolve, reject)=>{
        let t =  asyncAlt(generator);
        t().then(response => resolve(response) , (err)=> reject(err));
    })

}


module.exports = {
    get99BottlesOfBeer: get99BottlesOfBeer,
    getFibonacciSequence: getFibonacciSequence,
    depthTraversalTree: depthTraversalTree,
    breadthTraversalTree: breadthTraversalTree,
    mergeSortedSequences: mergeSortedSequences,
    async               : async
};
