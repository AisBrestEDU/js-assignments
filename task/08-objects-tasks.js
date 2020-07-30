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

const cssSelectorBuilder = {
    element: (value) => new Selector().element(value),
    id: (value) => new Selector().id(value),
    class: (value) => new Selector().class(value),
    attr: (value) => new Selector().attr(value),
    pseudoClass: (value) => new Selector().pseudoClass(value),
    pseudoElement: (value) => new Selector().pseudoElement(value),
    combine: (selector1, combinator, selector2) =>
      new Selector().combine(selector1, combinator, selector2),
}

class Selector {
    constructor() {
        this.index_of_selector = 0
        this.elementValue = null
        this.idValue = null
        this.classes = []
        this.attributes = []
        this.pseudoClasses = []
        this.pseudoElementValue = null
        this.selectors = [
            "element",
            "id",
            "class",
            "attr",
            "pseudoClass",
            "pseudoElement",
            "combine",
        ]
        this.combinator = null
        this.selector2 = null
    }
    
    check_order(curr_elem) {
        if (this.index_of_selector > this.selectors.indexOf(curr_elem)) {
            throw new Error(
              "Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element"
            )
        }
        this.index_of_selector = this.selectors.indexOf(curr_elem)
    }
    
    element(value) {
        this.check_order("element")
        if (!this.elementValue) {
            this.elementValue = value
        } else {
            throw new Error(
              "Element, id and pseudo-element should not occur more then one time inside the selector"
            )
        }
        return this
    }
    
    id(value) {
        this.check_order("id")
        if (!this.idValue) {
            this.idValue = value
        } else {
            throw new Error(
              "Element, id and pseudo-element should not occur more then one time inside the selector"
            )
        }
        return this
    }
    
    class(value) {
        this.check_order("class")
        this.classes.push(value)
        return this
    }
    
    attr(value) {
        this.check_order("attr")
        this.attributes.push(value)
        return this
    }
    
    pseudoClass(value) {
        this.check_order("pseudoClass")
        this.pseudoClasses.push(value)
        return this
    }
    
    pseudoElement(value) {
        this.check_order("pseudoElement")
        if (!this.pseudoElementValue) {
            this.pseudoElementValue = value
        } else {
            throw new Error(
              "Element, id and pseudo-element should not occur more then one time inside the selector"
            )
        }
        return this
    }
    
    combine(selector1, symbol, selector2) {
        this.check_order("combine")
        Object.assign(this, selector1)
        this.symbol = symbol
        this.selector2 = selector2
        return this
    }
    
    stringify() {
        let result = ""
        if (this.elementValue) {
            result += this.elementValue
        }
        if (this.idValue) {
            result += "#" + this.idValue
        }
        
        this.classes.forEach((item) => (result += "." + item))
        this.attributes.forEach((item) => (result += "[" + item + "]"))
        this.pseudoClasses.forEach((item) => (result += ":" + item))
        
        if (this.pseudoElementValue) {
            result += "::" + this.pseudoElementValue
        }
        if (this.symbol && this.selector2) {
            result += " " + this.symbol + " " + this.selector2.stringify()
        }
        return result
    }
}


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
