import dom, { Fragment } from "jsx-render";
// ISSUE: Using a capital F on Fragments and the same when using the tag allows VS code to show link when ctrl-hovering, however, chrome reports "jsx-render doesn"t handle undefineds" and stops execution.
// Using lowercase prevents that error but VS Code then doesn't show ctrl-hover tooltip.

// custom components
import {Tooltip} from "../components/tooltip";
import {ListButtons} from "./components/list-buttons"

import "./style.scss";

import {plugin} from "../metadata";




// Global variables
//
var pageChangeTimeOutID;
var $latestMutations = $("body");








// Adjust the appearance of any list on the page
//
function interpretLists() {
    "use strict";

    $latestMutations.find(".list-header h2").each( function() {

        let $title = $(this);
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





// Place Focus list settings buttons in the header of any open list context menu
//
function createListButtons() {
    "use strict";

    let $listSettings = $latestMutations.find(".pop-over-header").first();

    // Bail if the list settings popup isn"t present
    if($listSettings.length == 0)    return;

    // add custom Focus buttons to list settings menu
    $listSettings.prepend( <ListButtons $listReference={$listSettings} /> );

}















// Create the main settings button that switches visual layouts
//
function createFocusSwitchButton() {
    "use strict";



    let $rightHeader = $latestMutations.find(".mod-right").first();
    // Bail if the right header isn"t present in anything that"s modified
    if($rightHeader.length == 0) {
        //console.log("right header not found.");
        return;
    }


    // TO DO: Add button to hide all extraneous trello Headers, etc, and other function

    let floatingButton = (
        <Fragment>
            <a className="board-header-btn board-header-btn-without-icon" href="#">
                <span className="board-header-btn-text">Re-Format</span>
            </a>
            <a className="board-header-btn board-header-btn-without-icon" href="#"><span className="board-header-btn-text">Re-Format</span></a>
            <a className="board-header-btn" href="#"><span className="icon-sm board-header-btn-icon" title="Save all list settings as view"><i className="fas fa-save"></i></span></a>
            <a className="board-header-btn" href="#"><span className="icon-sm board-header-btn-icon" title="Create new view"><i className="fas fa-plus-square"></i></span></a>
            <a className="board-header-btn" href="#"><span className="icon-sm board-header-btn-icon" title="Clear unsaved settings"><i className="fas fa-backspace"></i></span></a>
        </Fragment>
    );



    // find the standard Trello board header and the div that holds all buttons that float to the right
    // put in the new button
    //let $rightSideHeader = $(".mod-right"); // .board-header-btns
    $rightHeader.prepend(floatingButton);

    // console.log($rightHeader);
    // console.log("floating button created");
}










// Starts an observer that runs two functions when changes occur on the page
//
function startPageChangeObserver() {

    var pageChangeObserver = new MutationObserver(function(mutations) {
        
        // erase previous mutation list and create empty jquery object
        $latestMutations = $();
        
        for (const mutation of mutations) {

            if( mutation.addedNodes !== null ) { // If there are new nodes added
                $latestMutations = $latestMutations.add( mutation.addedNodes );
            }
            
        }
        
        immediatePageAdjustments();

        window.clearTimeout(pageChangeTimeOutID);
        pageChangeTimeOutID = window.setTimeout(delayedPageChangeAdjustments, 1000);
        

    });

    pageChangeObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });

}
















// Runs immediately whenever anything on the page changes.
// Only put things in here that:
// - Must be re-run any time the page changes.
// - Is visible immediately and thus will call visual discrepancy if delayed.
function immediatePageAdjustments() {
    interpretLists();

    // TO DO: createListButtons should be delayed, but in delayed it doesn't work the first time for some reason.
    // Perhaps add button actions to list menu button to put these in? - though this would mean monitoring which ones have been done and not adding mulktiple event listeners to them.
    createListButtons();
}

// Runs a split second after anything on the page changes.
// Put things in here that:
// - Must be re-run any time the page changes.
// - Isn't immediately visible (ie, hidden in a menu)
function delayedPageChangeAdjustments() {
    
}









// Actions that need to be run only once on the page
// Runs immediately whenever anything on the page changes.
function immediatePageInitialisation() {
    console.log("Immediate page Initialisation");

    // load icons
    let iconJsx = <script src="https://kit.fontawesome.com/c0535646a5.js" crossorigin="anonymous"></script>
    $("head").append(iconJsx);

    startPageChangeObserver();

    immediatePageAdjustments();

}


// Actions that need to be run only once on the page
// Runs a split second after anything on the page changes.
function delayedPageInitialisation() {
    console.log("Delayed page Initialisation");       

    createFocusSwitchButton();
    
    delayedPageChangeAdjustments();

}







// on page load, start watching for page changes
$(function() {
    immediatePageInitialisation();
    pageStartTimerID = window.setTimeout(delayedPageInitialisation, 2000);
});
