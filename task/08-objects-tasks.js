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
    Rectangle.prototype.getArea = function() {
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
    let obj = JSON.parse(json);
    obj.__proto__ = proto;
    return obj;
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

class MySuperBaseSelector {
    constructor(value) {
        this.occurenceArray = [];
        this.orderArray = [];

        if (value === undefined) {
            this.str = '';
        } else {
            this.str = value;
        }
    }

    stringify() {
        return this.str;
    }

    validateOccurence(value) {
        if ([1, 2, 6].indexOf(value) != -1 && this.occurenceArray.indexOf(value) != -1) {
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        } else {
            this.occurenceArray.push(value);
        }
    }

    validateOrder(value) {
        if (this.orderArray.length > 0 && this.orderArray[this.orderArray.length - 1] > value) {
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        } else {
            this.orderArray.push(value);
        }
    }

    element(value) {
        this.str += `${value}`;
        this.validateOccurence(1);
        this.validateOrder(1);
        return this;
    }

    id(value) {
        this.str += `#${value}`;
        this.validateOccurence(2);
        this.validateOrder(2);
        return this;
    }

    class(value) {
        this.str += `.${value}`;
        this.validateOrder(3);
        return this;
    }

    attr(value) {
        this.str += `[${value}]`;
        this.validateOrder(4);
        return this;
    }

    pseudoClass(value) {
        this.str += `:${value}`;
        this.validateOrder(5);
        return this;
    }

    pseudoElement(value) {
        this.str += `::${value}`;
        this.validateOccurence(6);
        this.validateOrder(6);
        return this;
    }
}

class MySuperBaseElementSelector extends MySuperBaseSelector {
    constructor(value) {
        super();
        this.element(value);
    }
}

class MySuperBaseIdSelector extends MySuperBaseSelector {
    constructor(value) {
        super();
        this.id(value);
    }
}

class MySuperBaseClassSelector extends MySuperBaseSelector {
    constructor(value) {
        super();
        this.class(value);
    }
}

class MySuperBaseAttrSelector extends MySuperBaseSelector {
    constructor(value) {
        super();
        this.attr(value);
    }
}

class MySuperBasePseudoClassSelector extends MySuperBaseSelector {
    constructor(value) {
        super();
        this.pseudoClass(value);
    }
}

class MySuperBasePseudoElementSelector extends MySuperBaseSelector {
    constructor(value) {
        super();
        this.pseudoElement(value);
    }
}

const cssSelectorBuilder = {

    element: function(value) {
        return new MySuperBaseElementSelector(value);
    },

    id: function(value) {
        return new MySuperBaseIdSelector(value);
    },

    class: function(value) {
        return new MySuperBaseClassSelector(value);
    },

    attr: function(value) {
        return new MySuperBaseAttrSelector(value);
    },

    pseudoClass: function(value) {
        return new MySuperBasePseudoClassSelector(value);
    },

    pseudoElement: function(value) {
        return new MySuperBasePseudoElementSelector(value);
    },

    combine: function(selector1, combinator, selector2) {
        return new MySuperBaseSelector(`${selector1.str} ${combinator} ${selector2.str}`);
    },
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
