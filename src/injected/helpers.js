import { userConsoleNote, devWarning, debugLog } from "./generic-helpers";
import { MATCH_METHODS } from "./enumerators";


import { plugin } from "../metadata";
import { loadBoardSettings, saveBoardSettings } from "./io";
import { renderFocusUi, renderBoard, renderHeader, renderListOption } from "./render";
import { createListSettings, initBoardSettings, createDefaultPreset, getListSettingsArray, getListSettingsRef, getBoardPresets, useBoardSettings, changeClassInListInSettings } from "./data";


var $activeList;






// Listeners to update variables
////////////////////////////////

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        // If the chrome plugin says the page URL changed
        if(request.url) {
            debugLog(request.url);

            // Initialise this board's settings immediately, incase one doesn't load.
            initBoardSettings({
                completeUrl: request.url
            });            
            const [boardSettings] = useBoardSettings();

            // Then load in saved settings (will not overide if saved settings don't exist)
            loadBoardSettings( boardSettings.boardUrl, (newBoardSettings) => {

                initBoardSettings({
                    boardSettings: newBoardSettings
                });   
                // TO DO: This will causes issues whenever the result is returned before the Dom is ready.
                // There needs to be a check to visualise as immediately if dom is already ready or initialise when it is.
                // However, Dom might take a while, might be best to run on every mutation update?
                renderBoard();
                renderFocusUi();

            } );

        }
    }
);




























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
    saveBoardSettings(boardSettings);
    renderBoard();
    renderFocusUi();
}



export function nukeBoardSettings() {
    const [boardSettings] = useBoardSettings();

    initBoardSettings({
        trimmedUrl: boardSettings.boardUrl,
    });

    renderBoard();
    renderFocusUi();
}







////////////////////////////////








export function setActiveList($list) {
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






function getCurrentListOptionIndex($list, optionSet) {
    
    let currentIndex;

    // Find the current item in the optionSet
    for(let index = 0; index < optionSet.length; index++) {
        let option = optionSet[index];

        if($list.hasClass(option.class)) {
            currentIndex = index;
            break;
        }
    };

    // If no option set yet, start at index 0
    if(currentIndex == undefined) {
        currentIndex = 0;
    }

    return currentIndex;
    
}


function getCurrentListOption($list, optionSet) {
    return optionSet[ getCurrentListOptionIndex($list, optionSet) ];
}
function getNextListOption($list, optionSet) {
    const curIndex = getCurrentListOptionIndex($list, optionSet);
    const nextIndex = (curIndex + 1) % optionSet.length;
    return optionSet[nextIndex];
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


export function cycleListOption($list, optionSet) {
    const [boardSettings, setBoardSettings] = useBoardSettings();
    let newBoardSettings = _.cloneDeep(boardSettings);
    
    const currentOption = getCurrentListOption($list, optionSet);
    const nextOption = getNextListOption($list, optionSet);

    newBoardSettings = changeListOption({
        curBoardSettings: newBoardSettings,
        $list: $list,
        newClass: nextOption.class,
        oldClass: currentOption.class
    })

    newBoardSettings = moveActivePresetIfInDefaultSlot(newBoardSettings);
    setBoardSettings(newBoardSettings);
    saveBoardSettings(newBoardSettings);
    renderListOption({
        $list: $list,
        newClass: nextOption.class,
        oldClass: currentOption.class
    })
    renderFocusUi();
}


export function cycleBoardHeader() {
    const [boardSettings, setBoardSettings] = useBoardSettings();
    let newBoardSettings = boardSettings;
    
    boardSettings.boardPresets[boardSettings.activeBoardPreset].headerSetting ++;
    boardSettings.boardPresets[boardSettings.activeBoardPreset].headerSetting %= 4; // TODO: The header options should be abstracted to array of names so this could then be %= length

    newBoardSettings = moveActivePresetIfInDefaultSlot(newBoardSettings);
    setBoardSettings(newBoardSettings);
    saveBoardSettings(newBoardSettings);   // TODO: This needs to save the activePresetIndex, but it shouldn't really be saving all other settings as well.
    renderHeader();
    renderFocusUi();
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










function moveActivePresetIfInDefaultSlot(curBoardSettings) {
    let newBoardSettings = _.cloneDeep(curBoardSettings);

    if(newBoardSettings.activeBoardPreset == 0) {

        // Move active preset to end of array
        newBoardSettings.boardPresets.push(newBoardSettings.boardPresets[0]);
        newBoardSettings.activeBoardPreset = newBoardSettings.boardPresets.length-1;

        // Reset the preset at the start
        newBoardSettings = resetDefaultPreset(newBoardSettings);

    }

    return newBoardSettings;
}



function resetDefaultPreset(curBoardSettings) {
    let newBoardSettings = _.cloneDeep(curBoardSettings);
    const defaultPresetIndex = 0;


    // TODO: Is there an init preset function somewhere that can be used instead of this?
    newBoardSettings.boardPresets[defaultPresetIndex] = {
    
        // presetId: id,
        presetName: null,
        isSaved: false,
        isActiveWhenCycling: true,
        
        headerSetting: 0,//"DEFAULT", // | HIDE_LEFT_BOARD_HEADER | SHOW_RIGHT_BOARD_HEADER | HIDE_ALL | SHOW_TRELLO_HEADER",

        listSettings: [
            // createListSettings({}),
            // createListSettings({}),
        ]

    }

    return newBoardSettings;
}










function changeListOption(props) {
    const {curBoardSettings, $list, newClass, oldClass} = props
    let newBoardSettings = _.cloneDeep(curBoardSettings);
    const listId = getListId($list);

    newBoardSettings = changeClassInListInSettings({
        curBoardSettings: newBoardSettings,
        classId: newClass,
        listId,
    });
    
    return newBoardSettings;
}








// export function saveHeaderOption(props) {
//     const {newId} = props
//     const [boardSettings, setBoardSettings] = useBoardSettings();
        
//     boardSettings.boardPresets[boardSettings.activeBoardPreset].headerSetting = newId;

//     setBoardSettings(boardSettings);

// }







export function cycleBoardPresets() {
    const [boardSettings, setBoardSettings] = useBoardSettings();

    boardSettings.activeBoardPreset ++;
    boardSettings.activeBoardPreset %= boardSettings.boardPresets.length;

    setBoardSettings(boardSettings);
    saveBoardSettings(boardSettings);   // TODO: This needs to save the activePresetIndex, but it shouldn't really be saving all other settings as well.
    renderBoard();
    renderFocusUi();
}

export function activateBoardPreset(index) {
    const [boardSettings, setBoardSettings] = useBoardSettings();

    boardSettings.activeBoardPreset = index;

    setBoardSettings(boardSettings);
    renderBoard();
    renderFocusUi();
}








