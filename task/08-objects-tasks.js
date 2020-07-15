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
        Rectangle.prototype.getArea = () => this.width * this.height
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
    return JSON.stringify(obj)}


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
 *1q2w3e
 1 
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

class MySuperSelector {
    constructor(value, part){
        this.value = value
        this.part = part
    }
    element(value){
        if(this.part == 'element') {
            throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector")
        }else if(this.part != undefined){
            throw new Error ("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element")
        }
        return new MySuperSelector(this.value, 'element')
    }
    id(value){
        if(this.part == 'id') {
            throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector")
        }else if(this.part != "element") {
            throw new Error ("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element")
        }
        this.value = this.value + "#"+ value;
        return new MySuperSelector(this.value, 'id')
        
    }
    class(value) {
        if(this.part != "element" && this.part != "id" && this.part != "class"){
            throw new Error ("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element")
        }
        this.value = this.value + "." + value;
        return new MySuperSelector(this.value, 'class');
    }

    attr(value) {
        if(this.part != "element" && this.part != "id" && this.part != "class" && this.part != "attr") {
            throw new Error ("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element")
        }
        this.value = this.value + "[" + value + "]";
        return new MySuperSelector(this.value, 'attr')
    }

    pseudoClass(value) {
        if(this.part == 'pseudoElement') {
            throw new Error ("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element") 
        }
        this.value = this.value + ":" + value;
        return new MySuperSelector(this.value, 'pseudoClass')
    }

    pseudoElement(value) {
        if(this.part == 'pseudoElement') {
            throw new Error("Element, id and pseudo-element should not occur more then one time inside the selector")
        }
        this.value = this.value + "::" + value;
        return new MySuperSelector(this.value, 'pseudoElement')
    }
    
    stringify() { 
        
        return this.value.toString()
    }
} 
const cssSelectorBuilder = {
    
    element: function(value) {
        return new MySuperSelector(value, 'element');
    },

    id: function(value) {
        return new MySuperSelector("#"+ value, 'id');
    },

    class: function(value) {
        return new MySuperSelector("." + value, 'class');
    },

    attr: function(value) {
        return new MySuperSelector("[" + value + "]", 'attr');
    },

    pseudoClass: function(value) {
        return new MySuperSelector(":" + value, 'pseudoClass');
    },

    pseudoElement: function(value) {
        return new MySuperSelector("::" + value, "pseudoElement");
    },

    combine: function(selector1, combinator, selector2) {
        let sel1 = selector1.stringify();
        let sel2 = selector2.stringify();
        let result = sel1 + " "+ combinator + " " + sel2
        return new MySuperSelector(result)
    }
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
