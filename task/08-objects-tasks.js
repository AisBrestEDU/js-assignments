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
    this.width = width
    this.height = height
}

Rectangle.prototype.getArea = function () {
    return this.width * this.height
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
    return JSON.stringify(obj)
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
    return Object.setPrototypeOf(JSON.parse(json), proto)
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
function CssSelectorBuilder() {
    this.data = {
        element: null,
        id: null,
        class: [],
        attr: [],
        pseudoClass: [],
        pseudoElement: null
    }

    this.currentStage = 0
}

CssSelectorBuilder.prototype = {
    checkStage(stageIndex) {
        if (stageIndex < this.currentStage) {
            throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element")
        }

        this.currentStage = stageIndex
    },

    element(value) {
        if (this.data.element) {
            throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector")
        }

        this.checkStage(0)
        this.data.element = value
        return this
    },

    id(value) {
        if (this.data.id) {
            throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector")
        }

        this.checkStage(1)
        this.data.id = value
        return this
    },

    class(value) {
        this.checkStage(2)
        this.data.class.push(value)
        return this
    },

    attr(value) {
        this.checkStage(3)
        this.data.attr.push(value)
        return this
    },

    pseudoClass(value) {
        this.checkStage(4)
        this.data.pseudoClass.push(value)
        return this
    },

    pseudoElement(value) {
        if (this.data.pseudoElement) {
            throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector")
        }

        this.checkStage(5)
        this.data.pseudoElement = value
        return this
    },

    _stringifyItem(items, before = '', after = '') {
        if (items === [] || items === null) {
            return ''
        }

        if (!Array.isArray(items)) {
            return before + items + after
        }

        return items.reduce((previousValue, currentValue) => previousValue + before + currentValue + after, '')
    },

    stringify() {
        let result = this._stringifyItem(this.data.element)
        result += this._stringifyItem(this.data.id, '#')
        result += this._stringifyItem(this.data.class, '.')
        result += this._stringifyItem(this.data.attr, '[', ']')
        result += this._stringifyItem(this.data.pseudoClass, ':')
        result += this._stringifyItem(this.data.pseudoElement, '::')
        return result
    }
}

function SelectorCombiner(selector1, combiner, selector2) {
    this.data = {
        selector1: selector1,
        combiner: combiner,
        selector2: selector2
    }
}

SelectorCombiner.prototype = {
    stringify() {
        return `${this.data.selector1.stringify()} ${this.data.combiner} ${this.data.selector2.stringify()}`
    }
}
const cssSelectorBuilder = {

    element: function(value) {
        return new CssSelectorBuilder().element(value)
    },

    id: function(value) {
        return new CssSelectorBuilder().id(value)
    },

    class: function(value) {
        return new CssSelectorBuilder().class(value)
    },

    attr: function(value) {
        return new CssSelectorBuilder().attr(value)
    },

    pseudoClass: function(value) {
        return new CssSelectorBuilder().pseudoClass(value)
    },

    pseudoElement: function(value) {
        return new CssSelectorBuilder().pseudoElement(value)
    },

    combine: function(selector1, combinator, selector2) {
        return new SelectorCombiner(selector1, combinator, selector2)
    },
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
