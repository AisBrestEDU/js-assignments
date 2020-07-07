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
// }

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
    return new MySuperBaseElementSelector().element(value);
  },

  id: function (value) {
    return new MySuperBaseElementSelector().id(value);
  },

  class: function (value) {
    return new MySuperBaseElementSelector().class(value);
  },

  attr: function (value) {
    return new MySuperBaseElementSelector().attr(value);
  },

  pseudoClass: function (value) {
    return new MySuperBaseElementSelector().pseudoClass(value);
  },

  pseudoElement: function (value) {
    return new MySuperBaseElementSelector().pseudoElement(value);
  },

  combine: function (selector1, combinator, selector2) {
    return selector1.combine(combinator, selector2);
  },
};

class MySuperBaseElementSelector {
  constructor() {
    this.elementValue = '';
    this.idValue = '';
    this.classValue = [];
    this.attrValue = [];
    this.pseudoClassValue = [];
    this.pseudoElementValue = '';
    this.output = [
      this.elementValue,
      this.idValue,
      this.classValue,
      this.attrValue,
      this.pseudoClassValue,
      this.pseudoElementValue,
    ];
    this.combinator = '';
    this.selector = '';
  }

  static get duplicateUsageError() {
    return new Error(
      'Element, id and pseudo-element should not occur more then one time inside the selector'
    );
  }

  static get orderError() {
    return new Error(
      'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
    );
  }

  element(value) {
    if (this.elementValue !== '')
      throw MySuperBaseElementSelector.duplicateUsageError;
    if (!this.checkOrder(0)) throw MySuperBaseElementSelector.orderError;
    this.elementValue = value;
    this.output[0] = this.elementValue;
    return this;
  }

  id(value) {
    if (this.idValue !== '')
      throw MySuperBaseElementSelector.duplicateUsageError;
    if (!this.checkOrder(1)) throw MySuperBaseElementSelector.orderError;
    this.idValue = `#${value}`;
    this.output[1] = this.idValue;
    return this;
  }

  class(value) {
    if (!this.checkOrder(2)) throw MySuperBaseElementSelector.orderError;
    this.classValue.push(`.${value}`);
    this.output[2] = this.classValue;
    return this;
  }

  attr(value) {
    if (!this.checkOrder(3)) throw MySuperBaseElementSelector.orderError;
    this.attrValue.push(`[${value}]`);
    this.output[3] = this.attrValue;
    return this;
  }

  pseudoClass(value) {
    if (!this.checkOrder(4)) throw MySuperBaseElementSelector.orderError;
    this.pseudoClassValue.push(`:${value}`);
    this.output[4] = this.pseudoClassValue;
    return this;
  }

  pseudoElement(value) {
    if (this.pseudoElementValue !== '')
      throw MySuperBaseElementSelector.duplicateUsageError;
    this.pseudoElementValue = `::${value}`;
    this.output[5] = this.pseudoElementValue;
    return this;
  }

  combine(combinator, selector) {
    this.combinator = combinator;
    this.selector = selector.stringify();
    return this;
  }

  stringify() {
    return (
      this.output
        .map((val) => {
          return Array.isArray(val) ? val.join('') : val;
        })
        .join('') +
      (this.combinator !== '' ? ` ${this.combinator} ` : '') +
      this.selector
    );
  }

  checkOrder(position) {
    for (let i = position + 1; i < this.output.length; i++) {
      if (this.output[i].length > 0) {
        return false;
      }
    }
    return true;
  }
}

module.exports = {
  Rectangle: Rectangle,
  getJSON: getJSON,
  fromJSON: fromJSON,
  cssSelectorBuilder: cssSelectorBuilder,
};
