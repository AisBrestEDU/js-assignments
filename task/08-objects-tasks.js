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
        this.height = height,
        this.__proto__.getArea = () => width * height;
    
}

var rectangle = new Rectangle(10, 20);


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
    let result = JSON.parse(json);
    Object.setPrototypeOf(result, proto);
    return result;
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

const cssSelectorBuilder = (() => {
    
        class Combinator {
            //using this class to combine our css strings
            constructor(left, combinator, right) {
                this.left = left;
                this.combinator = combinator;
                this.right = right;
            }
    
            stringify() {
                return `${this.left.stringify()} ${this.combinator} ${this.right.stringify()}`;
            }
        }
    
    
        class CssSelector {
            //define the default values for fields
            constructor() {
                this.elementName = null;
                this.idName = null;
                this.pseudoElementName = null;
                this.classArr = [];//will store an array of classes cause we can have more than one class in css string. the same for two below
                this.attrArr = [];
                this.pseudoclassArr = [];
            }
    
            //this method will throw new exception if we'll try to pass the value to unique field, like id, element or pseudoelement
            uniquePropertyError() {
                throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
            }
    
            //this method will throw new exception if we'll try to put elements in wrong order
            orderingError() {
                throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
            }
    
            //method for passing unique element value to field elementName
            element(value) {
                if (this.elementName !== null) {
                    this.uniquePropertyError();
                }
    
                if (this.idName !== null || this.classArr.length > 0 ||
                    this.attrArr.length > 0 || this.pseudoclassArr.length > 0 ||
                    this.pseudoElementName !== null) {
                    this.orderingError();
                }
    
                this.elementName = value;
                return this;
            }
    
            //method for passing unique id value to field idName
            id(value) {
                if (this.idName !== null) {
                    this.uniquePropertyError();
                }
    
                if (this.classArr.length > 0 || this.attrArr.length > 0 || this.pseudoclassArr.length > 0 || this.pseudoElementName !== null) {
                    this.orderingError();
                }
    
                this.idName = value;
                return this;
            }
    
            //method for passing class value to field className
            class(value) {
    
                if (this.attrArr.length > 0 || this.pseudoclassArr.length > 0 || this.pseudoElementName !== null) {
                    this.orderingError();
                }
    
                this.classArr.push(value);
                return this;
            }
    
            //method for passing attr value to field attrName
            attr(value) {
                if (this.pseudoclassArr.length > 0 || this.pseudoElementName !== null) {
                    this.orderingError();
                }
    
                this.attrArr.push(value);
                return this;
            }
    
            //method for passing pseudoClass value to field pseudoclassName
            pseudoClass(value) {
                if (this.pseudoElementName !== null) {
                    this.orderingError();
                }
                this.pseudoclassArr.push(value);
                return this;
            }
    
            //method for passing unique pseudoElement value to field pseudoElementName
            pseudoElement(value) {
    
                if (this.pseudoElementName !== null) {
                    this.uniquePropertyError();
                }
    
                this.pseudoElementName = value;
                return this;
            }
    
            //method for parse all the values of object fields into one string
            stringify() {
                let str = this.elementName || '';
    
                if (this.idName) {
                    str += `#${this.idName}`;
                }
    
                this.classArr.forEach(elem => str += `.${elem}`);
                this.attrArr.forEach(elem => str += `[${elem}]`);
                this.pseudoclassArr.forEach(elem => str += `:${elem}`);
    
                if (this.pseudoElementName) {
                    str += `::${this.pseudoElementName}`;
                }
    
                return str;
            }
    
        }
        return {
            element : value => new CssSelector().element(value),
            id : value => new CssSelector().id(value),
            class : value => new CssSelector().class(value),
            attr : value => new CssSelector().attr(value),
            pseudoClass : value => new CssSelector().pseudoClass(value),
            pseudoElement : value => new CssSelector().pseudoElement(value),
            combine : (...args) => new Combinator(...args)
        }
    
    })();


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
