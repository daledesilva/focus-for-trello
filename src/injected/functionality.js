import dom, { Fragment } from "jsx-render";
// ISSUE: Using a capital F on Fragments and the same when using the tag allows VS code to show link when ctrl-hovering, however, chrome reports "jsx-render doesn"t handle undefineds" and stops execution.
// Using lowercase prevents that error but VS Code then doesn't show ctrl-hover tooltip.

// custom components
import {Tooltip} from "../components/tooltip";
import {ListButtons} from "./components/list-buttons"

import "./style.scss";

import {plugin} from "../metadata";













// Available list appearance options
////////////////////////////////////

const labelOptions = [
    {
        name: "Trello default",
        class: "ft_card-labels_default",
        isActiveWhenCycling: true
    },
    {
        name: "Hide card labels",
        class: "ft_card-labels_hidden",
        isActiveWhenCycling: true
    },
]
const badgeOptions = [
    {
        name: "Trello default",
        class: "ft_card-badges_default",
        isActiveWhenCycling: true
    },
    {
        name: "Hide card badges",
        class: "ft_card-badges_hidden",
        isActiveWhenCycling: true
    },
]
const detailOptions = [
    {
        name: "Trello default",
        class: "ft_card-details_default",
        isActiveWhenCycling: true
    },
    {
        name: "Hide card details",
        class: "ft_card-details_hidden",
        isActiveWhenCycling: true
    },
]
const imageOptions = [
    {
        name: "Trello default",
        class: "ft_list-color_default",
        isActiveWhenCycling: true
    },
    {
        name: "Minimise images",
        class: "ft_list-color_default",
        isActiveWhenCycling: true
    },
    {
        name: "Hide images",
        class: "ft_list-color_default",
        isActiveWhenCycling: true
    },
]
const sizeOptions = [
    {
        name: "Trello default",
        class: "ft_list-size_default",
        isActiveWhenCycling: true
    },
    {
        name: "Narrow list",
        class: "ft_list-size_narrow",
        isActiveWhenCycling: true
    },
    {
        name: "Wide list",
        class: "ft_list-size_wide-1",
        isActiveWhenCycling: true
    },
    {
        name: "Extra wide list",
        class: "ft_list-size_wide-2",
        isActiveWhenCycling: true
    },
    {
        name: "Ultra wide list",
        class: "ft_list-size_wide-2",
        isActiveWhenCycling: true
    }
]
const colorOptions = [
    {
        name: "Trello default",
        class: "ft_list-color_default",
        isActiveWhenCycling: true
    },
    {
        name: "Dark list",
        class: "ft_list-color_dark",
        isActiveWhenCycling: true
    },
    {
        name: "Light list",
        class: "ft_list-color_light",
        isActiveWhenCycling: true
    },
    {
        name: "Subtle list",
        class: "ft_list-color_subtle",
        isActiveWhenCycling: true
    },
    // {
    //     name: "Dark & transparent list",
    //     class: "ft_list-color_dark",
    //     isActiveWhenCycling: true
    // },
    // {
    //     name: "Light & transparent list",
    //     class: "ft_list-color_light",
    //     isActiveWhenCycling: true
    // },
    // {
    //     name: "Subtle & transparent list",
    //     class: "ft_list-color_subtle",
    //     isActiveWhenCycling: true
    // }
]












// Enumerators
//////////////

const HEADER_SETTINGS = {
    DEFAULT: "default",
    HIDE_LEFT_BOARD_HEADER: "hide left board header",
    SHOW_RIGHT_BOARD_HEADER: "show right board header",
    HIDE_ALL: "hide all",
    SHOW_TRELLO_HEADER: "show trello header"
}

const MATCH_METHODS = {
    EXACT: "exact",
    CONTAINS: "contains"
}








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


// Each board
var boardSettings = {

    boardName: "The name of the board",
    boardUrl: "The URL of the board",

    boardPresets: [
        { // Board preset 1

            presetName: "Board preset name",
            isActiveWhenCycling: true,
            
            headerSettings: "DEFAULT | HIDE_LEFT_BOARD_HEADER | SHOW_RIGHT_BOARD_HEADER | HIDE_ALL | SHOW_TRELLO_HEADER",

            listSettings: [
                { // A list's settings
                    listId: "DONE,FINISHED,COMPLETE", // It's name
                    matchMethod: "EXACT | CONTAINS",
                    presetId: "The ID of a global preset to apply (optional)",
                    classes: ["CSS name of each class to apply"],
                    customSettings: {} // a place for any customisations if made possible
                },
                { // A list's settings

                }
            ]

        },
        { // Board preset 2
        
        }

    ]

}



function displayConsoleWarning(text) {
    console.log( "WARNING: " + text );
}




function listNameMatchesId(listName, listId, matchMethod, ) {
    if(matchMethod == MATCH_METHODS.EXACT) {
        return listName == listId;

    } else if(matchMethod == MATCH_METHODS.CONTAINS) {
        return listName.indexOf(listId) >= 0;

    } else {
        displayConsoleWarning("The match method defined doesn't exist");
    }
}



function getOptionAfter(currentOptionClass, optionSet) {
    
    // Find the current item in the optionSet
    let currentIndex = null;
    //
    for(let index = 0; index < optionSet.length; index++) {
        let option = optionSet[index];

        if(currentOptionClass == option.class) {
            currentIndex = index;
            break;
        }       
    };
    //
    if(currentIndex == null) {
        displayConsoleWarning("Can't iterate to next option because the current option's class isn't found. Jumping to first option instead.");
        currentIndex = 0;
    }

    // Go to next item in line and loop around if necessary
    let nextIndex = (currentIndex + 1) % optionSet.length;

    return optionSet[nextIndex];
}



function getContainingList($element) {
    return $element.closest(".js-list");
}


function cycleOptionInList(optionSet, $list) {

}











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
        if( titleText.indexOf("DONE") >= 0 || titleText.indexOf("FINISHED") >= 0 || titleText.indexOf("COMPLETE") >= 0) {
            $title.closest(".js-list")  .addClass("ft_list-size_narrow")
                                        .addClass("ft_list-color_dark")
                                        .addClass("ft_card-labels_hidden")
                                        .addClass("ft_card-badges_hidden")
                                        .addClass("ft_card-details_hidden")
                                        .addClass("ft_card-images_hidden");

        } else if( titleText.indexOf("GOAL") >= 0 || titleText.indexOf("FUTURE") >= 0 ) {
            $title.closest(".js-list")  .addClass("ft_list-size_narrow")
                                        .addClass("ft_list-color_subtle")
                                        .addClass("ft_card-labels_hidden")
                                        .addClass("ft_card-badges_hidden")
                                        .addClass("ft_card-details_hidden")
                                        .addClass("ft_card-images_minimised");

        } else if( titleText.indexOf("DITCH") >= 0 || titleText.indexOf("ABANDON") >= 0 ) {
            $title.closest(".js-list")  .addClass("ft_list-size_narrow")
                                        .addClass("ft_list-color_dark-and-clear")
                                        .addClass("ft_card-labels_hidden")
                                        .addClass("ft_card-badges_hidden")
                                        .addClass("ft_card-details_hidden")
                                        .addClass("ft_card-images_hidden");

        } else if( titleText.indexOf("DUMP") >= 0 ) {
            $title.closest(".js-list")  .addClass("ft_list-size_narrow")
                                        .addClass("ft_list-color_subtle-and-clear")
                                        .addClass("ft_card-labels_hidden")
                                        .addClass("ft_card-badges_hidden")
                                        .addClass("ft_card-details_hidden")
                                        .addClass("ft_card-images_minimised");

        }


    });



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















// Create the main settings button that switches visual layouts
//
function createFocusSwitchButton() {
    "use strict";



    let $body = $("body");


    


    let switchFocusContainer = (
        <div id={ plugin.slug + "_switch-focus-container" }>


            {/* Presets */}

            <div class={[
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

            <div class={[
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

            <div class={ plugin.slug + "_preset-container" }>
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

            <div class={[
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

            <div class={ plugin.slug + "_preset-container" }>
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




            {/* Settings and header switch buttons */}

            <Tooltip title="Setup actions" >
                <a
                    href="#"
                    id={ plugin.slug + "_setup-actions-btn" }
                >
                    <i className="fas fa-cog"/>
                </a>
            </Tooltip>

            <Tooltip title="Switch header" >
                <a
                    href="#"
                    id={ plugin.slug + "_switch-header-btn" }
                >
                    <i className="fas fa-sync-alt"/>
                </a>
            </Tooltip>






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

    // RIGHT CLICK ACTIONS
    //////////////////////
    $("#" + plugin.slug + "_switch-focus-btn" ).bind("contextmenu", function(e) {
        $switchFocusContainer.toggleClass( plugin.slug + "_open" );
        return false; // return false to stop the context menu appearing
    });


}



function switchFocus() {
    console.log("switching focus");
}

function addSelected() {
    console.log("show hover state");
}

function switchHeader () {


    function hideCurrentBoardLeftHeader() {
        $(".js-rename-board").addClass( plugin.slug + "_trello-ui_collapse" );
        $(".js-star-board").addClass( plugin.slug + "_trello-ui_collapse" );
        $(".js-board-header-btn-org-wrapper").addClass( plugin.slug + "_trello-ui_collapse" );
        $(".board-header-btn-divider").addClass( plugin.slug + "_trello-ui_collapse" );
        $(".board-header-btns.mod-left").addClass( plugin.slug + "_trello-ui_collapse" );
    }

    function hideCurrentBoardWholeHeader() {
        $(".js-board-header").addClass( plugin.slug + "_trello-ui_collapse" );
        // Add padding
        $("#board").addClass( plugin.slug + "_trello-ui_header-padding" );
    }

    function hideGeneralTrelloHeader() {
        $("#surface").find("div").first().addClass( plugin.slug + "_trello-ui_collapse" );
    }

    function hideAllHeaders() {
        hideCurrentBoardWholeHeader();
        hideGeneralTrelloHeader();
        // Add padding
        $("#board").addClass( plugin.slug + "_trello-ui_header-padding" );
    }



    // Unhide all headers
    /////////////////////
    // Current board left header
    $(".js-rename-board").removeClass( plugin.slug + "_trello-ui_collapse" );
    $(".js-star-board").removeClass( plugin.slug + "_trello-ui_collapse" );
    $(".js-board-header-btn-org-wrapper").removeClass( plugin.slug + "_trello-ui_collapse" );
    $(".board-header-btn-divider").removeClass( plugin.slug + "_trello-ui_collapse" );
    $(".board-header-btns.mod-left").removeClass( plugin.slug + "_trello-ui_collapse" );
    // Current board whole header
    $(".js-board-header").removeClass( plugin.slug + "_trello-ui_collapse" );
    // General Trello header
    $("#surface").find("div").first().removeClass( plugin.slug + "_trello-ui_collapse" );
    // Remove padding
    $("#board").removeClass( plugin.slug + "_trello-ui_header-padding" );
    
    headerAppearance++;
    headerAppearance %= 5; // TO DO: Maybe the header options can be abstracted to array of names so this could then be % length

    switch(headerAppearance) {

        case 1:     hideCurrentBoardLeftHeader();
                    break;

        case 2:     hideCurrentBoardLeftHeader();
                    hideGeneralTrelloHeader();
                    break;
                    
        case 3:     hideAllHeaders();
                    break;

        case 4:     hideCurrentBoardWholeHeader();
                    break;
        
        default:    break;

    }

    

    

    


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
    var pageStartTimerID = window.setTimeout(delayedPageInitialisation, 2000);  
});
