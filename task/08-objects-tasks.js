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
}

Rectangle.prototype.getArea = function(){
    return this.width*this.height;
};


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

    element(value) {
        return new Selector().element(value);
    },

    id(value) {
        return new Selector().id(value);
    },

    class(value) {
        return new Selector().class(value);
    },

    attr(value) {
        return new Selector().attr(value);
    },

    pseudoClass(value) {
        return new Selector().pseudoClass(value);
    },

    pseudoElement(value) {
        return new Selector().pseudoElement(value);
    },

    combine(selector1, combinator, selector2) {
        return selector1.combine(combinator, selector2);
    }
};

class Selector {
    constructor() {
        this._element = '';
        this._id = '';
        this._class = '';
        this._attr = '';
        this._pseudoClass = '';
        this._pseudoElement = '';
        this._secondSelector = {};
        this._combinator = '';
        this._isNext = false;
    }

    element(value) {
        if (!this._element.length) {
            if (this._pseudoElement.length || this._pseudoClass.length || this._attr.length || this._class.length || this._id.length) {
                throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
            }
            this._element = `${value}`;
            return this;
        }
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');

    }

    id(value) {
        if (!this._id.length) {
            if (this._pseudoElement.length || this._pseudoClass.length || this._attr.length || this._class.length) {
                throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
            }
            this._id = `#${value}`;
            return this;
        }
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');

    }

    class(value) {
        if (this._pseudoElement.length || this._pseudoClass.length || this._attr.length) {
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        this._class += `.${value}`;
        return this;
    }

    attr(value) {
        if (this._pseudoElement.length || this._pseudoClass.length) {
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        this._attr += `[${value}]`;
        return this;
    }

    pseudoClass(value) {
        if (this._pseudoElement.length) {
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        this._pseudoClass += `:${value}`;
        return this;
    }

    pseudoElement(value) {
        if (!this._pseudoElement.length) {
            this._pseudoElement = `::${value}`;
            return this;
        }
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');

    }

    stringify() {
        function select() {
            return `${this._element}${this._id}${this._class}${this._attr}${this._pseudoClass}${this._pseudoElement}`;
        }
        if (!this._isNext) return select.call(this);

        return `${select.call(this)} ${this._combinator} ${this._secondSelector.stringify()}`;
    }

    combine(combinator, selector2) {
        this._secondSelector = selector2;
        this._combinator = combinator;
        this._isNext = true;
        return this;
    }
}


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
