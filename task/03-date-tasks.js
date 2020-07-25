'use strict';

const { min } = require("moment");

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date    *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
    return Date.parse(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
   return Date.parse(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
   var year = date.getFullYear();
   if (year % 4 === 0) {
      if (year % 100 === 0) {
         if (year % 400 === 0) {
            return true;
          }
       return false;
      }
       return true;
      }
    return false;
   }
/**
 * Returns the string represention of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */

function timeSpanToString(startDate, endDate) {
   let date1 = new Date(startDate),
   date2 = new Date(endDate);
   let result = "";
   let tmp;
   tmp = date2.getDay() - date1.getDay();
   if ((date2.getHours() - date1.getHours()) < 10 && tmp === 0) {
   result = '0' + (date2.getHours() - date1.getHours()) + ':';
   }
   else result = (date2.getHours() + tmp * 24) - date1.getHours() + ':';
   if ((date2.getMinutes() - date1.getMinutes()) < 10) {
   result += '0' + (date2.getMinutes() - date1.getMinutes()) + ':';
   }
   else result += (date2.getMinutes() - date1.getMinutes()) + ':';
   if ((date2.getSeconds() - date1.getSeconds()) < 10) {
   result += '0' + (date2.getSeconds() - date1.getSeconds()) + '.';
   }
   else result += (date2.getSeconds() - date1.getSeconds()) + '.';
   if ((date2.getMilliseconds() - date1.getMilliseconds()) < 10) {
   result += '00' + (date2.getMilliseconds() - date1.getMilliseconds());
   } else if ((date2.getMilliseconds() - date1.getMilliseconds()) < 100) {
   result += '0' + (date2.getMilliseconds() - date1.getMilliseconds());
   }
   else result += (date2.getMilliseconds() - date1.getMilliseconds());
   return result;
   }





/**
 * Returns the angle (in radians) between the hands of an analog clock for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 * 
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
   
   let result;
   result = (0.5 * (60 * date.getUTCHours() - 11 * date.getUTCMinutes()));
   if (result > 180) {
   result = Math.abs(360 - result);
   }
   if (date.getUTCHours() > 12 && result > 180) result = result - 180;
   result = Math.abs( Math.PI * result / 180);
   return result;
    
}


module.exports = {
    parseDataFromRfc2822: parseDataFromRfc2822,
    parseDataFromIso8601: parseDataFromIso8601,
    isLeapYear: isLeapYear,
    timeSpanToString: timeSpanToString,
    angleBetweenClockHands: angleBetweenClockHands
};
