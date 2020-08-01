import { userConsoleNote, devWarning, debugLog } from "./generic-helpers";
import { MATCH_METHODS } from "./enumerators";
import { OPTIONS } from "./user-options";


var $activeList;
var boardSettings;  // Wipe this for each board
var presetId = 0;





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
        presetId,
        classIds,
        customSettings
    } = props;


    if( listId == undefined )   devWarning("No listId defined in createListSettings");


    if( matchMethod == undefined )      matchMethod = MATCH_METHODS.EXACT;
    if( ! presetId )                    presetId = null;
    if( ! classIds )                    classIds = new Array();
    if( ! customSettings )              customSettings = new Object();


    return {
        listId,
        matchMethod,
        presetId,
        classIds,
        customSettings,
    }


}





function initBoardSettings(url) {
    presetId = 0;

    boardSettings = {

        settingsVersion: "2020.07.27",

        boardName: getBoardName(),
        boardUrl: trimUrl(url),
    
        boardPresets: [
            { // Board preset 1
    
                presetId: presetId,
                presetName: "Unnamed preset "+presetId,
                isActiveWhenCycling: true,
                
                headerSettings: "DEFAULT", // | HIDE_LEFT_BOARD_HEADER | SHOW_RIGHT_BOARD_HEADER | HIDE_ALL | SHOW_TRELLO_HEADER",
    
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


export function loadBoardSettings() {
    const boardId = boardSettings.boardUrl;

    chrome.storage.local.get(
        [boardId],
        function(result) {
            
            if(result[boardId] != undefined) {

                // TO DO: This is where it shoul run a function to update the board settings if the version is old.
                boardSettings = result[boardId];

            }

            debugLog("Loaded boardSettings from Chrome memory");
            debugLog(boardSettings);
            
        }
    );

}


export function saveBoardSettings() {
    const boardId = boardSettings.boardUrl;

    chrome.storage.local.set({[boardId]: boardSettings}, function() {
        userConsoleNote("Board settings for " + boardSettings.boardUrl + " saved to Chrome memory.")
    });


    debugLog("Saved boardSettings to Chrome memory");
    debugLog(boardSettings);
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
    console.log(id);
    console.log($("#" + id).closest(".js-list"));
    
    return $("#" + id).closest(".js-list");
    //return $element.closest(".js-list");
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












export function visualizeListOption(props) {
    const {$list, newClass, oldClass} = props

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


    debugLog( "Saved List Option" );
    debugLog(boardSettings);
}






export function saveHeaderOption(props) {
    const {newId} = props
        
    // TO DO put header setting into boardSettings


    saveBoardSettings();

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
    console.log("classIds");
    console.log(classIds);
    let listSettings = getListSettingsRef(listId);

    removeClassIdsFromListInSettings({
        classIds,
        listId
    });
    listSettings.classIds.push(classId);

    debugLog("Changed classId '"+ classId +"' within listId '"+ listId +"' in settings");
};









function getListSettingsRef(listId) {

    const boardListSettings = boardSettings.boardPresets[presetId].listSettings;

    for(let k = 0; k < boardListSettings.length; k++) {

        if (listId == boardListSettings[k].listId)  return boardListSettings[k];

    }
    
    console.log("listId: " + listId);

    // It wasn't found in the settings, so put it there
    boardListSettings.push( createListSettings({
        listId
    }))


    return boardListSettings[ boardListSettings.length-1 ];
}















function getBoardPreset() {
    let boardSettings = getBoardSettings();

    if(boardSettings.boardPresets == undefined ) {
        boardSettings.boardPresets[presetId] = initBoardPreset();
    };

    return boardSettings.boardPresets[presetId];
}

function getBoardSettings() {

    if(boardSettings == undefined ) {
        devWarning("BoardSettings not created. Cannot get List Settings");
        return;
    };

    return boardSettings;

}












