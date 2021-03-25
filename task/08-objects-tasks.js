"use strict";

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
  (this.width = width),
    (this.height = height),
    (this.getArea = function () {
      return this.height * this.width;
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
  /* let obj = JSON.stringify(proto, function(k, v) {
      if (typeof v === 'function') {
          return '/Function(' + v.toString() + ')/';
      }
      return v;)
  })
   let parsedJSON = JSON.parse(obj, function(k, v){
       if (typeof v ==='string' && v.startsWith('myFun')) {
           v = v.substring(10, v.length - 2);
           return eval('' + v + '');
       }
    return v;
    }) */

  throw new Error("Not implemented");
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
class Element {
    constructor(value, selectorType) {             //идет в prototype
    this.el = {value : value, type : selectorType};
    Element.elements.push(this.el);
    this.count = ++Element.count;                       //персональный каунтер сука
    }

    static count = 0;
    static elements = [];
    static buffer = [];    
                    // для комбинатора

    occurences(str, val){ 
        let count = 0;
        str.match(val)? count++ : count;
        return count;
    }
    isElementOccur(elType) {
        let indexes = [];
        let count = Element.elements.filter((el) => el.type === elType).length;
        for (let i = 0; i < Element.elements.length; i++){
            if (Element.elements[i].type === elType)
            indexes.push(i);
        }
        let reducer = (accumulator, currentValue) => currentValue - accumulator;
        if (count >= 2 && indexes.reduce(reducer,0) === 1){return true}
        return false;
    }

    getElements() {
        let len = Element.elements.length;
        if (len) {
            Element.elements.filter(el => el).map(el => {
                if (el.type === 'id') {
                    el.value = `#${el.value}`
                }
                if (el.type === 'psel') {
                    el.value = `::${el.value}`
                }
                if(el.type === 'class') {
                    el.value =  `.${el.value}`;
                 }
                 if(el.type === 'attr') {
                     el.value = `[${el.value}]`;
                 }
                 if(el.type === 'pscl') {
                     el.value = `:${el.value}`;
                 }
            });
            Element.buffer = Element.elements.map(el => el.value); //копия для комбинатора
            let copy =  Element.elements.map(el => el.value).join('');

            if((this.occurences(copy,"#.*#.*") && this.isElementOccur('id')) ||
            ( this.occurences(copy,"::.*::.*") && this.isElementOccur('psel') )
            || this.isElementOccur("el"))
            {
                throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');  
            }
            Element.elements.splice(0, len);
            return copy;
        }
    }      
                                                           
    stringify() {Element.count = 0; return this.getElements();}  
    element(value){ return new Element(value,'el');}                             
    id(value) {   return new Element(value, 'id');}
    class(value) { return new Element(value, 'class'); }
    attr(value) { return new Element(value, 'attr'); }
    pseudoClass(value) { return new Element(value, 'pscl'); }
    pseudoElement(value) { return new Element(value, 'psel');}
}

class Combinator {
    constructor(selector1, combinator, selector2) {
        this.s1 = selector1
        this.combinator = combinator,
        this.s2 = selector2,
        ++Combinator.callCount;
     //   console.log(this.s1.count) 
        this.cleaner();     // <----------------- очистка предыдущего результата
    }

    getElements(len) { 
        Element.prototype.getElements();
        let buf = Element.buffer.splice(0, len).join('');
        return buf;
    
    }   

    cleaner(){ 
        if(this.s2.count - Element.count === 0)  {
         while(Combinator.elements.length){Combinator.elements.pop()} 
        Combinator.prevcount = 0;
    }      
    }

    counterAdj() {
        return Combinator.prevcount? this.s1.count - Combinator.prevcount : this.s1.count;
    }
    static callCount = 0;
    static rez = '';
    static elements = [];           //буфер для вывода конечной строки, помещаем вырезанные нужные строки из основных массивов
    static prevcount;

    stringify() { 
    if(!(this.s2 instanceof Element)) {
        if(Combinator.callCount === 1)
{
    Combinator.elements.push(this.getElements(this.s1.count))
    Combinator.elements.push(` ${this.combinator} `);
}
    if(Combinator.callCount >= 2)
    {
        Combinator.elements.push(this.getElements(this.s1.count - Combinator.prevcount))
        Combinator.elements.push(` ${this.combinator} `);
    }
    }
    if(this.s2 instanceof Element) {
        if(Combinator.callCount === 1)
        {
            Combinator.elements.push(this.getElements(this.s1.count));
            Combinator.elements.push(` ${this.combinator} `);
            Combinator.elements.push(this.getElements(this.s2.count - this.s1.count));
        }
        if (Combinator.callCount >= 2) {
        Combinator.elements.push(this.getElements(this.s1.count - Combinator.prevcount));
        Combinator.elements.push(` ${this.combinator} `);
        Combinator.elements.push(this.getElements(this.s2.count - this.s1.count));}
    }
    
    Element.count = 0; 
    Combinator.prevcount = this.s1.count;
   
    this.s2.stringify();    
                              
    Combinator.rez = Combinator.elements.map(el => el).join('');   //превращение массива в результ строку
 
    while(Element.buffer.length) {Element.buffer.pop()}
                                 
    return Combinator.rez;             
    }
}

const cssSelectorBuilder = {

    element: function(value) {
        return new Element(value, 'el');
    },

    id: function(value) { 
      return new Element(value, 'id');
    },

    class: function(value) {
        return new Element(value, 'class');
    },

    attr: function(value) {
        return new Element(value, 'attr');
    },

    pseudoClass: function(value) {
        return new Element(value, 'pscl')
    },

    pseudoElement: function(value) {
        return new Element(value, 'psel')
    },

    combine: function(selector1, combinator, selector2) { 
        return new Combinator(selector1, combinator, selector2)
    },
};


module.exports = {
  Rectangle: Rectangle,
  getJSON: getJSON,
  fromJSON: fromJSON,
  cssSelectorBuilder: cssSelectorBuilder,
};
