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
    this.__proto__.getArea = function () {
        return this.width * this.height;
    };
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
    let object = JSON.parse(json);
    return Object.setPrototypeOf(object, proto);
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

let order = ['element', 'id', 'class', 'attr', 'pseudoClass', 'pseudoElement'];

const cssSelectorBuilder = {

    selectors: [],
    isUnique: function (type) {
        for (let sel of this.selectors) {
            if (sel.type === type) {
                return false;
            }
        }
        return true;
    },
    isCorrectOrder: function () {
        for (let i = 0; i < this.selectors.length - 1; i++) {
            if (order.indexOf(this.selectors[i].type) > order.indexOf(this.selectors[i + 1].type)) {
                return false;
            }
        }
        return true;
    },

    addSelector: function (type, value) {
        let newBuilder = Object.create(this);
        newBuilder.selectors = Array.from(this.selectors);
        newBuilder.selectors.push(new Selector(type, value));
        if (!newBuilder.isCorrectOrder()) {
            throw "Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element";
        }
        return newBuilder;
    },

    element: function (value) {
        if (!this.isUnique('element')) {
            throw "Element, id and pseudo-element should not occur more then one time inside the selector";
        }
        return this.addSelector('element', value);
    },

    id: function (value) {
        if (!this.isUnique('id')) {
            throw "Element, id and pseudo-element should not occur more then one time inside the selector";
        }
        return this.addSelector('id', value);
    },

    class: function (value) {
        return this.addSelector('class', value);
    },

    attr: function (value) {
        return this.addSelector('attr', value);
    },

    pseudoClass: function (value) {
        return this.addSelector('pseudoClass', value);
    },

    pseudoElement: function (value) {
        if (!this.isUnique('pseudoElement')) {
            throw "Element, id and pseudo-element should not occur more then one time inside the selector";
        }
        return this.addSelector('pseudoElement', value);
    },
    stringify: function () {
        let str = "";
        for (let sel of this.selectors) {
            str += sel.print();
        }
        return str;
    },
    combine: function (selector1, combinator, selector2) {
        let newBuilder = Object.create(this);
        newBuilder.selectors = Array.from(selector1.selectors);
        newBuilder.selectors.push(new Selector('combinator', combinator));
        for (let sel of selector2.selectors) {
            newBuilder.selectors.push(sel);
        }
        return newBuilder;
    },
};

function Selector(type, text) {
    this.type = type;
    this.text = text;
    this.print = function () {
        let str;
        switch (type) {
            case 'combinator':
                str = " " + this.text + " ";
                break;
            case 'element':
                str = this.text;
                break;
            case 'id':
                str = "#" + this.text;
                break;
            case 'class':
                str = "." + this.text;
                break;
            case 'attr':
                str = "[" + this.text + "]";
                break;
            case 'pseudoClass':
                str = ":" + this.text;
                break;
            case 'pseudoElement':
                str = "::" + this.text;
                break;
        }
        return str;
    }
}


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
