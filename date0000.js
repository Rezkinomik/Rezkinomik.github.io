/**
* NewSys(TM) Date Javascript Library
*
* This library provides utility functions for calculating and
* displaying date information from the perspective of the end
* user, as opposed to when NewSys rendered a document.
*
* @author Patrick O'Lone <polone@townnews.com>
* @copyright TownNews.com (C) 2003-2004
* @version 1.4
*/

/**
* Show today's date in a human readable format
*
* @param integer nID
* The unique ID that will determine "which" class will dynamically
* be updated. This is needed in case multiple instances occur.
*
* @access public
*/
function showCurrentDate( nID )
{
	// The textual name of days in the week

	var rgDayNames = new Array( "Ahad", "Isnin", "Selasa",
		                        "Rabu", "Khamis",
		                        "Jumaat", "Sabtu" );

    // The textual name of months of the year

    var rgMonthNames = new Array( "Januari", "Februari", "Mac", "April",
		                          "Mei", "Jun", "Julai", "Ogos", "September",
		                          "Oktober", "November", "December");
    
	var objDate = new Date();
	var nYear = (objDate.getYear() < 200) ? objDate.getYear() + 1900 : objDate.getYear();

    var szDate =  rgDayNames[objDate.getDay()];
	szDate += ", " + rgMonthNames[objDate.getMonth()];
	szDate += " " + objDate.getDate();
	szDate += ", " + nYear;

	newsysTimeOutput('date_java' + nID, 'showCurrentDate('+nID+')', szDate);

}

/**
* Show today's current time, based on the end-user's location
*
* This feature performs a real-time clock calculation in browsers
* that support DHTML features. Every 60 seconds, the clock will
* automatically update the timer. The feature is supported in
* IE 4.0+ and Netscape 6.0+. Other browsers will render a static
* time value.
*
* @param integer nID
* The unique ID that will determine "which" class will dynamically
* be updated. This is needed in case multiple instances occur.
*
* @access public
*/
function showCurrentTime( nID )
{
    var objDate = new Date();
    var nHours = ((objDate.getHours() < 1) ? objDate.getHours()+12 : objDate.getHours());
    var nTimeout = 60;

    var szTime = "" + ((nHours >12) ? nHours -12 : nHours);
    szTime += ((objDate.getMinutes() < 10) ? ":0" : ":") + objDate.getMinutes();
    szTime += (nHours >= 12) ? " P.M." : " A.M.";

    newsysTimeOutput('time_java' + nID, 'showCurrentTime('+nID+')', szTime);
}

/**
* Browser-independent real-time update utility for time functions
*
* This function selectively decides (based on the browser of the
* user), which output is needed to create the element needed to
* perform real-time clock operations.
*
* @param string szID
* The unique ID of the object instance that will be used.
*
* @param string szFunction
* The name of the function that will passed to setTimeout()
*
* @param string szUpdatedText
* The text that will be used to update the specified SPAN element
* as denoted by szID.
*
* @access private
*/
function newsysTimeOutput( szID, szFunction, szUpdatedText )
{
	var nTimeout = 60000;
	var objDate = new Date();

    // If the document.all object is supported, used this to provide a "real-time"
	// clock on the site (I.E. 4.0+).

    if (document.all) {

		if (document.all[szID] == null) {

           document.write('<SPAN id="' + szID + '"></SPAN>');
		   nTimeout = nTimeout - (objDate.getSeconds()*1000);

		}

		document.all[szID].innerHTML = szUpdatedText;
		setTimeout(szFunction, nTimeout);

    // If document.getElementById object is supported, used this to provide a "real-time"
	// clock on the site (Netscape 6.0+)

    } else if (document.getElementById) {
		
		if (document.getElementById(szID) == null) {

           document.write('<SPAN id="' + szID + '"></SPAN>');
		   nTimeOut = nTimeout - objDate.getSeconds()*1000;

		}
		document.getElementById(szID).innerHTML = szUpdatedText;
		setTimeout(szFunction, nTimeout);

    // We don't care about older browsers, just output the time using the standard
	// method :-)

    } else {

		document.write(szUpdatedText);

	}
}