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
        
        Rectangle.prototype.getArea = () => this.width * this.height;
    
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

    selectorString: '',
    checkRepeating: '',
    selectorId: 1,
    
    repeatError: function(element) {
        if (this.checkRepeating.includes(element)) {
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
    },

    orderError: function(selectorId) {
        if (this.selectorId > selectorId) {
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
    },

    element: function(value) {
        let cssBuilder = Object.create(cssSelectorBuilder);
        this.repeatError('element');
        this.orderError(1);
        cssBuilder.selectorString = this.selectorString + value;
        cssBuilder.checkRepeating = this.checkRepeating + 'element';
        cssBuilder.selectorId = 1;
        return cssBuilder;
    },

    id: function(value) {
        let cssBuilder = Object.create(cssSelectorBuilder);
        this.repeatError('id');
        this.orderError(2);
        cssBuilder.selectorString = this.selectorString + '#' + value;
        cssBuilder.checkRepeating = this.checkRepeating + 'id';
        cssBuilder.selectorId = 2;
        return cssBuilder;
    },

    class: function(value) {
        let cssBuilder = Object.create(cssSelectorBuilder);
        this.orderError(3);
        cssBuilder.selectorString = this.selectorString + '.' + value;
        cssBuilder.selectorId = 3;
        return cssBuilder;
    },

    attr: function(value) {
        let cssBuilder = Object.create(cssSelectorBuilder);
        this.orderError(4);
        cssBuilder.selectorString = this.selectorString + `[${value}]`;
        cssBuilder.selectorId = 4;
        return cssBuilder;
    },

    pseudoClass: function(value) {
        let cssBuilder = Object.create(cssSelectorBuilder);
        this.orderError(5);
        cssBuilder.selectorString = this.selectorString + `:${value}`;
        cssBuilder.selectorId = 5;
        return cssBuilder;
    },

    pseudoElement: function(value) {
        let cssBuilder = Object.create(cssSelectorBuilder);
        this.repeatError('pseudo-element');
        this.orderError(6);
        cssBuilder.selectorString = this.selectorString + `::${value}`;
        cssBuilder.checkRepeating = this.checkRepeating + 'pseudo-element';
        cssBuilder.selectorId = 6;
        return cssBuilder;
    },

    combine: function(selector1, combinator, selector2) {
        let cssBuilder = Object.create(cssSelectorBuilder);
        cssBuilder.selectorString = `${selector1.selectorString} ${combinator} ${selector2.selectorString}`;
        return cssBuilder;
    },

    stringify: function () {
        return this.selectorString;
    }
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
