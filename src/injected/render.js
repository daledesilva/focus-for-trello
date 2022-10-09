import { userConsoleNote, devWarning, debugLog } from "./generic-helpers";

// getListSettingsArray is because board data is loaded into helpers.js. But it should probably be in a data.js or something and grabbed by everything? or just rename helpers?
import { cycleInterface, cycleBoardPresets, getListById, nukeBoardSettings } from "./helpers";

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

import FlipFocusIcon from '../assets/board-icon_flip-focus.js';
import FlipHeaderIcon from '../assets/board-icon_flip-header.js';
import EraseBoardSettingsIcon from '../assets/board-icon_erase-settings';
import SettingsIcon from '../assets/icon_more';


export function renderBoard() {
    const [boardSettings] = useBoardSettings();

    renderLists(boardSettings);
    renderInterface(boardSettings);
}



function renderLists(boardSettings) {

    // Iterate through all $lists and reset any previously applied settings back to default
    $(".js-list").each( function () {
        let $this = $(this);
        resetListAppearance($this); 
    })

    // get an array of lists that do have listSettings in the current board preset
    let allListSettings = boardSettings.boardPresets[boardSettings.activeBoardPreset].listSettings;

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
            
            renderListOption({
                $list,
                newClass: classId,
            });
            
        }
        
    }
}



function resetListAppearance($list) {

    for(const attr in OPTIONS.LISTS) {

        OPTIONS.LISTS[attr].forEach( styleOption => {
            $list.removeClass( styleOption.class );
        });

    }

}




export function renderListOption(props) {
    const {
        $list,
        newClass,
        oldClass,
    } = props

    if(oldClass) $list.removeClass(oldClass);
    $list.addClass(newClass);
}





// function removeClassFromListInSettings(props) {
//     const { listId, classId } = props;
//     let listSettings = getListSettingsRef(listId);

//     // if there's no class Ids, there's nothing to remove
//     if(listSettings.classIds == undefined)   return;

//     // If there is, remove all instances of the classId
//     for( let k = listSettings.classIds.length-1; k >= 0; k-- ) {

//         if(classId == listSettings.classIds[k]) {
//             listSettings.classIds.splice(k, 1);
//         }

//     }
    
//     debugLog("Removed classId '"+ classId +"' from listId '"+ listId +"' in settings");
// };











// function addClassToListInSettings(props) {
//     const { listId, classId } = props;
//     let listSettings = getListSettingsRef(listId);

//     listSettings.classIds.push(classId);

//     debugLog("Added classId '"+ classId +"' from listId '"+ listId +"' in settings");
// };






export function resetInterfaceAppearance($surface) {
    OPTIONS.INTERFACE.forEach( styleOption => {
        $surface.removeClass( styleOption.classname );
    });
}




export function renderInterface(boardSettings) {
    const $surface = $("#surface");
    const interfaceSettings = boardSettings.boardPresets[boardSettings.activeBoardPreset].interfaceSettings;
    
    resetInterfaceAppearance($surface);
    $surface.addClass(interfaceSettings.classname);
}





// Create the main settings button that switches visual layouts
//
// TODO: pass in boardSettings like everything else
export function renderFocusUi() {
    
    const [boardSettings] = useBoardSettings();
    const {boardPresets} = boardSettings;
    
    const $body = $("body");
    
    
    // Remove any previously created versions
    const existingSetup = $body.find( `#${plugin.slug}_switch-focus-container` );
    const isOpen = existingSetup.hasClass(`${plugin.slug}_open`);
    existingSetup.remove();
    
    
    let flipFocusContainer = (
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
                        index === 0 && plugin.slug + "_default" || !boardPreset.isSaved && plugin.slug + "_unsaved",
                        index == boardSettings.activeBoardPreset && plugin.slug + "_active",
                    )}
                >

                    {index != 0 && ( <Fragment>

                        {/* Allow deletion of preset */}
                        <DeletePresetButton index={index}/>
                        
                        {/* or, if modified, allow reverting or overwriting changes */}
                        <RevertPresetButton index={index}/>
                        <SavePresetButton index={index}/>

                    </Fragment> )}

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
                    <EraseBoardSettingsIcon/>
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
                    <SettingsIcon/>
                </div>

                <div
                    href="#"
                    id={ plugin.slug + "_switch-header-btn" }
                    className={classnames(
                        plugin.slug + "_circle-btn",
                        `${plugin.slug}_tooltip`,
                    )}
                    data-tooltip = "Flip header"
                >
                    <FlipHeaderIcon/>
                </div>

            </div>






            {/* Main button */}
            <a
                href="#"
                id={ plugin.slug + "_switch-focus-btn" }
                className={classnames(
                    `${plugin.slug}_tooltip`,
                )}
                data-tooltip = "Flip focus"
            >
                <FlipFocusIcon/>
            </a>

        </div>
    );


    let $flipFocusContainer = $(flipFocusContainer);
    $body.prepend($flipFocusContainer);
    
    
    
    // MOUSEOVERS
    /////////////
    $flipFocusContainer.find("." + plugin.slug + "_preset-container").mouseover(addSelected);

    // LEFT CLICK ACTIONS
    /////////////////////
    $flipFocusContainer.find("#" + plugin.slug + "_switch-focus-btn").on("click", flipFocus);
    $flipFocusContainer.find("#" + plugin.slug + "_switch-header-btn").on("click", flipHeader);
    $flipFocusContainer.find("#" + plugin.slug + "_setup-nuke-board-btn").on("click", nukeBoardSettings);

    // RIGHT CLICK ACTIONS
    //////////////////////
    $("#" + plugin.slug + "_switch-focus-btn" ).bind("contextmenu", function(e) {
        $flipFocusContainer.toggleClass( plugin.slug + "_open" );
        return false; // return false to stop the context menu appearing
    });

    // TOOLTIPS
    ///////////
    applyTippyInside($flipFocusContainer);

    // PRESET ACTIONS
    /////////////////////
    initPresetButtons();
    initDeletePresetButtons();
    initRevertPresetButtons();
    initSavePresetButtons();
    

}




// TODO: Why are these actions in the render file?

function flipFocus() {
    cycleBoardPresets();
}

function flipHeader() {
    cycleInterface();
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