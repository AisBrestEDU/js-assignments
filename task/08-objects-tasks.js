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
    this.width=width;
    this.height=height;
    Rectangle.prototype.getArea = function() {return width * height};
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
    return Object.setPrototypeOf(JSON.parse(json),proto);
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
        return new CssSelector().element(value);
    },

    id: function(value) {
        return new CssSelector().id(value);
    },

    class: function(value) {
        return new CssSelector().class(value);
    },

    attr: function(value) {
        return new CssSelector().attr(value);
    },

    pseudoClass: function(value) {
        return new CssSelector().pseudoClass(value);
    },

    pseudoElement: function(value) {
        return new CssSelector().pseudoElement(value);
    },

    combine: function(selector1, combinator, selector2) {
        return new Combination(selector1, combinator, selector2);
    },
};

class CssSelector {
    constructor() {
        // [order , content, quantity check]
        this.selector = {
            element: [1, '', true],
            id: [2, '', true],
            class: [3, [], true],
            attr: [4, [], true],
            pseudoClass: [5, [], true],
            pseudoElement: [6, '', true],
        };
        this.stringResult = '';
        this.order = 0;
    }

    element(value) {
        if (this.order <= this.selector.element[0]) {
            if (this.selector.element[2]) {
                this.selector.element[1] = value;
                this.selector.element[2] = false;
                this.order = this.selector.element[0]
                return this;
            }
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
        throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    id(value) {
        if (this.order <= this.selector.id[0]) {
            if (this.selector.id[2]) {
                this.selector.id[1] = value;
                this.selector.id[2] = false;
                this.order = this.selector.id[0]
                return this;
            }
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector'); 
        }
        throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    class(value) {
        if (this.order <= this.selector.class[0]) {
            this.selector.class[1].push(value);
            this.selector.class[2] = false;
            this.order = this.selector.class[0]
            return this;
        }
        throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    attr(value) {
        if (this.order <= this.selector.attr[0]) {
            this.selector.attr[1].push(value);
            this.selector.attr[2] = false;
            this.order = this.selector.attr[0]
            return this;
        }
        throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    pseudoClass(value) {
        if (this.order <= this.selector.pseudoClass[0]) {
            this.selector.pseudoClass[1].push(value);
            this.selector.pseudoClass[2] = false;
            this.order = this.selector.pseudoClass[0]
            return this;
        }
        throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    pseudoElement(value) {
        if (this.order <= this.selector.pseudoElement[0]) {
            if (this.selector.pseudoElement[2]) {
                this.selector.pseudoElement[1] = value;
                this.selector.pseudoElement[2] = false;
                this.order = this.selector.pseudoElement[0]
                return this;
            }
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
        throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    stringify() {
        if (!this.selector.element[2]) this.stringResult += `${this.selector.element[1]}`;
        if (!this.selector.id[2]) this.stringResult += `#${this.selector.id[1]}`;
        if (!this.selector.class[2]) this.stringResult += `.${this.selector.class[1].join('.')}`;
        if (!this.selector.attr[2]) this.stringResult += `[${this.selector.attr[1].join('][')}]`;
        if (!this.selector.pseudoClass[2]) this.stringResult += `:${this.selector.pseudoClass[1].join(':')}`;
        if (!this.selector.pseudoElement[2]) this.stringResult += `::${this.selector.pseudoElement[1]}`;
        console.log(this);
        return this.stringResult;
    }
}

class Combination {
    constructor(selector1, combinator, selector2) {
        this.selector1 = selector1;
        this.combinator = combinator;
        this.selector2 = selector2;
    }

    stringify() {
        if ([' ', '+', '~', '>'].includes(this.combinator)) return `${this.selector1.stringify() } ${this.combinator} ${this.selector2.stringify()}`;
        throw new Error('Please use proper combinator')
    }
}


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
