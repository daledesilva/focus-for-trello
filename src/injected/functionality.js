import dom, { Fragment } from "jsx-render";
import jQueryBridget from 'jquery-bridget';
import Masonry from "masonry-layout"


// make Masonry a jQuery plugin
jQueryBridget( 'masonry', Masonry, $ );


import { MATCH_METHODS } from "./enumerators";


import "./style.scss";
import { OPTIONS } from "./user-options";

import {plugin} from "../metadata";
import {devWarning} from "./generic-helpers";
import { setActiveList, fetchAndStoreUrl, cycleBoardHeader, cycleBoardPresets, nukeBoardSettings } from "./helpers";
import { renderFocusUi, renderBoard, createListButtons } from "./render";
import { useBoardSettings } from "./data";










// Global variables
//
var pageChangeTimeOutID;
var $latestMutations = $("body");






// from saved board settings
var headerAppearance = 0;






















// Global
// var globalSettings = {

//     listPresets: [
//         {
//             presetName: "List preset name",
//             enabled: true,
//             classes: ["CSS name of each class to apply"],
//             customSettings: {} // a place for any customisations if made possible
//         }
        
//     ]

// }












// Adjust the appearance of any list on the page
//
function interpretLists() {
    "use strict";




    $latestMutations.find(".list-header h2").each( function() {

        let $title = $(this);
        let titleText = $title.text().toUpperCase();

        // if( titleText.indexOf("YEAR") >= 0 ) {
        //     $title.closest(".js-list")  .addClass("ft_list-size_wide");

        // } else
        // if( titleText.indexOf("DONE") >= 0 || titleText.indexOf("FINISHED") >= 0 || titleText.indexOf("COMPLETE") >= 0) {
        //     $title.closest(".js-list")  .addClass("ft_list-size_narrow")
        //                                 .addClass("ft_list-color_dark")
        //                                 .addClass("ft_card-labels_hidden")
        //                                 .addClass("ft_card-badges_hidden")
        //                                 .addClass("ft_card-details_hidden")

        // } else if( titleText.indexOf("GOAL") >= 0 || titleText.indexOf("FUTURE") >= 0 ) {
        //     $title.closest(".js-list")  .addClass("ft_list-size_narrow")
        //                                 .addClass("ft_list-color_subtle")
        //                                 .addClass("ft_card-labels_hidden")
        //                                 .addClass("ft_card-badges_hidden")
        //                                 .addClass("ft_card-details_hidden")

        // } else if( titleText.indexOf("DITCH") >= 0 || titleText.indexOf("ABANDON") >= 0 ) {
        //     $title.closest(".js-list")  .addClass("ft_list-size_narrow")
        //                                 .addClass("ft_list-color_dark-and-clear")
        //                                 .addClass("ft_card-labels_hidden")
        //                                 .addClass("ft_card-badges_hidden")
        //                                 .addClass("ft_card-details_hidden")

        // } else if( titleText.indexOf("DUMP") >= 0 ) {
        //     $title.closest(".js-list")  .addClass("ft_list-size_narrow")
        //                                 .addClass("ft_list-color_subtle-and-clear")
        //                                 .addClass("ft_card-labels_hidden")
        //                                 .addClass("ft_card-badges_hidden")
        //                                 .addClass("ft_card-details_hidden")

        // }


    });




    // apply masonry
    let requiresMasonry = false;
    let $lists = $(".js-list");
    $lists.filter(function() {
        let $list = $(this);

        // TO DO: This runs too often, how can I limit it?

        var $masonryListFlag = $(this).css("--layout-is-masonry");

        if ( $masonryListFlag && $masonryListFlag.indexOf("true") >= 0 ) {

            let $container = $list.find(".list-cards");
            $container.addClass("grid");

            $container.find(".list-card").addClass("grid-item");

            requiresMasonry = true;
        }
        
        
    })

    if( requiresMasonry ) {
        
        //$lists.filter(".grid").masonry({ // doesn't seem to work :(
        $(".grid").masonry({
            itemSelector: ".grid-item",
            gutter: 8,
        });      

    } else {
        
        // TO DO: Need to remobe masonry when it's no long er needed on a list
        
        // $lists.not("grid").masonry('destroy');

    }



}




















function createEventsToRememberUserActions() {
    "use strict";

    // add an event to every list menu button
    $(".js-open-list-menu").click( (e) => {
        setActiveList( $(e.target).closest(".js-list") );
    });
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
    
    // TO DO: Interpret lists may be superseded by renderBoard - look into deleting and what might be in there to salvage.
    // interpretLists();

    // This is getting run repeatedly - check if the page initialization functions should run more than once
    // (When a new list is created it should be unstyled anyway - and then you use the menu to style it which visualises the list there).
    // It will only need to be monitored again when partial name selectors are implemented.
//    renderBoard();

    // TO DO: createListButtons should be delayed, but in delayed it doesn't work the first time for some reason.
    // Perhaps add button actions to list menu button to put these in? - though this would mean monitoring which ones have been done and not adding multiple event listeners to them.
    createListButtons($latestMutations);
}

// Runs a split second after anything on the page changes.
// Put things in here that:
// - Must be re-run any time the page changes.
// - Isn't immediately visible (ie, hidden in a menu)
function delayedPageChangeAdjustments() {
    const [boardSettings] = useBoardSettings();

    createEventsToRememberUserActions();
    renderBoard( boardSettings );

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

    renderFocusUi();
    delayedPageChangeAdjustments();

}







// on page load, start watching for page changes
$(function() {
    immediatePageInitialisation();
    var pageStartTimerID = window.setTimeout(delayedPageInitialisation, 2000);
});
