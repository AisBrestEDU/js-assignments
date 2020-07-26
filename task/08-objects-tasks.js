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
    Rectangle.prototype.getArea = function getArea() {
        return width * height;
    }

    return this;
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

class CombineSelector {
    constructor(elem1, combinator, elem2) {
        this.fullName = `${elem1.fullName} ${combinator} ${elem2.fullName}`;
    }

    stringify() {
        return this.fullName;
    }
}

class SelectorsBuilder {

    static multipleDeclarationErrorText = "Element, id and pseudo-element should not occur more then one time inside the selector";
    static wrongOrderErrorMessage = "Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element";

    constructor(name) {
        this.elementName = "";
        this.idName = "";
        this.classes = [];
        this.attrName = "";
        this.pseudoClasses = [];
        this.pseudoElementName = "";
    }

    get fullName() {
        return `${this.elementName}${this.idName}${this.classes.join("")}${this.attrName}${this.pseudoClasses.join("")}${this.pseudoElementName}`;
    }

    element(name) {
        if (!this.elementName) {
            if (!this.checkValues(this.idName)) {
                throw new Error(SelectorsBuilder.wrongOrderErrorMessage);
            }
            this.elementName = name;
            return this;
        }

        throw new Error(SelectorsBuilder.multipleDeclarationErrorText)
    }

    id(name) {
        if (!this.idName) {
            if (!this.checkValues(this.classes, this.pseudoElementName)) {
                throw new Error(SelectorsBuilder.wrongOrderErrorMessage);
            }
            this.idName = `#${name}`;
            return this;
        }

        throw new Error(SelectorsBuilder.multipleDeclarationErrorText);
    }

    class(name) {
        if (!this.checkValues(this.attrName)) {
            throw new Error(SelectorsBuilder.wrongOrderErrorMessage);
        }
        this.classes.push(`.${name}`);
        return this;
    }

    attr(name) {
        if (!this.checkValues(this.pseudoClasses)) {
            throw new Error(SelectorsBuilder.wrongOrderErrorMessage);
        }
        this.attrName = `[${name}]`;
        return this;
    }

    pseudoClass(name) {
        if (!this.checkValues(this.pseudoElementName)) {
            throw new Error(SelectorsBuilder.wrongOrderErrorMessage);
        }
        this.pseudoClasses.push(`:${name}`);
        return this;
    }

    pseudoElement(name) {
        if (!this.pseudoElementName) {
            this.pseudoElementName = `::${name}`;
            return this;
        }

        throw new Error(SelectorsBuilder.multipleDeclarationErrorText);
    }

    checkValues(...args) {
        for (let arg of args) {
            if ((arg && !Array.isArray(arg)) || (Array.isArray(arg) && arg.length)) {
                return false;
            }
        }

        return true
    }

    stringify() {
        return this.fullName;
    }
}

const cssSelectorBuilder = {

    element: function (value) {
        const element = new SelectorsBuilder(value);
        element.element(value);
        return element;
    },

    id: function (value) {
        const idElement = new SelectorsBuilder("");
        idElement.id(value);
        return idElement;
    },

    class: function (value) {
        const classElement = new SelectorsBuilder("");
        classElement.class(value);
        return classElement;
    },

    attr: function (value) {
        const attrElement = new SelectorsBuilder("");
        attrElement.attr(value);
        return attrElement;
    },

    pseudoClass: function (value) {
        const pseudoClassElement = new SelectorsBuilder("");
        pseudoClassElement.pseudoClass(value);
        return pseudoClassElement;
    },

    pseudoElement: function (value) {
        const pseudoElement = new SelectorsBuilder("");
        pseudoElement.pseudoElement(value);
        return pseudoElement;
    },

    combine: function (selector1, combinator, selector2) {
        return new CombineSelector(selector1, combinator, selector2);
    },
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
