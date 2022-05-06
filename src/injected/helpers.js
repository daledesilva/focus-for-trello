import { userConsoleNote, devWarning, debugLog } from "./generic-helpers";
import { MATCH_METHODS } from "./enumerators";
import { OPTIONS } from "./user-options";

import { plugin } from "../metadata";


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
                initBoardSettings({
                    completeUrl: request.url
                });
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





function initBoardSettings(props) {

    const {
        completeUrl,            // ie. https://trello.com/b/KNETfkws/general
        trimmedUrl,             // ie. https://trello.com/b/KNETfkws
    } = props;


    boardSettings = {

        settingsVersion: "2020.07.27",

        boardName: getBoardName(),
        boardUrl: trimmedUrl || trimUrl(completeUrl),
    
        activeBoardPreset: 0,
        boardPresets: [
            { // Board preset 1
    
                // presetId: 0,
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




function createDefaultPreset(index) {

    // If it already exists, then bail.
    // if(boardSettings.boardPresets[index])  return;


    boardSettings.boardPresets[index] = {
    
        // presetId: id,
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

            debugLog("Loaded these boardSettings from Chrome memory:");
            debugLog(boardSettings);
            
            if(result[boardId] != undefined) {

                // TO DO: This is where it should run a function to update the board settings if the settings version number is old.

                // Set the boardSettings from those loaded
                boardSettings = result[boardId];
                // define an activePreset if there wasn't one
                if(!boardSettings.activeBoardPreset)    boardSettings.activeBoardPreset = 0;

                // TO DO: This will causes issues whenever teh result is returned before the Dom is ready.
                // There needs to be a check to visualise as immediately if dom is already ready or initialise when it is.
                // However, Dom might take a while, might be best to run on every mutation update?
                visualizeAllBoardSettings();

            }

            
        }
    );

}


// Used by saveBoardSettings
function moveActivePresetIfInDefaultSlot() {
    if(boardSettings.activeBoardPreset == 0) {
        console.log('Active Preset is 0');
        console.log('boardSettings.boardPresets',boardSettings.boardPresets);
        // Move active preset to end of array
        boardSettings.boardPresets.push(boardSettings.boardPresets[0]);
        boardSettings.activeBoardPreset = boardSettings.boardPresets.length-1;
        // Reset the preset at the start
        createDefaultPreset(0);
        console.log('boardSettings.boardPresets[0]',boardSettings.boardPresets[0]);
    }
}


export function saveBoardSettings() {
    debugLog("Sending boardSettings to save in Chrome memory");
    debugLog(boardSettings);

    const boardId = boardSettings.boardUrl;

    // Asynchronous callback
    chrome.storage.local.set({[boardId]: boardSettings}, function() {
        userConsoleNote("Board settings for " + boardSettings.boardUrl + " saved to Chrome memory.");
    });

}




export function nukePresetSettings() {
    userConsoleNote("Erasing current board preset");

    let presetIndexToDelete = boardSettings.activeBoardPreset;

    // Only allow deleting if it's not the default preset
    if(presetIndexToDelete > 0) {
        boardSettings.boardPresets.splice(presetIndexToDelete, 1);
        boardSettings.activeBoardPreset --;
    }

    userConsoleNote("Preset settings erased, previous remaining preset activated");

    visualizeAllBoardSettings();
    saveBoardSettings();

}



export function nukeBoardSettings() {
    userConsoleNote("Erasing board settings for " + boardSettings.boardUrl );

    initBoardSettings({
        trimmedUrl: boardSettings.boardUrl,
    });

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

    // TODO: This can all be done more efficiently with indices
    let currentOptionIndex = getListsCurrentOptionInSetAsIndex($list, optionSet);
    let nextOptionIndex = getNextOptionIndex(currentOptionIndex, optionSet);

    let currentOption = optionSet[ currentOptionIndex ]
    let nextOption = optionSet[ nextOptionIndex ];

    

    visualizeListOption({
        $list: $list,
        newClass: nextOption.class,
        oldClass: currentOption.class
    })
    

    changeAndSaveListOption({
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

    // Iterate through all $lists and reset any previously applied settings back to default
    $(".js-list").each( function () {
        let $this = $(this);
        resetListAppearance($this);    
    })

    // debugLog("Reset all list appearances");
    

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

    // debugLog("Visualize all saved list settings");


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



export function changeAndSaveListOption(props) {
    const {$list, newClass, oldClass} = props
    const listId = getListId($list);

    changeClassInListInSettings({
        classId: newClass,
        listId,
    });

    moveActivePresetIfInDefaultSlot();
    saveBoardSettings();

}


export function iterateAndSaveHeaderSetting(props) {
    boardSettings.boardPresets[boardSettings.activeBoardPreset].headerSetting ++;
    boardSettings.boardPresets[boardSettings.activeBoardPreset].headerSetting %= 5; // TODO: The header options should be abstracted to array of names so this could then be %= length
    moveActivePresetIfInDefaultSlot();
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

    // Remove all the classes for this styling set
    // (There should only be one, but if there's somehow more they will all go as a failsafe)
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















// function getBoardPreset() {
//     let boardSettings = getBoardSettings();

//     if(boardSettings.boardPresets == undefined ) {
//         boardSettings.boardPresets[boardSettings.activeBoardPreset] = createDefaultPreset();
//     };

//     return boardSettings.boardPresets[boardSettings.activeBoardPreset];
// }

function getBoardSettings() {

    if(boardSettings == undefined ) {
        devWarning("BoardSettings not created. Cannot get List Settings");
        return;
    };

    return boardSettings;

}








export function cycleBoardPresets() {

    boardSettings.activeBoardPreset ++;
    boardSettings.activeBoardPreset %= boardSettings.boardPresets.length;

    debugLog("Cycling board presets. New preset: '"+boardSettings.activeBoardPreset+"'");

    visualizeAllBoardSettings();
    saveBoardSettings();
}


export function cycleBoardHeader() {
    iterateAndSaveHeaderSetting()
    visualizeHeaderSetting();
}



function visualizeHeaderSetting() {

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
