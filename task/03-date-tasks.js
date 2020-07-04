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
    var d = new Date(date);
    let year =d.getFullYear();
    let isLeap = true;
   if (year % 4 != 0){
       isLeap = false;
   }
   else if ( year % 100 != 0){
       isLeap = true;
   }
   else if (year % 400 != 0){
        isLeap = false;
   }

   return isLeap;
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
    var start = new Date(startDate);
    var end = new Date(endDate);

    var dd = end.getDay() - start.getDay();
    var hh = end.getHours() - start.getHours() + dd * 24;
    var mm = end.getMinutes() - start.getMinutes();
    var ss = end.getSeconds() - start.getSeconds();
    var sss = end.getMilliseconds() - start.getMilliseconds();

    var diff = "" +  ConvertHMS(hh) + ":" + ConvertHMS(mm) + ":" + ConvertHMS(ss) + "." + ConvertMillisec(sss);
    return diff;
}

function ConvertMillisec(value, countNull) {
    if (value.toString().length === 1)
        return "00" + value;
    else if ( value.toString().length === 2 )
    {
        return "0" + value;
    }
    else{
        return value;
    }
}


function ConvertHMS(value, countNull) {
    return value.toString().length === 1? "0" + value : value;

}


/**
 * Returns the angle (in radians) between the hands of an analog clock for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 * 
 * @param {Date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
    var dateWork = new Date(date);
    var h = dateWork.getHours() - 3;
    var m = dateWork.getMinutes();

    if (dateWork.getHours() === 0){
        h = 21
    }
    else if (dateWork.getHours() === 1 ){
        h = 22;
    }
    else if (dateWork.getHours() === 2 ){
        h = 23;
    }

    if (h <0 || m < 0 || h >12 || m > 60){
        h -= 12;
    }



    if (h === 12){
        h = 0;
    }
    if (m === 60){
        m = 0;
        h += 1;
        if (h > 12)
            h = h - 12;
    }

    let hourAngle = 0.5 * (h * 60 + m);
    let minAngle = 6 * m;

    let angle = Math.abs(hourAngle - minAngle);
    angle = Math.min(angle, 360 - angle);
    let radianAngle = angle * (Math.PI/180);
    return radianAngle;
}


module.exports = {
    parseDataFromRfc2822: parseDataFromRfc2822,
    parseDataFromIso8601: parseDataFromIso8601,
    isLeapYear: isLeapYear,
    timeSpanToString: timeSpanToString,
    angleBetweenClockHands: angleBetweenClockHands
};
