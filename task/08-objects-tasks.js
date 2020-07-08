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
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}


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
    elements: {
        id: 0,
        psEl: 0,
    },
    elementOrder: ['element', 'id ', 'class', 'attribute', 'pseudo-class', 'pseudo-element'],
    currentElementOrder: [],
    combineResult: [],
    result: [],
    element(value) {
        if (this.result.length > 0) {
            if (this.result.length < 2) { this.sendError(); }
            this.combineResult.push(this.result.join(''));
            this.result = [];
            this.elements = {};
            this.currentElementOrder = [];
        }

        this.checkOrder(this.elementOrder[0]);

        this.result.push(value);
        return this;
    },

    id(value) {
        if (this.elements.id) {
            this.sendError();
        }
        this.elements.id = 1;

        this.checkOrder(this.elementOrder[1]);


        this.result.push(`#${value}`);
        return this;
    },

    class(value) {
        this.checkOrder(this.elementOrder[2]);

        this.result.push(`.${value}`);
        return this;
    },

    attr(value) {
        this.checkOrder(this.elementOrder[3]);

        this.result.push(`[${value}]`);
        return this;
    },

    pseudoClass(value) {
        this.checkOrder(this.elementOrder[4]);

        this.result.push(`:${value}`);
        return this;
    },

    pseudoElement(value) {
        if (this.elements.psEl) {
            this.sendError();
        }
        this.elements.psEl = 1;

        this.checkOrder(this.elementOrder[5]);

        this.result.push(`::${value}`);
        return this;
    },

    combine(selector1, combinator, selector2) {
        const first = selector2.combineResult.pop();
        const second = [...selector1.result].join('');
        this.result = [];
        this.result.push(`${first} ${combinator} ${second}`);
        return this;
    },

    sendError() {
        this.clean();
        throw Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    },

    clean() {
        this.combineResult = [];
        this.result = [];
        this.elements = {};
        this.currentElementOrder = [];
    },

    checkOrder(element) {
        const position = this.elementOrder.indexOf(element);
        if (this.currentElementOrder[this.currentElementOrder.length - 1] > position) {
            this.clean();
            throw Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        } else {
            this.currentElementOrder.push(position);
        }
    },

    stringify() {
        const resultEnd = this.result.join('');
        this.clean();
        return resultEnd;
    },
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
