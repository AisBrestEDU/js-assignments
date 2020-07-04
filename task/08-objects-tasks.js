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
function Selector() {
    this._element = null
    this._id = null
    this._class = []
    this._attr = []
    this._pseudoClass = []
    this._pseudoElement = null

    this._currentStage = 0
}

Selector.prototype.checkStage = function(stageIndex) {
    if (stageIndex < this._currentStage) {
        throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element")
    }

    this._currentStage = stageIndex
}

Selector.prototype.element = function(value) {
    if (this._element) {
        throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector")
    }

    this.checkStage(0)
    this._element = value
    return this
}

Selector.prototype.id = function(value) {
    if (this._id) {
        throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector")
    }

    this.checkStage(1)
    this._id = value
    return this
}

Selector.prototype.class = function(value) {
    this.checkStage(2)
    this._class.push(value)
    return this
}

Selector.prototype.attr = function(value) {
    this.checkStage(3)
    this._attr.push(value)
    return this
}

Selector.prototype.pseudoClass = function(value) {
    this.checkStage(4)
    this._pseudoClass.push(value)
    return this
}

Selector.prototype.pseudoElement = function(value) {
    if (this._pseudoElement) {
        throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector")
    }

    this.checkStage(5)
    this._pseudoElement = value
    return this
}

Selector.prototype._stringifyItem = function(items, before = '', after = '') {
    if (items === [] || items === null) {
        return ''
    }

    if (!Array.isArray(items)) {
        return before + items + after
    }

    return items.reduce((previousValue, currentValue) => previousValue + before + currentValue + after, '')
}

Selector.prototype.stringify = function() {
    let result = this._stringifyItem(this._element)
    result += this._stringifyItem(this._id, '#')
    result += this._stringifyItem(this._class, '.')
    result += this._stringifyItem(this._attr, '[', ']')
    result += this._stringifyItem(this._pseudoClass, ':')
    result += this._stringifyItem(this._pseudoElement, '::')
    return result
}


function SelectorCombiner(selector1, combiner, selector2) {
    this.selector1 = selector1
    this.combiner = combiner
    this.selector2 = selector2
}

SelectorCombiner.prototype.stringify = function() {
    return `${this.selector1.stringify()} ${this.combiner} ${this.selector2.stringify()}`
}

const cssSelectorBuilder = {
    element: value => new Selector().element(value),

    id: value => new Selector().id(value),

    class: value => new Selector().class(value),

    attr: value => new Selector().attr(value),

    pseudoClass: value => new Selector().pseudoClass(value),

    pseudoElement: value => new Selector().pseudoElement(value),

    combine: (selector1, combinator, selector2) =>  new SelectorCombiner(selector1, combinator, selector2),
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
