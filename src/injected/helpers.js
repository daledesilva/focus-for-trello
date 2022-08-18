import { userConsoleNote, devWarning, debugLog } from "./generic-helpers";
import { MATCH_METHODS } from "./enumerators";


import { plugin } from "../metadata";
import { loadBoardSettings, saveBoardSettings } from "./io";
import { renderBoard, visualizeListOption, renderHeader, createOrRefreshFocusUi } from "./render";
import { createListSettings, initBoardSettings, createDefaultPreset, getListSettingsArray, getListSettingsRef, getBoardPresets, useBoardSettings, changeClassInListInSettings } from "./data";


var $activeList;






// Listeners to update variables
////////////////////////////////

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        const [existingBoardSettings] = useBoardSettings();

        // If the chrome plugin says the page URL changed
        if(request.url) {

            if(
                existingBoardSettings == undefined ||
                existingBoardSettings.boardUrl != request.url
                )
            {
                // Initialise the boardSettings object
                initBoardSettings({
                    completeUrl: request.url
                });
            }
            
            // TODO: This happens twice and so is very clunky
            const [boardSettings, setBoardSettings] = useBoardSettings();

            // Then load in saved settings (will not overide if saved settings don't exist)
            loadBoardSettings( boardSettings.boardUrl, (newBoardSettings) => {

                debugLog("board settings loaded!!!!")
                setBoardSettings(newBoardSettings);
                // TO DO: This will causes issues whenever the result is returned before the Dom is ready.
                // There needs to be a check to visualise as immediately if dom is already ready or initialise when it is.
                // However, Dom might take a while, might be best to run on every mutation update?
                renderBoard(newBoardSettings);

            } );

        }
    }
);




















// Used by saveBoardSettings
function moveActivePresetIfInDefaultSlot() {
    const [boardSettings, setBoardSettings] = useBoardSettings();

    if(boardSettings.activeBoardPreset == 0) {

        // Move active preset to end of array
        boardSettings.boardPresets.push(boardSettings.boardPresets[0]);
        boardSettings.activeBoardPreset = boardSettings.boardPresets.length-1;

        // Reset the preset at the start
        createDefaultPreset(0);

    }
    setBoardSettings(boardSettings);
}







export function deletePresetSettings(presetIndex) {
    const [boardSettings, setBoardSettings] = useBoardSettings();
    const presetIndexToDelete = presetIndex || boardSettings.activeBoardPreset;

    // Only allow deleting if it's not the default preset
    if(presetIndexToDelete > 0) {
        boardSettings.boardPresets.splice(presetIndexToDelete, 1);
        boardSettings.activeBoardPreset --;
        userConsoleNote(`Preset ${presetIndex} settings erased, previous remaining preset activated`);
    } else {
        userConsoleNote(`Default preset can't be erased`);
    }

    setBoardSettings(boardSettings);
    saveBoardSettings();
    renderBoard();
    createOrRefreshFocusUi();
}



export function nukeBoardSettings() {
    const [boardSettings] = useBoardSettings();

    initBoardSettings({
        trimmedUrl: boardSettings.boardUrl,
    });

    saveBoardSettings();
    renderBoard();
    createOrRefreshFocusUi();
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


    // recreate this so it's updated
    createOrRefreshFocusUi();

}






















export function getBoardName() {
    return  $(".js-board-editing-target").text();
}

export function trimUrl(url) {

    // remove board name from end of URL so it's consistent if name changes
    url = url.substr( 0, url.lastIndexOf("/") );
    return url;

}

export function getListId($list) {

    // TO DO: THe list Id is currently just the list name, but maybe there's another id somewherer to use that will stay the same even if the name changes?
    // Or, compare with position and card number, etc. so that it van be relinked (silently?) here if broken.

    return  $list.find(".js-list-name-input").text();
}

export function getListById(id) {

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








// export function saveHeaderOption(props) {
//     const {newId} = props
        
//     boardSettings.boardPresets[boardSettings.activeBoardPreset].headerSetting = newId;

//     saveBoardSettings(boardSettings);

// }







export function cycleBoardPresets() {
    const [boardSettings, setBoardSettings] = useBoardSettings();

    boardSettings.activeBoardPreset ++;
    boardSettings.activeBoardPreset %= boardSettings.boardPresets.length;

    setBoardSettings(boardSettings);
    saveBoardSettings();
    renderBoard();
    createOrRefreshFocusUi();
}

export function activateBoardPreset(index) {
    const [boardSettings, setBoardSettings] = useBoardSettings();

    boardSettings.activeBoardPreset = index;

    setBoardSettings(boardSettings);
    saveBoardSettings();
    renderBoard();
    createOrRefreshFocusUi();
}


export function cycleBoardHeader() {
    const [boardSettings, setBoardSettings] = useBoardSettings();
    
    boardSettings.boardPresets[boardSettings.activeBoardPreset].headerSetting ++;
    boardSettings.boardPresets[boardSettings.activeBoardPreset].headerSetting %= 5; // TODO: The header options should be abstracted to array of names so this could then be %= length
    moveActivePresetIfInDefaultSlot();

    setBoardSettings(boardSettings);
    saveBoardSettings();
    renderHeader();
    createOrRefreshFocusUi();
}





