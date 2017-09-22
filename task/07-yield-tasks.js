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
    //throw new Error('Not implemented');

    for(let i=99;i!=2;){
        yield `${i} bottles of beer on the wall, ${i} bottles of beer.`;
        yield `Take one down and pass it around, ${--i} bottles of beer on the wall.`;
    }

    yield '2 bottles of beer on the wall, 2 bottles of beer.';
    yield 'Take one down and pass it around, 1 bottle of beer on the wall.';
    yield '1 bottle of beer on the wall, 1 bottle of beer.';
    yield 'Take one down and pass it around, no more bottles of beer on the wall.';
    yield 'No more bottles of beer on the wall, no more bottles of beer.';
    yield 'Go to the store and buy some more, 99 bottles of beer on the wall.';
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
    //throw new Error('Not implemented');

    let a=0;
    let b=1;

    yield a;
    yield b;

    while(true){
        yield a+b;
        b=a+b;
        a=b-a;
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
    //throw new Error('Not implemented');

    let arr=new Array();
    arr.push(root);
    let buff;

    while(arr.length>0){
        buff=arr.pop();
        yield buff;
        if(buff.children){
            for(let i=buff.children.length-1;i>=0;i--) arr.push(buff.children[i]);
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
    //throw new Error('Not implemented');

    let arr=new Array();
    arr.unshift(root);
    let buff;
    let inx=0;

    while(arr.length>inx){
        buff=arr[inx];
        yield buff;
        if(buff.children){
            for(let i=0;i<buff.children.length;i++){
                arr.push(buff.children[i]);
            }
        }
        inx++;
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
    //throw new Error('Not implemented');
    //i<=source1.length && j<=source2.length

    let source1Gen = source1();
    let source2Gen = source2();

    var s1=source1Gen.next();
    var s2=source2Gen.next(); 

    while(true){  
    
        if(s1.value=== undefined || s2.value === undefined) break;

        if(s1.value < s2.value) {
            yield s1.value;
            s1=source1Gen.next();
            continue;
        }
        if(s1.value > s2.value){
            yield s2.value;
            s2=source2Gen.next();
            continue;
        } 
        if(s1.value == s2.value){
            yield s1.value;
            yield s2.value;
            s1=source1Gen.next();
            s2=source2Gen.next();
            continue;
        }
    }

    while(s1.value!==undefined){
        yield s1.value;       
        s1=source1Gen.next();
    }

    while(s2.value!==undefined){
        yield s2.value;      
        s2=source2Gen.next();
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
    //throw new Error('Not implemented');

    var itr=generator();

    // return Promise.resolve(function fnc(item){
    //     let p=itr.next(item);
    //     if(p.done) return p.value;
    //     return p.value.then(fnc);
    // }());

    //     return Promise.resolve(function fnc(item){
    //         let p;
    //         let s;

    //         while(true){ 
    //             p=itr.next(s);
    //             s=p.value;
    //             return p.value.then(()=>s);
    //             if(p.done) break;
    //         }
    // }());

    // return Promise.resolve(function fnc(s){
        
    //         let p=itr.next(s)

    //         if(p.done) p.value;

    //         return p.value.then(fnc);
            
    // }());

            return Promise.resolve(function fnc(s){
            let p;
            let pp=Promise.resolve();

            while(true){ 
                p=itr.next(s);
                s=p.value;
                return pp.then(()=>s);
                if(p.done) break;
            }
    }());

    // let buff=itr.next();
    // let p;
    // do{
    //     //yield buff.value;
    //     buff=itr.next();
        
    // }while(buff.done==true)

    // let buff=Promise.resolve();
    // return Promise.resolve(function fnc(){
    //     let p=itr.next();
    //     do{
    //         //p.value.then((result)=>result);
    //         buff=buff.then((result)=>{
    //             return p.itr.next(result).value;
    //         });

    //     }while(!p.done);
    // }());

    // var prom = generator();

    // var pr=Promise.resolve();

    // function* ff() {
    //     let qq=prom.next();
    //     while(true){
            
    //         if(qq===undefined) break;
    //         qq=prom.next(qq.value);
    //         yield qq.value;
    //     }
    // };


    // return pr.then()
    // .then((result1) => 
    // { 
    //     return promices.next(result1).value;
    // })
    // .then((result1) => 
    // { 
    //     return promices.next(result1).value;
    // });;

    // var prom = generator();
    // var arr=new Array();
    // let buff;
    // buff=prom.next().value;
    // arr[0]=buff;
    // let i=1;

    // while(true){
    //     buff=prom.next(buff).value;
    //     if(buff==undefined) break;
    //     arr[i++]=buff;
    // }

    // var pr=Promise.resolve();

    // for(let item of arr){
    //     pr=pr.this(()=>{ return item;})
    // }

    // return pr;

//     let prm = Promise.resolve((item) => {
//         let p = 1;
//         p = itr.next(item);
//         return p.value;
//     });

// return prm;

//return Promise.all(generator).then(value=>value);

}


module.exports = {
    get99BottlesOfBeer: get99BottlesOfBeer,
    getFibonacciSequence: getFibonacciSequence,
    depthTraversalTree: depthTraversalTree,
    breadthTraversalTree: breadthTraversalTree,
    mergeSortedSequences: mergeSortedSequences,
    async               : async
};
