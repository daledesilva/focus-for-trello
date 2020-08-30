import dom, { Fragment } from "jsx-render";
import jQueryBridget from 'jquery-bridget';
import Masonry from "masonry-layout"

// make Masonry a jQuery plugin
jQueryBridget( 'masonry', Masonry, $ );


import { MATCH_METHODS } from "./enumerators";
// custom components
import {Tooltip} from "../components/tooltip";
import {ListButtons} from "./components/list-buttons";

import "./style.scss";
import { OPTIONS } from "./user-options";

import {plugin} from "../metadata";
import {devWarning} from "./generic-helpers";
import { setActiveList, fetchAndStoreUrl, cycleBoardHeader, cycleBoardPresets, nukePresetSettings, nukeBoardSettings } from "./helpers";


























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









// Place Focus list settings buttons in the header of any open list context menu
//
function createListButtons() {
    "use strict";

    // The mutation won't include ".pop-over" or be it, so we have to check for somethign inside
    let $popoverHeaderTitle = $latestMutations.find(".pop-over-header-title").first();
    // Bail if a list settings popup isn"t present
    if($popoverHeaderTitle.length == 0)   return;
    // Bail if the popover isn't a list settings context menu
    if( $popoverHeaderTitle.text() != "List Actions" )   return;

    // add custom Focus buttons to list settings menu
    let $listContent = $latestMutations.find(".js-pop-over-content div div").first();
    $listContent.append( <hr/> );
    $listContent.append( <ListButtons/> );

}










function createEventsToRememberUserActions() {
    "use strict";

    // add an event to every list menu button
    $(".js-open-list-menu").click( (e) => {
        setActiveList( $(e.target).closest(".js-list") );
    });
}




// Create the main settings button that switches visual layouts
//
function createFocusSwitchButton() {
    "use strict";



    let $body = $("body");


    


    let switchFocusContainer = (
        <div id={ plugin.slug + "_switch-focus-container" }>


            {/* Presets */}

            <div className={plugin.slug + "_presets-group"}>

                <div className={[
                    plugin.slug + "_preset-container",
                    plugin.slug + "_unsaved"
                ].join(" ")}>

                    <a className={ plugin.slug + "_delete-preset-btn" } href="#">
                        <i className="fas fa-trash"></i>
                    </a>
                    <a className={ plugin.slug + "_save-preset-btn" } href="#">
                        <i className="fas fa-save"></i>
                    </a>
                    <a className={ plugin.slug + "_preset-btn" } href="#">
                        Unsaved Preset
                    </a>
                </div>

                <div className={[
                    plugin.slug + "_preset-container",
                    plugin.slug + "_active",
                ].join(" ")}>

                    {/* <a className={ plugin.slug + "_delete-preset-btn" } href="#">
                        <i className="fas fa-trash"></i>
                    </a> */}
                    {/* Reset replaces trash */}
                    <a className={ plugin.slug + "_clear-preset-changes-btn" } href="#">
                        <i className="fas fa-undo-alt"></i>
                    </a>
                    <a className={ plugin.slug + "_save-preset-btn" } href="#">
                        <i className="fas fa-save"></i>
                    </a>
                    <a className={ plugin.slug + "_preset-btn" } href="#">
                        Current Iteration
                    </a>
                </div>

                <div className={ plugin.slug + "_preset-container" }>
                    {/* Delete only shows when hovered over */}
                    {/* <a className={ plugin.slug + "_delete-preset-btn" } href="#">
                        <i className="fas fa-trash"></i>
                    </a>
                    <a className={ plugin.slug + "_save-preset-btn" } href="#">
                        <i className="fas fa-save"></i>
                    </a> */}
                    <a className={ plugin.slug + "_preset-btn" } href="#">
                        Upcoming Iterations
                    </a>
                </div>

                <div className={[
                    plugin.slug + "_preset-container"
                ].join(" ")}>
                    {/* Save and reset appear if the preset has been temporarily change */}
                    {/* <a className={ plugin.slug + "_delete-preset-btn" } href="#">
                        <i className="fas fa-trash"></i>
                    </a> */}
                    {/* Reset replaces trash */}
                    <a className={ plugin.slug + "_clear-preset-changes-btn" } href="#">
                        <i className="fas fa-undo-alt"></i>
                    </a>
                    <a className={ plugin.slug + "_save-preset-btn" } href="#">
                        <i className="fas fa-save"></i>
                    </a>
                    <a className={ plugin.slug + "_preset-btn" } href="#">
                        Current Iteration
                    </a>
                </div>

                <div className={ plugin.slug + "_preset-container" }>
                    {/* Delete only shows when hovered over */}
                    <a className={ plugin.slug + "_delete-preset-btn" } href="#">
                        <i className="fas fa-trash"></i>
                    </a>
                    {/* <a className={ plugin.slug + "_save-preset-btn" } href="#">
                        <i className="fas fa-save"></i>
                    </a> */}
                    <a className={ plugin.slug + "_preset-btn" } href="#">
                        Past Iterations
                    </a>
                </div>

            </div>





            <div className={plugin.slug + "_settings-group"}>
            
                {/* Temproary reset data buttons - If kept, these should move into the settings butotn below as a dropdown */}

                <Tooltip title="Erase preset settings" >
                    <div
                        href="#"
                        id={ plugin.slug + "_setup-nuke-preset-btn" }
                        className={ plugin.slug + "_circle-btn" }
                    >
                        <i className="fas fa-minus-square"/>
                    </div>
                </Tooltip>

                <Tooltip title="Erase board settings" >
                    <div
                        href="#"
                        id={ plugin.slug + "_setup-nuke-board-btn" }
                        className={ plugin.slug + "_circle-btn" }
                    >
                        <i className="fas fa-calendar-times"/>
                    </div>
                </Tooltip>


                {/* Settings and header switch buttons */}

                <Tooltip title="Setup actions" >
                    <div
                        href="#"
                        id={ plugin.slug + "_setup-actions-btn" }
                        className={ plugin.slug + "_circle-btn" }
                    >
                        <i className="fas fa-cog"/>
                    </div>
                </Tooltip>

                <Tooltip title="Switch header" >
                    <div
                        href="#"
                        id={ plugin.slug + "_switch-header-btn" }
                        className={ plugin.slug + "_circle-btn" }
                    >
                        <i className="fas fa-sync-alt"/>
                    </div>
                </Tooltip>

            </div>






            {/* Main button */}

            <Tooltip title="Switch focus" tag="a">
                <a
                    href="#"
                    id={ plugin.slug + "_switch-focus-btn" }
                >
                    <i className="fas fa-sync-alt"/>
                </a>
            </Tooltip>

        </div>
    );



    let $switchFocusContainer = $(switchFocusContainer);
    $body.prepend($switchFocusContainer);

    

    // MOUSEOVERS
    /////////////
    $switchFocusContainer.find("." + plugin.slug + "_preset-container").mouseover(addSelected);

    // LEFT CLICK ACTIONS
    /////////////////////
    $switchFocusContainer.find("#" + plugin.slug + "_switch-focus-btn").on("click", switchFocus);
    $switchFocusContainer.find("#" + plugin.slug + "_switch-header-btn").on("click", switchHeader);
    $switchFocusContainer.find("#" + plugin.slug + "_setup-nuke-preset-btn").on("click", nukePresetSettings);
    $switchFocusContainer.find("#" + plugin.slug + "_setup-nuke-board-btn").on("click", nukeBoardSettings);

    // RIGHT CLICK ACTIONS
    //////////////////////
    $("#" + plugin.slug + "_switch-focus-btn" ).bind("contextmenu", function(e) {
        $switchFocusContainer.toggleClass( plugin.slug + "_open" );
        return false; // return false to stop the context menu appearing
    });


}



function switchFocus() {
    cycleBoardPresets();
}

function switchHeader() {
    cycleBoardHeader();
}

function addSelected() {
    console.log("show hover state");
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
    // Perhaps add button actions to list menu button to put these in? - though this would mean monitoring which ones have been done and not adding multiple event listeners to them.
    createListButtons();
}

// Runs a split second after anything on the page changes.
// Put things in here that:
// - Must be re-run any time the page changes.
// - Isn't immediately visible (ie, hidden in a menu)
function delayedPageChangeAdjustments() {

    createEventsToRememberUserActions();

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
    var pageStartTimerID = window.setTimeout(delayedPageInitialisation, 2000);
});
