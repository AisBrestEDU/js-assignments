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
    this.width = width,
    this.height = height,

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
        return new MySuperBaseElementSelector().element(value);
    },

    id: function(value) {
        return new MySuperBaseElementSelector().id(value);
    },

    class: function(value) {
        return new MySuperBaseElementSelector().class(value);
    },

    attr: function(value) {
        return new MySuperBaseElementSelector().attr(value);
    },

    pseudoClass: function(value) {
        return new MySuperBaseElementSelector().pseudoClass(value);
    },

    pseudoElement: function(value) {
        return new MySuperBaseElementSelector().pseudoElement(value);
    },

    combine: function(selector1, combinator, selector2) {
        return selector1.combine(combinator,selector2);
    },
};


class MySuperBaseElementSelector {
    constructor() {
        this.elementValue = '';
        this.idValue = '';
        this.classValues = [];
        this.attributeValues = [];
        this.pseudoClassValues = [];
        this.pseudoElementValue = '';
        this.order = [this.elementValue, this.idValue, this.classValues, this.attributeValues, this.pseudoClassValues, this.pseudoElementValue];
        this.combinator = '';
        this.selector2 = '';
    }

    static get duplicateSelectorUsageError() {
        return new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    static get wrongOrderError() {
        return new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    static get emptyValueError() {
        return new Error('Value of element is empty');
    }


    element(value) {
        if (this.elementValue !== '') throw MySuperBaseElementSelector.duplicateSelectorUsageError;
        if (value === undefined) throw MySuperBaseElementSelector.emptyValueError;
        if (!this.checkMethodsOrder(0)) throw MySuperBaseElementSelector.wrongOrderError;
        this.elementValue = value;
        this.order[0] = this.elementValue;
        return this;
    }

    id(value) {
        if (this.idValue !== '') throw MySuperBaseElementSelector.duplicateSelectorUsageError;
        if (value === undefined) throw MySuperBaseElementSelector.emptyValueError;
        if (!this.checkMethodsOrder(1)) throw MySuperBaseElementSelector.wrongOrderError;
        this.idValue = '#' + value;
        this.order[1] = this.idValue;
        return this;
    }

    class(value) {
        if (value === undefined) throw MySuperBaseElementSelector.emptyValueError;
        if (!this.checkMethodsOrder(2)) throw MySuperBaseElementSelector.wrongOrderError;
        this.classValues.push('.' + value);
        this.order[2] = this.classValues;
        return this;
    }

    attr(value) {
        if (value === undefined) throw MySuperBaseElementSelector.emptyValueError; 
        if (!this.checkMethodsOrder(3)) throw MySuperBaseElementSelector.wrongOrderError;
        this.attributeValues.push('[' + value + ']');
        this.order[3] = this.attributeValues;
        return this;
    }

   pseudoClass(value) {
        if (value === undefined) throw MySuperBaseElementSelector.emptyValueError;
        if (!this.checkMethodsOrder(4)) throw MySuperBaseElementSelector.wrongOrderError;
        this.pseudoClassValues.push(':' + value);
        this.order[4] = this.pseudoClassValues;
        return this;
    }

    pseudoElement(value) {
        if (this.pseudoElementValue !== '') throw MySuperBaseElementSelector.duplicateSelectorUsageError;
        if (value === undefined) throw MySuperBaseElementSelector.emptyValuerError;
        this.pseudoElementValue = '::' + value;
        this.order[5] = this.pseudoElementValue;
        return this;
    }

    checkMethodsOrder(methodType) {
        for (let i = methodType + 1; i < this.order.length; i++) {
            if (this.order[i].length > 0) {
                return false;
            } 
        } 
        return true;
    }

    combine(combinator, selector2) {
        this.combinator = combinator;
        this.selector2 = selector2.stringify();
        return this;
    }

    stringify() {
        return this.elementValue + this.idValue + 
                (this.classValues.reduce((prev, item) => prev + item, '')) + 
                (this.attributeValues.reduce((prev, item) => prev + item, '')) +
                (this.pseudoClassValues.reduce((prev, item) => prev + item, '')) +
                this.pseudoElementValue + (this.combinator.length !==0 ? ' ' + this.combinator + ' ' : '') + this.selector2;
    }
}




module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
