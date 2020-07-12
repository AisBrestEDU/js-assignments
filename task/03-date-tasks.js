'use strict';

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
   return new Date(value);
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
   return new Date(value);
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
   const year = new Date(date).getFullYear();
   if (!(year % 4)) {
   } else {
      return false;
   };
   if (year % 100) {
      return true;
   } else {
      if (!(year % 400)) {
         return true;
      } else {
         return false;
      }
   }
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

   let passedMilliseconds = endDate - startDate;

   let dateComponents = [];

   const hours = Math.trunc(passedMilliseconds / 3600000);
   dateComponents.push(hours);


   const minutes = Math.trunc((passedMilliseconds - hours * 3600000) / 60000);
   dateComponents.push(minutes);

   const seconds = Math.trunc((passedMilliseconds - hours * 3600000 - minutes * 60000) / 1000);
   dateComponents.push(seconds);

   let milliseconds = passedMilliseconds - hours * 3600000 - minutes * 60000 - seconds * 1000;
   dateComponents.push(milliseconds);


   dateComponents = dateComponents.map((dateComponent, index, array) => {
      if (dateComponent < 10 && index !== array.length - 1) {
         return `0${dateComponent}`;
      } else if (index === array.length - 1) {
         if (dateComponent < 10) {
            return `00${milliseconds}`;
         } else if (dateComponent > 9 && dateComponent < 100) {
            return `0${milliseconds}`
         }
      }
      return dateComponent;
   })

   return `${dateComponents[0]}:${dateComponents[1]}:${dateComponents[2]}.${dateComponents[3]}`;
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
   const dateRes = new Date(date);
   let angle = 0.5 * (60 * dateRes.getUTCHours() - 11 * dateRes.getUTCMinutes());
   if (angle > 180) {
      angle = 360 - angle;
      if (angle < 0) {
         angle = angle * (-1);
      }
      if (angle > 180) {
         angle = 360 - angle;
      }
   }
   return Math.PI / 180 * angle;
}


module.exports = {
   parseDataFromRfc2822: parseDataFromRfc2822,
   parseDataFromIso8601: parseDataFromIso8601,
   isLeapYear: isLeapYear,
   timeSpanToString: timeSpanToString,
   angleBetweenClockHands: angleBetweenClockHands
};
