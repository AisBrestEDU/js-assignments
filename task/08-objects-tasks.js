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
    // throw new Error('Not implemented');
    let k =JSON.parse(json)
    let t = Object.setPrototypeOf(JSON.parse(json), proto);
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
class cssBuilder {
    constructor(){
        this.order = 0,
        this._element = undefined,
        this._id = undefined,
        this._classes = [],
        this._attrs = [],
        this._pseudoClasses = [],
        this._pseudoElement = undefined,
        this._selectors = [],
        this.oneTimeError = 'Element, id and pseudo-element should not occur more then one time inside the selector'
        this.orderError = 'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
    }

    
    checkOrder(order) {
        if (this.order > order) throw new Error(this.orderError);               
        this.order = order;
    }

    element(val) {
        if (this._element)
            throw new Error(this.oneTimeError)

        this.checkOrder(1);
        this._element = val
        return this;
    }

    id(val){
        if (this._id )
            throw new Error(this.oneTimeError)

        this.checkOrder(2)
        this._id = val
        return this
    }
    class(val) {
        this.checkOrder(3)
        this._classes.push(val)        
        return this
    }
    attr(val) {
        this.checkOrder(4)
        this._attrs.push(val)        
        return this
    }

    pseudoClass(val) {
        this.checkOrder(5)
        this._pseudoClasses.push(val)
        return this
    }

    pseudoElement(val) {
        if (this._pseudoElement )
            throw new Error(this.oneTimeError)

        this.checkOrder(6)
        this._pseudoElement = val
        return this
    }

    combine(combinator, selector2) {
        this._selectors.push({ combinator, selector2 })
        return this
    }    

    stringify() {
        return  (
            (this._element ? `${this._element}` : '')
            +(this._id ? `#${this._id}` : '') 
            +(this._classes.length ? '.' + this._classes.join('.') : '') +
            (this._attrs.length ? this._attrs.map(elem => `[${elem}]`).join('') : '') +
            (this._pseudoClasses.length ? ':' + this._pseudoClasses.join(':') : '') +
            (this._pseudoElement !== undefined ? '::' + this._pseudoElement : '') 
            + (this._selectors.length ? this._selectors.map(elem => ` ${elem.combinator} ` + elem.selector2.stringify()).join('') : '')
        )        
    }

}

const cssSelectorBuilder = {

    element: function(value) {
        return new cssBuilder().element(value)
    },

    id: function(value) {
        return new cssBuilder().id(value)
    },

    class: function(value) {
        return new cssBuilder().class(value)
    },

    attr: function(value) {
        return new cssBuilder().attr(value)
    },

    pseudoClass: function(value) {
        return new cssBuilder().pseudoClass(value)
    },

    pseudoElement: function(value) {
        return new cssBuilder().pseudoElement(value)
    },

    combine: function(selector1, combinator, selector2) {
        return selector1.combine(combinator, selector2);
    },
};

module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
