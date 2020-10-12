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
    Object.defineProperty(this, 'getArea', {
        value: function () { return this.width * this.height; }
    });
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
    //throw new Error('Not implemented');
	let o = JSON.parse(json);
	let arr = [];
	for( let p in o )
		arr.push(o[p]);
	return new proto.constructor(...arr);

	//return new proto.constructor(...Object.values(JSON.parse(json)));
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

class BaseSelector {
    constructor(value, parent) {
        this.val = value;
        this.parent = parent;
        this.__proto__ = cssSelectorBuilder;
    }

}

class Selector extends BaseSelector {
    constructor(value, parent, type, repit) {
        super(value, parent);
        this.type = type;
        this.repit = repit;

        if (this.parent && this.parent.type) {
            if (!this.repit && this.type === this.parent.type)
                throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');

            let arr = ["e", "#", ".", "[", ":", "::"];
            if (arr.indexOf(this.parent.type) > arr.indexOf(this.type))
                throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }

        this.stringify = function () {
            let res = "";
            if (this.parent && this.parent.stringify)
                res = this.parent.stringify();
            if (this.type != "e")
                res += this.type;
            res += this.val;
            if (this.type === "[")
                res += "]";
            return res;
        }
    }
}

class СombineSelector {
    constructor(selector1, combinator, selector2, parent) {
        this.selector1 = selector1;
        this.combinator = combinator;
        this.selector2 = selector2;
        this.parent = parent;
        this.type = "c";
        this.__proto__ = cssSelectorBuilder;
        this.stringify = function () {
            let res = "";
            if (this.parent && this.parent.stringify)
                res = this.parent.stringify();

            return res + selector1.stringify() + ` ${combinator} ` + selector2.stringify();
        }
    }

}


let cssSelectorBuilder = {
    element: function (value) {
        //throw new Error('Not implemented');
        return new Selector(value, this, "e", false);
    },

    id: function (value) {
        return new Selector(value, this, "#", false);
    },

    class: function (value) {
        //throw new Error('Not implemented');
        return new Selector(value, this, ".", true);
    },

    attr: function (value) {
        //throw new Error('Not implemented');
        return new Selector(value, this, "[", true);
    },

    pseudoClass: function (value) {
        //throw new Error('Not implemented');
        return new Selector(value, this, ":", true);
    },

    pseudoElement: function (value) {
        //throw new Error('Not implemented');
        return new Selector(value, this, "::", false);
    },

    combine: function (selector1, combinator, selector2) {
        //throw new Error('Not implemented');
        return new СombineSelector(selector1, combinator, selector2, this);
    }
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
