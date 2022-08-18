import { userConsoleNote, devWarning, debugLog } from "./generic-helpers";

// getListSettingsArray is because board data is loaded into helpers.js. But it should probably be in a data.js or something and grabbed by everything? or just rename helpers?
import { cycleBoardHeader, cycleBoardPresets, getListById, nukeBoardSettings } from "./helpers";

import { OPTIONS } from "./user-options";
import { plugin } from "../metadata";
import { useBoardSettings, getListSettingsArray } from "./data";

import dom, { Fragment } from "jsx-render";
import tippy, {createSingleton} from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/themes/material.css';
import 'tippy.js/animations/shift-toward-subtle.css';
import classnames from 'classnames';

// custom components
import {Tooltip} from "../components/tooltip";
import {ListButtons} from "./components/list-buttons";

import { DeletePresetButton, initDeletePresetButtons } from "./components/delete-preset-button";
import { RevertPresetButton, initRevertPresetButtons } from "./components/revert-preset-button";
import { SavePresetButton, initSavePresetButtons } from "./components/save-preset-button";
import { PresetButton, initPresetButtons } from "./components/preset-button";




export function renderBoard() {
    const [boardSettings] = useBoardSettings();

    renderLists();
    renderHeader(boardSettings);

    debugLog("Rendered all board settings");
}



function renderLists() {

    // Iterate through all $lists and reset any previously applied settings back to default
    $(".js-list").each( function () {
        let $this = $(this);
        resetListAppearance($this);    
    })

    debugLog("Reset all list appearances");
    

    // get an array of lists that do have listSettings in the current board preset
    let allListSettings = getListSettingsArray();

    // Iterate through all saved settings for lists and update
    for(let k = 0; k < allListSettings.length; k++) {
        // Individual list's settings
        let listSettings = allListSettings[k];

        
        let $list = getListById(listSettings.listId);
        
        // skip this loop if the list can't be found
        // TO DO: This should really try and find it by another means and if all else fails, delete the record
        if($list == undefined)  continue;
        
        
        // visualize each classId in the lists settings
        for(const classId of listSettings.classIds) {
            
            visualizeListOption({
                $list,
                newClass: classId,
            });
            
        }
        
    }

    debugLog("Render all saved list settings");


}



function resetListAppearance($list) {

    for(const attr in OPTIONS.LISTS) {

        OPTIONS.LISTS[attr].forEach( style => {
            $list.removeClass( style.class );
        });

    }

}




export function visualizeListOption(props) {
    const {
        $list,
        newClass,
        oldClass,
    } = props

    if(oldClass) $list.removeClass(oldClass);
    $list.addClass(newClass);
}





function removeClassFromListInSettings(props) {
    const { listId, classId } = props;
    let listSettings = getListSettingsRef(listId);

    // if there's no class Ids, there's nothing to remove
    if(listSettings.classIds == undefined)   return;

    // If there is, remove all instances of the classId
    for( let k = listSettings.classIds.length-1; k >= 0; k-- ) {

        if(classId == listSettings.classIds[k]) {
            listSettings.classIds.splice(k, 1);
        }

    }
    
    debugLog("Removed classId '"+ classId +"' from listId '"+ listId +"' in settings");
};











function addClassToListInSettings(props) {
    const { listId, classId } = props;
    let listSettings = getListSettingsRef(listId);

    listSettings.classIds.push(classId);

    debugLog("Added classId '"+ classId +"' from listId '"+ listId +"' in settings");
};











export function renderHeader() {
    const [boardSettings] = useBoardSettings();

    function addBoardPadding() {
        $("#board").addClass( plugin.slug + "_trello-board_padding" );
    }

    function hideCurrentBoardLeftHeader() {
        $(".js-rename-board").addClass( plugin.slug + "_trello-ui_hide" );
        $(".js-star-board").addClass( plugin.slug + "_trello-ui_hide" );
        $(".js-board-header-btn-org-wrapper").addClass( plugin.slug + "_trello-ui_hide" );
        $(".board-header-btn-divider").addClass( plugin.slug + "_trello-ui_hide" );
        $(".board-header-btns.mod-left").addClass( plugin.slug + "_trello-ui_hide" );
    }

    function hideCurrentBoardWholeHeader() {
        $(".js-board-header").addClass( plugin.slug + "_trello-ui_collapse" );
        hideCurrentBoardLeftHeader(); // prevents it appearing during transitions
        addBoardPadding();
    }

    function hideGeneralTrelloHeader() {
        $("#surface").find("div").first().addClass( plugin.slug + "_trello-ui_collapse" );
    }

    function hideAllHeaders() {
        hideCurrentBoardWholeHeader();
        hideGeneralTrelloHeader();
        addBoardPadding();
    }


    // Add all anim transitions as seperate class that never gets removed
    // So it animates both ways
    //////////////////////////
    $(".js-rename-board").addClass( plugin.slug + "_trello-ui_transition" );
    $(".js-star-board").addClass( plugin.slug + "_trello-ui_transition" );
    $(".js-board-header-btn-org-wrapper").addClass( plugin.slug + "_trello-ui_transition" );
    $(".board-header-btn-divider").addClass( plugin.slug + "_trello-ui_transition" );
    $(".board-header-btns.mod-left").addClass( plugin.slug + "_trello-ui_transition" );
    // Current board whole header
    $(".js-board-header").addClass( plugin.slug + "_trello-ui_transition" );
    // General Trello header
    $("#surface").find("div").first().addClass( plugin.slug + "_trello-ui_transition" );
    // For padding
    $("#board").addClass( plugin.slug + "_trello-board_transition" );


    // Unhide all headers
    /////////////////////
    // Current board left header
    $(".js-rename-board").removeClass( plugin.slug + "_trello-ui_hide" );
    $(".js-star-board").removeClass( plugin.slug + "_trello-ui_hide" );
    $(".js-board-header-btn-org-wrapper").removeClass( plugin.slug + "_trello-ui_hide" );
    $(".board-header-btn-divider").removeClass( plugin.slug + "_trello-ui_hide" );
    $(".board-header-btns.mod-left").removeClass( plugin.slug + "_trello-ui_hide" );
    // Current board whole header
    $(".js-board-header").removeClass( plugin.slug + "_trello-ui_collapse" );
    // General Trello header
    $("#surface").find("div").first().removeClass( plugin.slug + "_trello-ui_collapse" );
    // For board padding
    $("#board").removeClass( plugin.slug + "_trello-board_padding" );
    
    

    switch( boardSettings.boardPresets[boardSettings.activeBoardPreset].headerSetting ) {

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





// Create the main settings button that switches visual layouts
//
export function createOrRefreshFocusUi() {
    
    debugLog("1");
    const [boardSettings] = useBoardSettings();
    const {boardPresets} = boardSettings;
    
    debugLog("2");
    const $body = $("body");
    
    
    debugLog("3");
    // Remove any previously created versions
    const existingSetup = $body.find( `#${plugin.slug}_switch-focus-container` );
    const isOpen = existingSetup.hasClass(`${plugin.slug}_open`);
    existingSetup.remove();
    
    
    debugLog("4");
    let switchFocusContainer = (
        <div
            id = { plugin.slug + "_switch-focus-container" }
            className = {classnames(
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


    debugLog("5");
    let $switchFocusContainer = $(switchFocusContainer);
    $body.prepend($switchFocusContainer);
    
    
    
    debugLog("6");
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

    debugLog("7");
    // TOOLTIPS
    ///////////
    applyTippyInside($switchFocusContainer);

    debugLog("8");
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




// Place Focus list settings buttons in the header of any open list context menu
//
export function createListButtons($latestMutations) {
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