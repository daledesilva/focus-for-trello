
// getListSettingsArray is because board data is loaded into helpers.js. But it should probably be in a data.js or something and grabbed by everything? or just rename helpers?
import { getListSettingsArray, getListById } from "./helpers";

import { OPTIONS } from "./user-options";
import { plugin } from "../metadata";
import { userConsoleNote, devWarning, debugLog } from "./generic-helpers";





export function renderBoard(boardSettings) {

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











export function renderHeader(boardSettings) {

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