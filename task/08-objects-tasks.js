'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
};
Rectangle.prototype.getArea = function () {
    return this.width * this.height;
};

// or using ES6 sugar

// class Rectangle {
//     constructor(width, height) {
//         this.width = width;
//         this.height = height;
//     }
//     getArea() {
//         return this.width * this.height;
//     };
// }


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
    return Object.assign(Object.create(proto), JSON.parse(json));
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
    
    element: function(value) {
        if (!this.buffer) {
            return this.addBuffer(this, value, 0, "0");
        };
        if (!this.checkCounters("0")) {
            throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector");            
        };
        this.checkLog(0);
        this.buffer += value;        
        return this;       
    },

    id: function(value) {  
        if (!this.buffer) {
            return this.addBuffer(this, "#" + value, 1, "1");            
        };
        if (!this.checkCounters("1")) {
            throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector");            
        };
        this.checkLog(1);
        this.buffer += "#" + value;                        
        return this;
    },

    class: function(value) {
        if (!this.buffer) {
            return this.addBuffer(this, "." + value, 2);            
        };
        this.checkLog(2);   
        this.buffer += "." + value;                        
        return this;
    },

    attr: function(value) {
        if (!this.buffer) {
            return this.addBuffer(this, "[" + value + "]", 3);            
        };
        this.checkLog(3);
        this.buffer += "[" + value + "]";                        
        return this;
    },

    pseudoClass: function(value) {
        if (!this.buffer) {
            return this.addBuffer(this, ":" + value, 4);            
        };
        this.checkLog(4);
        this.buffer += ":" + value;                        
        return this;
    },

    pseudoElement: function(value) {
        if (!this.buffer) {
            return this.addBuffer(this, "::" + value, 5, "2");            
        }   
        if (!this.checkCounters("2")) {
            throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector");
        };
        this.checkLog(5);
        this.buffer += "::" + value;                        
        return this;
    },

    combine: function(selector1, combinator, selector2) {
        if (!this.buffer) {
            return this.addBuffer(this, selector1.buffer + " " + combinator + " " + selector2.buffer);            
        };
        this.buffer += selector1.buffer + " " + combinator + " " + selector2.buffer;                        
        return this;
    },
};
    
    cssSelectorBuilder.__proto__.checkLog = function (log) {
        if (log < this.log) {
            throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element");                        
        } else {
            this.log = log;
        }
    };
    cssSelectorBuilder.__proto__.checkCounters = function (el) {
        this.counters[el] += 1;
        if (this.counters[el] > 1) {
            return false;
        };
        return true;
    };
    cssSelectorBuilder.__proto__.addBuffer = function (self, val, log, incr) {
        let obj = Object.create(self);
        obj.buffer = "";
        obj.buffer += val;   
        obj.counters = {
            "0" : 0,
            "1" : 0,
            "2" : 0
        };     
        if (incr) {
            obj.counters[incr] += 1;
        };  
        obj.log = log;
        return obj;
    };
    cssSelectorBuilder.__proto__.stringify = function () {
        return this.buffer;
    };

module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
