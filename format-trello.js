// ==UserScript==
// @name         Format Trello
// @namespace    http://tampermonkey.net/
// @version      0.21
// @description  
// @author       Dale de Silva www.ublik-om.net
// @match        https://trello.com/*
// @grant        none
// ==/UserScript==


// Notes about development
//////////////////////////
// This script uses jquery annotation but doesn't "require" jquery as Trello already does.
//////////////////////////


/*
19/09/2019
- Adjustments to page change observer so that it fires immediately when started.
- Change to @match property to include all of Trello as clicking into a board doesn't cause a recheck for scripts unless you manually refresh
*/


var pageChangeTimeOutID;
var pageStartTimerID;




function loadIcons() {
	'use strict';
	
	let htmlStr = '<script src="https://kit.fontawesome.com/c0535646a5.js" crossorigin="anonymous"></script>';
	
	// add all the created css to the document
    $("head").append(htmlStr);
}

function injectCss() {
    'use strict';

    let customCss = "";

    // TODO: create buttons to shrink and expand any list
    // TODO: create separate buttons to also show/hide: labels, users, and badges
    // TODO: button to hide image previews
    customCss += ".list-card-cover {";
    customCss += "   height: 0px !important;";
    customCss += "}";
    // TODO: Card cover height should be 0 and javascript should check if there is actually an image in there and increase it to 1px

    // absolutely position rollover preview of card image (left or right depending on where mouse is

    // All options should use browser memory to remember how you last left each one

    // TODO: create an upcoming filter as well as the done filter (like "goals", or "upcoming", or "potential")
    // can you tell it to search for multiple? - to help when one of your boards suits "goal" but another is better with "potential"

    // TODO: create global button to hide upcoming lists entirely
    // TODO: create global button to hide done lists entirely

    // TODO: ability to turn on progress bars for cards (collapse checklists or stack)

    // TODO: create an abanded/ditched filter

    // TODO: Animation that can be turned on and off (for transitions from normal states to custom and when custom switches are pressed, etc.

    // TODO: Shrink labels to 2 pixels in shrunken lists
    // TODO: Shrink label text too

    // Add class for shrunken lists so they can be styled together (across type)



    //////////////////////
    // Affect Goal Lists

    // shrink lists
    customCss += ".future {";
    customCss += "   width: 150px !important;";
    //customCss += "   opacity: 0.8 !important;";
    customCss += "}";

    // edit list color
    customCss += ".future .list {";
    //customCss += "   background-color: #a3b6c5;";
    customCss += "   background-color: #dfe3e6;";
    customCss += "}";

    // shrink head text
    customCss += ".future .js-list-name-input {";
    customCss += "   font-size: 0.7em;";
    customCss += "   height: 40px;";
    customCss += "   line-height: 1.3em;";
    customCss += "   color: #ddd;";
    customCss += "}";

    // edit card color
    customCss += ".future .js-card-details {";
 //   customCss += "   background-color: #bacbd7;";
    customCss += "   background-color: #eee;";
    customCss += "}";

    // edit card titles
    customCss += ".future .js-card-name {";
    customCss += "   font-size: 0.7em;";
    customCss += "   line-height: 1.3em;";
    customCss += "}";

    // shrink add new card text
    customCss += ".future .js-open-card-composer {";
    customCss += "   font-size: 0.7em;";
    customCss += "}";

    // shrink labels
    customCss += ".abandoned .js-card-labels {";
    customCss += "   overflow: hidden;";
    customCss += "   font-size: 0.7em;";
    customCss += "}";

    // shrink badges and due dates
    customCss += ".abandoned .badge-text {";
    customCss += "   overflow: hidden;";
    customCss += "   font-size: 0.7em;";
    customCss += "}";


    ////////////////////////
    // Affect Done Lists

    // shrink lists
    customCss += ".done {";
    customCss += "   width: 150px !important;";
    //customCss += "   opacity: 0.8 !important;";
    customCss += "}";

    // edit list color
    customCss += ".done .list {";
    //customCss += "   background-color: #a3c3a8;";
    customCss += "   background-color: #666;";
    customCss += "}";

    // shrink head text
    customCss += ".done .js-list-name-input {";
    customCss += "   font-size: 0.7em;";
    customCss += "   height: 40px;";
    customCss += "   line-height: 1.3em;";
    customCss += "   color: #eee;";
    customCss += "}";

    // edit card color
    customCss += ".done .js-card-details {";
    //customCss += "   background-color: #bbd7ba;";
    customCss += "   background-color: #777;";
    customCss += "}";

    // edit card titles
    customCss += ".done .js-card-name {";
    customCss += "   font-size: 0.7em;";
    customCss += "   line-height: 1.3em;";
    customCss += "   color: #ccc;";
    customCss += "}";

    // shrink add new card text
    customCss += ".done .js-open-card-composer {";
    customCss += "   font-size: 0.7em;";
    customCss += "}";

    // hide users assigned to the cards
    customCss += ".done .js-list-card-members {";
    customCss += "   display: none;";
    customCss += "}";

    // hide labels
    customCss += ".done .js-card-labels {";
    customCss += "   display: none;";
    customCss += "}";

    // hide badges and due dates
    customCss += ".done .badges {";
    customCss += "   display: none;";
    customCss += "}";



    //////////////////////////
    // Affect Brain Dump List

    // shrink lists
    customCss += ".brain-dump {";
    customCss += "   width: 150px !important;";
    customCss += "}";

    // edit list color
    customCss += ".brain-dump .list {";
    customCss += "   background: none;";
    customCss += "}";

    // shrink head text
    customCss += ".brain-dump .js-list-name-input {";
    customCss += "   font-size: 0.7em;";
    customCss += "   height: 40px;";
    customCss += "   line-height: 1.3em;";
    customCss += "   color: #ddd;";
    customCss += "}";

    // edit card color
    customCss += ".brain-dump .list-card {";
    customCss += "   opacity: 0.4;";
    customCss += "}";

    // edit card titles
    customCss += ".brain-dump .js-card-name {";
    customCss += "   color: #444;";
    customCss += "   font-size: 0.7em;";
    customCss += "   line-height: 1.3em;";
    customCss += "}";

    // shrink add new card text
    customCss += ".brain-dump .js-open-card-composer {";
    customCss += "   font-size: 0.7em;";
    customCss += "}";

    // shrink labels
    customCss += ".abandoned .js-card-labels {";
    customCss += "   overflow: hidden;";
    customCss += "   font-size: 0.7em;";
    customCss += "}";

    // shrink badges and due dates
    customCss += ".abandoned .badge-text {";
    customCss += "   overflow: hidden;";
    customCss += "   font-size: 0.7em;";
    customCss += "}";



    //////////////////////////
    // Affect Abandon List

    // shrink lists
    customCss += ".abandoned {";
    customCss += "   width: 150px !important;";
    customCss += "}";

    // edit list color
    customCss += ".abandoned .list {";
    customCss += "   background: none;";
    customCss += "}";

    // shrink head text
    customCss += ".abandoned .js-list-name-input {";
    customCss += "   font-size: 0.7em;";
    customCss += "   height: 40px;";
    customCss += "   line-height: 1.3em;";
    customCss += "   color: #ddd;";
    customCss += "}";

    // edit card color
    customCss += ".abandoned .list-card {";
    customCss += "   background-color: #111;";
    customCss += "   opacity: 0.4;";
    customCss += "}";

    // edit card titles
    customCss += ".abandoned .js-card-name {";
    customCss += "   color: #888;";
    customCss += "   font-size: 0.7em;";
    customCss += "   line-height: 1.3em;";
    customCss += "}";

    // shrink add new card text
    customCss += ".abandoned .js-open-card-composer {";
    customCss += "   font-size: 0.7em;";
    customCss += "}";

    // shrink labels
    customCss += ".abandoned .js-card-labels .card-label {";
    customCss += "   overflow: hidden;";
    customCss += "   font-size: 0.7em;";
    customCss += "}";

    // shrink badges and due dates
    customCss += ".abandoned .badge-text {";
    customCss += "   overflow: hidden;";
    customCss += "   font-size: 0.7em;";
    customCss += "}";




    // add all the created css to the document
    $("head").append("<style type='text/css'>" + customCss + "</style>");


}


function interpretLists() {
    'use strict';



    // TODO: Rewrite and move this inside the previous list loop
    $(".list-header h2").each( function() {

        let $title = $(this);

        // bail if it's not a "done" list
        let titleText = $title.text().toUpperCase();
        if( titleText.indexOf("DONE") >= 0 || titleText.indexOf("FINISHED") >= 0 || titleText.indexOf("COMPLETE") >= 0) {
            $title.closest(".js-list").addClass("done");

        } else if( titleText.indexOf("GOAL") >= 0 || titleText.indexOf("FUTURE") >= 0 ) {
            $title.closest(".js-list").addClass("future");

        } else if( titleText.indexOf("DITCH") >= 0 || titleText.indexOf("ABANDON") >= 0 ) {
             $title.closest(".js-list").addClass("abandoned");

        } else if( titleText.indexOf("DUMP") >= 0 ) {
            $title.closest(".js-list").addClass("brain-dump");

        }


    });



}



function createListButtons() {
	'use strict';
	
	let htmlStr = "";
	
	
	// Use to...
	// - Show labels normally
	// - Show labels as coloured bar on side
	// - Hide labels
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-tag'></i></span></a>";	
	// Global button...
	// - Overides this
	
	// User visibility always hidden unless global list size settings turned off
	
	// Use to...
	// - Show due dates normally
	// - Show colour & icon only for due soon and overdue
	// - Hide due dates
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-clock'></i></span></a>";
	// Global button...
	// - Overides this
	
	// Use to...
	// - Show any badges other than due dates and users, and checklists normally
	// - Hide any badges other than due dates and users, and display checklists as progress bars
	// - Hide any badges and checklists other than due dates and users
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-comment-alt'></i></span></a>";
	
	// Use to..
	// - Show inline image previews
	// - Reduce images previews to a small horizontal bar
	// - Hide image previews
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-image'></i></span></a>";
	// Global button...
	// - Overides this only if list is not set to shrink ????
	
	// Use to...
	// - Show lists normally
	// - Shrink list
	// - Shrink list and darken
	// - Shrink list and fade
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fab fa-trello'></i></span></a>";
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-poll fa-rotate-180'></i></span></a>";
	// Global button...
	// - Overides all these
	
	
	
	// apply as button set that appears to right of 3 dots in list when clicked
	
}





function createHeaderButtons() {
	'use strict';
	
	let htmlStr = "";
	
	
	// Use to...
	// - Show labels normally
	// - Show as customised in list
	// - Hide labels
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-tag'></i></span></a>";	
	
	// Use to...
	// - Show users assigned to cards normally
	// - Show as customised in list
	// - Hide users assigned to cards
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-portrait'></i></span></a>";
	
	// Use to...
	// - Show due dates normally
	// - Show as customised in list
	// - Hide due dates
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-clock'></i></span></a>";
	
	// Use to...
	// - Show any badges other than due dates and users, and checklists normally
	// - Show as customised in list
	// - Hide any badges and checklists other than due dates and users
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-comment-alt'></i></span></a>";
	
	// Use to..
	// - Show inline image previews normally
	// - Show as customised in list
	// - Hide image previews
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-image'></i></span></a>";
	
	// Use to...
	// - Show lists in original size, colours, visibility, and cards in original settings also
	// - Show lists in custom size, colours, and visibility, and cards with custom lists settings
	// - Show lists in custom size and colours, but original visibility, and cards with custom lists settings
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fab fa-trello'></i></span></a>";
	htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-poll fa-rotate-180'></i></span></a>";
	


	// find the standard Trell board header and the div that holds all buttons that float to the right
	// put in the new button
	let $rightSideHeader = $(".mod-right"); // .board-header-btns
	$rightSideHeader.prepend(htmlStr);
	
	console.log($rightSideHeader);
	console.log('header buttons created');
}





function startPageChangeObserver() {
	
	var pageChangeObserver = new MutationObserver(function(mutations) {
  		mutations.forEach(function(mutation) {

			immediatePageAdjustments();

			window.clearTimeout(pageChangeTimeOutID);
			pageChangeTimeOutID = window.setTimeout(delayedPageChangeAdjustments, 1000);

	  	});
	});

	pageChangeObserver.observe(document.documentElement, {
		childList: true,
		subtree: true,
	});
	
}




// do anything that needs to happen immediately (no visual discrepancy)
function immediatePageAdjustments() {
    interpretLists();
}

// do anything that can happen a split second later
function delayedPageChangeAdjustments() {
    
}




// TODO: create button to allow you to change titles that are searched for, colours, maybe add more titles to search for?
// fade checkbox (or value);
// colour overide


// TODO: actions should be rerun based on mutation observer (or drop listener)





$(function() {
	loadIcons();
    injectCss();
	
	startPageChangeObserver();
	
	pageStartTimerID = window.setTimeout(createHeaderButtons, 3000);
});
