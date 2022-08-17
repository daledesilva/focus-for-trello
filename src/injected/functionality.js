import dom, { Fragment } from "jsx-render";
import jQueryBridget from 'jquery-bridget';
import Masonry from "masonry-layout"
import tippy, {createSingleton} from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/themes/material.css';
import 'tippy.js/animations/shift-toward-subtle.css';
import classnames from 'classnames';

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
import { setActiveList, fetchAndStoreUrl, cycleBoardHeader, cycleBoardPresets, nukeBoardSettings, visualizeAllBoardSettings, getBoardSettings } from "./helpers";
import classNames from "classnames";
import { DeletePresetButton, initDeletePresetButtons } from "./components/delete-preset-button";
import { RevertPresetButton, initRevertPresetButtons } from "./components/revert-preset-button";
import { SavePresetButton, initSavePresetButtons } from "./components/save-preset-button";
import { PresetButton, initPresetButtons } from "./components/preset-button";


























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
    if( $popoverHeaderTitle.text().toUpperCase() != "LIST ACTIONS" )   return;

    // add custom Focus buttons to list settings menu
    let $listContent = $latestMutations.find(".js-pop-over-content div div").first();
    $listContent.append( <hr/> );
    $listContent.append( <ListButtons/> );

    applyTippyInside($listContent);
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
export function createOrRefreshInterface() {
    "use strict";

    const boardSettings = getBoardSettings();
    const boardPresets = boardSettings.boardPresets;

    const $body = $("body");


    // Remove any previously created versions
    const existingSetup = $body.find( `#${plugin.slug}_switch-focus-container` );
    const isOpen = existingSetup.hasClass(`${plugin.slug}_open`);
    existingSetup.remove();



    let switchFocusContainer = (
        <div
            id = { plugin.slug + "_switch-focus-container" }
            className = {classNames(
                isOpen && `${plugin.slug}_open`, 
            )}
        >


            {/* Presets */}

            <div className={plugin.slug + "_presets-group"}>


                {boardPresets.map( (boardPreset,index) => <div
                    className = {classnames(
                        plugin.slug + "_preset-container",
                        !boardPreset.isSaved && plugin.slug + "_unsaved",
                        index == boardSettings.activeBoardPreset && plugin.slug + "_active",
                    )}
                >

                    {/* {index != 0 && ( <> */}

                        {/* Allow deletion of preset */}
                        <DeletePresetButton index={index}/>
                        
                        {/* or, if modified, allow reverting or overwriting changes */}
                        <RevertPresetButton index={index}/>
                        <SavePresetButton index={index}/>

                    {/* </> )} */}

                    <PresetButton
                        index = {index}
                        boardPreset = {boardPreset}
                    />

                </div> )}
                

            </div>





            <div className={plugin.slug + "_settings-group"}>
            
                {/* Temproary reset data buttons - If kept, these should move into the settings butotn below as a dropdown */}

                <div
                    href="#"
                    id={ plugin.slug + "_setup-nuke-board-btn" }
                    className={classnames(
                        plugin.slug + "_circle-btn",
                        `${plugin.slug}_tooltip`,
                    )}
                    data-tooltip = "Erase board settings"
                >
                    <i className="fas fa-calendar-times"/>
                </div>


                {/* Settings and header switch buttons */}

                <div
                    href="#"
                    id={ plugin.slug + "_setup-actions-btn" }
                    className={classnames(
                        plugin.slug + "_circle-btn",
                        `${plugin.slug}_tooltip`,
                    )}
                    data-tooltip = "Setup actions"
                >
                    <i className="fas fa-cog"/>
                </div>

                <div
                    href="#"
                    id={ plugin.slug + "_switch-header-btn" }
                    className={classnames(
                        plugin.slug + "_circle-btn",
                        `${plugin.slug}_tooltip`,
                    )}
                    data-tooltip = "Switch header"
                >
                    <i className="fas fa-sync-alt"/>
                </div>

            </div>






            {/* Main button */}
            <a
                href="#"
                id={ plugin.slug + "_switch-focus-btn" }
                className={classnames(
                    `${plugin.slug}_tooltip`,
                )}
                data-tooltip = "Switch focus"
            >
                <i className="fas fa-sync-alt"/>
            </a>

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
    $switchFocusContainer.find("#" + plugin.slug + "_setup-nuke-board-btn").on("click", nukeBoardSettings);

    // RIGHT CLICK ACTIONS
    //////////////////////
    $("#" + plugin.slug + "_switch-focus-btn" ).bind("contextmenu", function(e) {
        $switchFocusContainer.toggleClass( plugin.slug + "_open" );
        return false; // return false to stop the context menu appearing
    });

    // TOOLTIPS
    ///////////
    applyTippyInside($switchFocusContainer);


    // PRESET ACTIONS
    /////////////////////
    initPresetButtons();
    initDeletePresetButtons();
    initRevertPresetButtons();
    initSavePresetButtons();
    


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












function applyTippyInside($container, props) {

    let tippyArr = [];
    $container.find(`.${plugin.slug}_tooltip`).each( (index, el) => {
        const domEl = $(el)[0];
        const content = domEl.getAttribute('data-tooltip');

        tippyArr.push(
            tippy(domEl, {
                content,
            })
        );
    })

    createSingleton(tippyArr, {
        theme: 'material',
        placement: 'top',
        animation: 'shift-toward-subtle',
        delay: [750, 100],
        ...props,
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
    
    // TO DO: Interpret lists may be superseded by visualizeAllBoardSettings - look into deleting and what might be in there to salvage.
    // interpretLists();

    // This is getting run repeatedly - check if the page initialization functions should run more than once
    // (When a new list is created it should be unstyled anyway - and then you use the menu to style it which visualises the list there).
    // It will only need to be monitored again when partial name selectors are implemented.
//    visualizeAllBoardSettings();

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
    visualizeAllBoardSettings();

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

    createOrRefreshInterface();
    delayedPageChangeAdjustments();

}







// on page load, start watching for page changes
$(function() {
    immediatePageInitialisation();
    var pageStartTimerID = window.setTimeout(delayedPageInitialisation, 2000);
});
