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

const cssSelectorBuilder = {

    element: function(value) {
        return new CssSelector().element(value)
    },

    id: function(value) {
        return new CssSelector().id(value)
    },

    class: function(value) {
        return new CssSelector().class(value)
    },

    attr: function(value) {
        return new CssSelector().attr(value)
    },

    pseudoClass: function(value) {
        return new CssSelector().pseudoClass(value)
    },

    pseudoElement: function(value) {
        return new CssSelector().pseudoElement(value)
    },

    combine: function(selector1, combinator, selector2) {
        return new CssSelector().combine(selector1, combinator, selector2)
    },

};

class CssSelector {
    constructor() {
        this.cssSelectorString = '';
        this.occurrences = {
            'id': 0,
            'element': 0,
            'pseudoElement': 0,
        }
        this.order = []
    }

    element(value) {
        this.order.push(1)
        this.checkOrder()
        this.checkOccurrences('element')
        this.cssSelectorString += `${value}`;
        this.occurrences.element += 1;
        return this;
    }

    id(value) {
        this.order.push(2)
        this.checkOrder()
        this.checkOccurrences('id')
        this.cssSelectorString += `#${value}`;
        this.occurrences.id += 1;
        return this;
    }

    class(value) {
        this.order.push(3)
        this.checkOrder()
        this.cssSelectorString += `.${value}`;
        return this;
    }

    attr(value) {
        this.order.push(4)
        this.checkOrder()
        this.cssSelectorString += `[${value}]`;
        return this;
    }

    pseudoClass(value) {
        this.order.push(5)
        this.checkOrder()
        this.cssSelectorString += `:${value}`;
        return this;
    }

    pseudoElement(value) {
        this.order.push(6)
        this.checkOrder()
        this.checkOccurrences('pseudoElement')
        this.cssSelectorString += `::${value}`;
        this.occurrences.pseudoElement += 1;
        return this;
    }

    combine(selector1, combinator, selector2) {
        this.cssSelectorString += `${selector1.cssSelectorString} ${combinator} ${selector2.cssSelectorString}`
        return this;
    }

    stringify() {
        return this.cssSelectorString;
    }

    checkOrder() {
        this.order.forEach((value, index, array) => {
            if (value > array[index + 1]) {
                throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element')
            }
        })
    }

    checkOccurrences(value) {
        if (this.occurrences[value] === 1) {
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
    }
}


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
