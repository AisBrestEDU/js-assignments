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
        return new SelectorBuilderClass().element(value);
    },

    id: function (value) {
        return new SelectorBuilderClass().id(value);
    },

    class: function(value) {
        return new SelectorBuilderClass().class(value);
    },

    attr: function(value) {
        return new SelectorBuilderClass().attr(value);
    },

    pseudoClass: function(value) {
        return new SelectorBuilderClass().pseudoClass(value);
    },

    pseudoElement: function(value) {
        return new SelectorBuilderClass().pseudoElement(value);
    },

    combine: function(selector1, combinator, selector2) {
        return selector1.combine(combinator,selector2);
    },
};
class SelectorBuilderClass{
    constructor() {
        this.layers = new Array(6).fill(false);
        this.stack = [];
        this.contains = {
            element: undefined,
            id: undefined,
            classes: [],
            attributes: [],
            pseudoClasses: [],
            pseudoElement: undefined
        };
    }
    justifyLayer(layer) {
        let cur = this.layers.slice(layer + 1)

        const layerAdded = (layerAdded) => layerAdded
        
        let isR = cur.some(layerAdded)

        if (isR) 
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element')

        this.layers[layer] = true
    }

    element(value) {
        this.justifyLayer(0);
        if (this.contains.element === undefined) {
            this.contains.element = value;
            return this;
        } else {
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
    }

    id(value) {
        this.justifyLayer(1);
        if (this.contains.id === undefined) {
            this.contains.id = value;
            return this;
        } else {
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
    }

    class(value) {
        this.justifyLayer(2);
        
        this.contains.classes.push(value);
        return this;
    }

    attr(value) {
        this.justifyLayer(3);
        this.contains.attributes.push(value);
        return this;
    }

    pseudoClass(value) {
        this.justifyLayer(4);
        this.contains.pseudoClasses.push(value);
        return this;
    }

    pseudoElement(value) {
        this.justifyLayer(5);
        if (this.contains.pseudoElement === undefined) {
            this.contains.pseudoElement = value;
            return this;
        } else {
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
    }

    combine(combinator, combinable) {
        this.stack.push({combinator: combinator, element: combinable});
        return this;
    }

    stringify() {
        return (  
            (this.contains.element !== undefined ? 
             this.contains.element : '') +

            (this.contains.id !== undefined ? 
            '#' + this.contains.id : '') +

            (this.contains.classes.length ? 
            '.' + this.contains.classes.join('.') : '') +
            
            (this.contains.attributes.length ? 
            this.contains.attributes.map(elem => `[${elem}]`).join('') : '') +

            (this.contains.pseudoClasses.length ? 
            ':' + this.contains.pseudoClasses.join(':') : '') +

            (this.contains.pseudoElement !== undefined ? 
            '::' + this.contains.pseudoElement : '') +

            (this.stack.length ? 
            this.stack.map(elem => ` ${elem.combinator} ` + elem.element.stringify()).join('') : '')
        
        )
    }
};



module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
