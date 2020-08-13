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
}

Rectangle.prototype.getArea = function() {
    return this.width * this.height;
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
    return Object.setPrototypeOf(JSON.parse(json), proto);
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
const indices = { 'type':0, 'id':1, 'class':2, 'attribute':3, 'pseudo-class':4, 'pseudo-element':5 };
const generators = {'type':s => s, 'id':s => `#${s}`, 'class':s => `.${s}`,
    'attribute':s => `[${s}]`, 'pseudo-class':s => `:${s}`, 'pseudo-element':s => `::${s}`};

function Decorator(value, selectorName, included = null) {
    this.index = indices[selectorName];
    this.string = generators[selectorName](value);
    this.included = included;

    if (included !== null) {
        if (this.index < included.index) {
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        if (['type', 'id', 'pseudo-element'].includes(selectorName)
                && this.index === included.index) {
            throw new Error ('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
    }

    this.appendSelector = function(other, combinator) {
        this.string = `${this.string} ${combinator} `;
        const result = other;
        while (other.included !== null) {
            other = other.included;
        }
        other.included = this;
        return result;
    }

    this.stringify = function() {
        return (this.included === null ? '' : this.included.stringify()) + this.string;
    };

    this.element = value => new Decorator(value, 'type', this);
    this.id = value => new Decorator(value, 'id', this);
    this.class = value => new Decorator(value, 'class', this);
    this.attr = value => new Decorator(value, 'attribute', this);
    this.pseudoClass = value => new Decorator(value, 'pseudo-class', this);
    this.pseudoElement = value => new Decorator(value, 'pseudo-element', this);
}

const cssSelectorBuilder = {

    element: function(value) {
        return new Decorator(value, 'type');
    },

    id: function(value) {
        return new Decorator(value, 'id');
    },

    class: function(value) {
        return new Decorator(value, 'class');
    },

    attr: function(value) {
        return new Decorator(value, 'attribute');
    },

    pseudoClass: function(value) {
        return new Decorator(value, 'pseudo-class');
    },

    pseudoElement: function(value) {
        return new Decorator(value, 'pseudo-element');
    },

    combine: function(selector1, combinator, selector2) {
        return selector1.appendSelector(selector2, combinator);
    },
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
