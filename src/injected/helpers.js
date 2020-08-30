import { userConsoleNote, devWarning, debugLog } from "./generic-helpers";
import { MATCH_METHODS } from "./enumerators";
import { OPTIONS } from "./user-options";

import {plugin} from "../metadata";


var $activeList;
var boardSettings;  // Wipe this for each board





// Listeners to update variables
////////////////////////////////

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if(request.url) {


            if(
                boardSettings == undefined ||
                boardSettings.boardUrl != request.url
                )
            {
                // Initialise the boardSettings object
                initBoardSettings( request.url );
            }
            
            // Then load in saved settings (will not overide if saved settings don't exist)
            loadBoardSettings( boardSettings.url );

        }
    }
);






function createListSettings(props) {
    
    let {
        listId,
        matchMethod,
        activeBoardPreset,
        classIds,
        customSettings
    } = props;


    if( listId == undefined )   devWarning("No listId defined in createListSettings");


    if( matchMethod == undefined )      matchMethod = MATCH_METHODS.EXACT;
    if( ! activeBoardPreset )           activeBoardPreset = 0;
    if( ! classIds )                    classIds = new Array();
    if( ! customSettings )              customSettings = new Object();


    return {
        listId,
        matchMethod,
        activeBoardPreset,
        classIds,
        customSettings,
    }


}





function initBoardSettings(url) {

    boardSettings = {

        settingsVersion: "2020.07.27",

        boardName: getBoardName(),
        boardUrl: trimUrl(url),
    
        activeBoardPreset: 0,
        boardPresets: [
            { // Board preset 1
    
                presetId: 0,
                presetName: "Unnamed preset "+1,
                isActiveWhenCycling: true,

                headerSetting: 0,//"DEFAULT", // | HIDE_LEFT_BOARD_HEADER | SHOW_RIGHT_BOARD_HEADER | HIDE_ALL | SHOW_TRELLO_HEADER",
    
                listSettings: [
                    // createListSettings({}),
                    // createListSettings({}),
                    
                ]
    
            },
            //{ // Board preset 2
            
            //}
    
        ]
    
    };

    debugLog("Board Settings Initialised");
    debugLog(boardSettings);
}




function initBoardPreset(id) {

    // If it already exists, then bail.
    if(boardSettings.boardPresets[id])  return;



    boardSettings.boardPresets[id] = {
    
        presetId: id,
        presetName: "Unnamed preset "+1,
        isActiveWhenCycling: true,
        
        headerSetting: 0,//"DEFAULT", // | HIDE_LEFT_BOARD_HEADER | SHOW_RIGHT_BOARD_HEADER | HIDE_ALL | SHOW_TRELLO_HEADER",

        listSettings: [
            // createListSettings({}),
            // createListSettings({}),
            
        ]

    }


    debugLog("Board Preset Initialised");
    debugLog(boardSettings);
}










export function loadBoardSettings() {
    const boardId = boardSettings.boardUrl;

    chrome.storage.local.get(
        [boardId],
        function(result) {
            
            if(result[boardId] != undefined) {

                // TO DO: This is where it should run a function to update the board settings if the settings version number is old.


                // Set the boardSettings from those loaded
                boardSettings = result[boardId];

                // define an activePreset if there wasn't one
                if(!boardSettings.activeBoardPreset)    boardSettings.activeBoardPreset = 0;

                // Update the board to match the board settings
                visualizeAllBoardSettings();

            }

            debugLog("Loaded boardSettings from Chrome memory");
            debugLog(boardSettings);
            
        }
    );

}


export function saveBoardSettings() {
    const boardId = boardSettings.boardUrl;

    chrome.storage.local.set({[boardId]: boardSettings}, function() {
        // Asynchronous callback

        userConsoleNote("Board settings for " + boardSettings.boardUrl + " saved to Chrome memory.")
    });

    debugLog("Set boardSettings to save in Chrome memory");
    debugLog(boardSettings);
    
}




export function nukePresetSettings() {
    let presetToDelete = boardSettings.activeBoardPreset;

    boardSettings.boardPresets.splice(presetToDelete, 1);
    if(presetToDelete > 0) {
        boardSettings.activeBoardPreset --;
    } else {
        boardSettings.activeBoardPreset = boardSettings.boardPresets.length-1;
    }

    userConsoleNote("Preset settings erased, previous remaining preset activated");

    visualizeAllBoardSettings();
    saveBoardSettings();

}

export function nukeBoardSettings() {
    let url = boardSettings.boardUrl;

    initBoardSettings(url);
    userConsoleNote("Board settings erased.");

    visualizeAllBoardSettings();
    saveBoardSettings();
}







////////////////////////////////








export function setActiveList($list) {
    console.log("SETTING THE ACTIVE LIST: " + getListId($list) );
    $activeList = $list;
}

export function $getActiveList() {
    return $activeList;
}



export function listNameMatchesId(listName, listId, matchMethod, ) {
    if(matchMethod == MATCH_METHODS.EXACT) {
        return listName == listId;

    } else if(matchMethod == MATCH_METHODS.CONTAINS) {
        return listName.indexOf(listId) >= 0;

    } else {
        devWarning("The match method defined doesn't exist");
    }
}



// for when you know the class that represents the current option
export function getOptionAfterThis(currentOptionId, optionSet) {
    
    // Find the current item in the optionSet
    let currentIndex;
    //
    for(let index = 0; index < optionSet.length; index++) {
        let option = optionSet[index];

        if(currentOptionId == option.class) {
            currentIndex = index;
            break;
        }       
    };
    //
    if(currentIndex == undefined) {
        devWarning("Can't iterate to next option because the current option's class isn't found. Jumping to first option instead.");
        currentIndex = 0;
    }

    // Go to next item in line and loop around if necessary
    let nextIndex = (currentIndex + 1) % optionSet.length;

    return optionSet[nextIndex];
}






function getListsCurrentOptionInSetAsIndex($list, optionSet) {
    
    let currentIndex;

    // Find the current item in the optionSet
    for(let index = 0; index < optionSet.length; index++) {
        let option = optionSet[index];

        if($list.hasClass(option.class)) {
            currentIndex = index;
            break;
        }
    };

    if(currentIndex == undefined) {
        devWarning("Can't iterate to next option because the current option's class isn't found. Jumping to first custom option instead.");
        currentIndex = 0; // setting to default option first, then increment
    }

    return currentIndex;
    
}


function getNextOptionIndex(currentOptionIndex, optionSet) {
    return (currentOptionIndex + 1) % optionSet.length;
}





// for when you don't know the class the represents the current option but you know the list
export function getListsNextOptionInSet($list, optionSet) {
    
    let currentIndex;
    let nextIndex;
    
    // Find the current item in the optionSet
    for(let index = 0; index < optionSet.length; index++) {
        let option = optionSet[index];

        if($list.hasClass(option.class)) {
            currentIndex = index;
            break;
        }       
    };


    if(currentIndex == undefined) {
        devWarning("Can't iterate to next option because the current option's class isn't found. Jumping to first custom option instead.");
        currentIndex = 0; // setting to default option first, then increment
    }

    // Go to next item in line and loop around if necessary
    nextIndex = (currentIndex + 1) % optionSet.length;

    return optionSet[nextIndex];
}


export function getNextOptionInSet(currentClass, optionSet) {
    
    let currentIndex;
    let nextIndex;
    
    // Find the current item in the optionSet
    for(let index = 0; index < optionSet.length; index++) {
        let option = optionSet[index];

        if(currentClass == option.class) {
            currentIndex = index;
            break;
        }       
    };


    if(currentIndex == undefined) {
        devWarning("Can't iterate to next option because the current option's class isn't found. Jumping to first custom option instead.");
        currentIndex = 0; // setting to default option first, then increment
    }

    // Go to next item in line and loop around if necessary
    nextIndex = (currentIndex + 1) % optionSet.length;

    return optionSet[nextIndex];
}



export function getContainingList(id) {    
    return $("#" + id).closest(".js-list");
}


export function cycleOptionInList(optionSet, $list) {

    // TO DO: This can all be done more efficiently with indices
    let currentOptionIndex = getListsCurrentOptionInSetAsIndex($list, optionSet);
    let nextOptionIndex = getNextOptionIndex(currentOptionIndex, optionSet);

    let currentOption = optionSet[ currentOptionIndex ]
    let nextOption = optionSet[ nextOptionIndex ];

    

    visualizeListOption({
        $list: $list,
        newClass: nextOption.class,
        oldClass: currentOption.class
    })
    

    saveListOption({
        $list: $list,
        newClass: nextOption.class,
        oldClass: currentOption.class
    })

}











function getClassIdSet(classId) {
    let classIdSet = new Array();
    let setFound = false;

    for(const optionSetKey in  OPTIONS.LISTS) {
        classIdSet = new Array();

        let optionSet = OPTIONS.LISTS[optionSetKey];

        // for all the options in the option set
        for(let optionIndex = 0; optionIndex < optionSet.length; optionIndex++) {

            // remember the option's class for later
            classIdSet.push( optionSet[optionIndex].class );

            // get ready to bail after remembering all the options if it's the right list
            if( optionSet[optionIndex].class == classId ) setFound = true;
        }


        if( setFound )  return classIdSet;

    }
}










function getBoardName() {
    return  $(".js-board-editing-target").text();
}

function trimUrl(url) {

    // remove board name from end of URL so it's consistent if name changes
    url = url.substr( 0, url.lastIndexOf("/") );
    return url;

}

function getListId($list) {

    // TO DO: THe list Id is currently just the list name, but maybe there's another id somewherer to use that will stay the same even if the name changes?
    // Or, compare with position and card number, etc. so that it van be relinked (silently?) here if broken.

    return  $list.find(".js-list-name-input").text();
}

function getListById(id) {

    let $list;

    $(".js-list").each( function () {
        let $this = $(this);
        let curListId = $this.find(".js-list-name-input").text();

        if(curListId == id){
            $list = $(this);
            return false; // to exit each loop
        }
    })

    if($list) {
        return $list;
    } else {
        // TO DO: What happens if it doesn't find the list?
        devWarning("No list with id '"+id+"' found.")
    }

}











export function visualizeAllBoardSettings() {

    visualizeAllListOptionsForAllLists();
    visualizeHeaderSetting();

    debugLog("Visualized all board settings");
    

}



function visualizeAllListOptionsForAllLists() {

    // Iterate through all $lists and reset them back to default first
    // This is because, even if the list isn't in the settings, it might still be showing visualisations from before a deletion of settings.
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

        // visualize each classId in the lists settings
        for(const classId of listSettings.classIds) {

            visualizeListOption({
                $list,
                newClass: classId,
            });

        }
    }

    debugLog("Visualize all saved list settings");


}




function resetListAppearance($list) {

    // TO DO: Remove any class defined as a user option from the list.

    let listId = getListId($list);
    for(const property in OPTIONS.LISTS) {

        visualizeListOption({
            $list,
            newClass: OPTIONS.LISTS[property][0].class, // Class of first option (Trello default)
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



export function saveListOption(props) {
    const {$list, newClass, oldClass} = props
    const listId = getListId($list);
   

    changeClassInListInSettings({
        classId: newClass,
        listId,
    });
    
    saveBoardSettings();

}






// export function saveHeaderOption(props) {
//     const {newId} = props
        
//     boardSettings.boardPresets[boardSettings.activeBoardPreset].headerSetting = newId;

//     saveBoardSettings();

// }










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


function removeClassIdsFromListInSettings(props) {
    const { listId, classIds } = props;
    let listSettings = getListSettingsRef(listId);

    // if there's no class Ids, there's nothing to remove
    if(listSettings.classIds == undefined)   return;

    // If there is, remove all instances of all classIds passed in
    for( let k = listSettings.classIds.length-1; k >= 0; k-- ) {

        // Check the item in settings against against all classIds passed in
        for(let classIndex = 0; classIndex < classIds.length; classIndex++ ) {

            if(classIds[classIndex] == listSettings.classIds[k]) {
                listSettings.classIds.splice(k, 1);
                break;  // break out because the array position in listSettings.classIds has now been deleted anyway
            }

        }

    }
    
    debugLog("Removed all classes of optionSet in from listId '"+ listId +"' in settings");
};








function addClassToListInSettings(props) {
    const { listId, classId } = props;
    let listSettings = getListSettingsRef(listId);

    listSettings.classIds.push(classId);

    debugLog("Added classId '"+ classId +"' from listId '"+ listId +"' in settings");
};





// removes any classes for a particular option set and adds in only the class passed in
function changeClassInListInSettings(props) {
    const { listId, classId } = props;
    const classIds = getClassIdSet(classId);
    let listSettings = getListSettingsRef(listId);

    // Remove all the classes for this visual setimport { Animate } from '@wordpress/components';
    // (There should only be one, but if there's somehow more they will all go)
    removeClassIdsFromListInSettings({
        classIds,
        listId
    });
    // Add back in the one just switched to
    listSettings.classIds.push(classId);

    debugLog("Changed to classId '"+ classId +"' within listId '"+ listId +"' in settings");
};








// function getBoardPresetRef(presetId) {
//     const boardListSettings = boardSettings.boardPresets[presetId].listSettings;

// }



function getListSettingsArray() {
    return boardSettings.boardPresets[boardSettings.activeBoardPreset].listSettings;
}



function getListSettingsRef(listId) {

    const boardListSettings = boardSettings.boardPresets[boardSettings.activeBoardPreset].listSettings;

    for(let k = 0; k < boardListSettings.length; k++) {

        if (listId == boardListSettings[k].listId)  return boardListSettings[k];

    }
    
    // It wasn't found in the settings, so put it there
    boardListSettings.push( createListSettings({
        listId
    }))


    return boardListSettings[ boardListSettings.length-1 ];
}















function getBoardPreset() {
    let boardSettings = getBoardSettings();

    if(boardSettings.boardPresets == undefined ) {
        boardSettings.boardPresets[boardSettings.activeBoardPreset] = initBoardPreset();
    };

    return boardSettings.boardPresets[boardSettings.activeBoardPreset];
}

function getBoardSettings() {

    if(boardSettings == undefined ) {
        devWarning("BoardSettings not created. Cannot get List Settings");
        return;
    };

    return boardSettings;

}








export function cycleBoardPresets() {

    // TO DO: This needs to iterate the activeBoardPreset forward, but only one past the current presets.
    // If iterating again after that, it should loop back to 0.
    // However, this means there needs to be a way to know if a preset has been changed from default so it can be deleted when cycled past if not.
    // So that the preset doesn't hang around and with each cycle increase the number of presets.

    // Instead of initialising presets that shouldn't hang around, a more robust solution should be designed.
    // Perhaps:
    // In the boardSettings, preset 0 is reserve for the default Trello appearances.
    // Whenever this is the activeBoardPreset, the functions which make changes to the settings first jump the activeBoardPreset number to it's length.
    // This way preset 0 is never touched and always represents Trello default a d because it will automatically shift to a saveable preset index, it means the user can just change at will and never overwrite it.

    // TO DO: For now this limits the number of presets to 2. The above should be implemented to make this dynamic.
    boardSettings.activeBoardPreset ++;
    boardSettings.activeBoardPreset %= 2; // TO DO

    initBoardPreset(boardSettings.activeBoardPreset);

    debugLog("Cycling board presets. New preset: '"+boardSettings.activeBoardPreset+"'");

    visualizeAllBoardSettings();
    saveBoardSettings();
}


export function cycleBoardHeader() {
    boardSettings.boardPresets[boardSettings.activeBoardPreset].headerSetting ++;
    boardSettings.boardPresets[boardSettings.activeBoardPreset].headerSetting %= 5; // TO DO: Maybe the header options can be abstracted to array of names so this could then be % length

    debugLog("Switching headers");

    visualizeHeaderSetting();
    saveBoardSettings();
}



function visualizeHeaderSetting() {


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
