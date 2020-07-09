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
    let obj = Object.create(proto);
    return Object.assign(obj, JSON.parse(json));
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
        return new SelectorBuilderAssistant().element(value);
    },

    id: function(value) {
        return new SelectorBuilderAssistant().id(value);
    },

    class: function(value) {
        return new SelectorBuilderAssistant().class(value);
    },

    attr: function(value) {
        return new SelectorBuilderAssistant().attr(value);
    },

    pseudoClass: function(value) {
        return new SelectorBuilderAssistant().pseudoClass(value);
    },

    pseudoElement: function(value) {
        return new SelectorBuilderAssistant().pseudoElement(value);
    },

    combine: function(selector1, combinator, selector2) {
        return new SelectorBuilderAssistant().combine(selector1, combinator, selector2);
    },
};

class SelectorBuilderAssistant {
    constructor() {
        this.res = '';
        
        //Element, id and pseudo-element should not occur more then one time inside the selector
        this.occurrence = {element:0, id:0, pseudoElement:0};

        //Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element
        this.smallestPossible = 0;
    }
    checkOrderValidation(partNum) {
        if (partNum < this.smallestPossible){
            throw "Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element";
        } else {this.smallestPossible = partNum;}
    }
    checkFrequencyValidation(part) {
        if (this.occurrence[part] != 1) { this.occurrence[part]++; }
        else { throw "Element, id and pseudo-element should not occur more then one time inside the selector"; }
    }


    element(value) {
        this.checkOrderValidation(1);
        this.checkFrequencyValidation('element');
        this.res += value;
        return this;
    }
    id(value) {
        this.checkOrderValidation(2);
        this.checkFrequencyValidation('id');
        this.res += `#${value}`;
        return this;
    }
    class(value) {
        this.checkOrderValidation(3);
        this.res += `.${value}`;
        return this;
    }
    attr(value) {
        this.checkOrderValidation(4);
        this.res += `[${value}]`;
        return this;
    }
    pseudoClass(value) {
        this.checkOrderValidation(5);
        this.res += `:${value}`;
        return this;
    }
    pseudoElement(value) {
        this.checkOrderValidation(6);
        this.checkFrequencyValidation('pseudoElement');
        this.res += `::${value}`;
        return this;
    }
    combine(selector1, combinator, selector2) {
        this.res = `${selector1.res} ${combinator} ${selector2.res}`;
        return this;
    }
    stringify() {
        return this.res;
    }
}

module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
