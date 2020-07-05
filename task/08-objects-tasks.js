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

    element: function (value) {
        if (this.elVal) 
            throw new Error(
                'Element, id and pseudo-element should not occur more then one time inside the selector'
            )
        if (this.idVal) {
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
            )
        }
        const copVal = { ...this }
        if(copVal.elVal)
            return 'Error!'  
        else{
            copVal.elVal = ''
            copVal.elVal += `${value}`
            return copVal
        }
    },

    id: function (value) {
        if (this.idVal) 
            throw new Error(
                'Element, id and pseudo-element should not occur more then one time inside the selector'
            )
        if (this.classVal || this.peVal) 
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
            )
        const copVal = { ...this }
        copVal.idVal = ''
        copVal.idVal += `#${value}`
        return copVal;
    },

    class: function(value) {
        if (this.attrVal) 
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
            )
        const copVal = { ...this }
        if(copVal.classVal)
          copVal.classVal += `.${value}`
        else {
          copVal.classVal = ''
          copVal.classVal += `.${value}`
        }
        return copVal
    },

    attr: function(value) {
        if (this.pcVal) 
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
            )
        const copVal = { ...this }
        copVal.attrVal = '';
        copVal.attrVal += `[${value}]`
        return copVal
    },

    pseudoClass: function(value) {
        if (this.peVal) 
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
            );
        const copVal = { ...this }
        if(copVal.pcVal)
        {
            copVal.pcVal += `:${value}`
            return copVal
        }
        else
        {
            copVal.pcVal = `:${value}`
            return copVal
        }
        
    },

    pseudoElement: function(value) {
        if (this.peVal) 
            throw new Error(
                'Element, id and pseudo-element should not occur more then one time inside the selector'
            )
        const copVal = { ...this }
        if(copVal.peVal){
            return copVal
        }
        else{
            copVal.peVal = '';
            copVal.peVal += `::${value}`
            return copVal
        }      
    },

    combine: function(selector1, combinator, selector2) {
        const copVal = { ...this }
        const combVal = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`
        if(copVal.value)
            copVal.value += combVal
        else{
            copVal.value = '';
            copVal.value += combVal
        }
        return copVal
    },

    stringify() {
        if (this.value) 
          return this.value;

        let outputStr = '';

        if (this.elVal) outputStr += this.elVal;
        if (this.idVal) outputStr += this.idVal;
        if (this.classVal) outputStr += this.classVal;
        if (this.attrVal) outputStr += this.attrVal;
        if (this.pcVal) outputStr += this.pcVal;
        if (this.peVal) outputStr += this.peVal;

        return outputStr;
    }
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
