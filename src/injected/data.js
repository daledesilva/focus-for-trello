import { userConsoleNote, devWarning, debugLog } from "./generic-helpers";

import { getBoardName, trimUrl } from "./helpers";
import { OPTIONS } from "./user-options";
import { MATCH_METHODS } from "./enumerators";




var boardSettings;  // Wipe this for each board





export function createListSettings(props) {
    
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





export function initBoardSettings(props) {

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
                presetName: null,
                isSaved: false,
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




export function createDefaultPreset(index) {

    // If it already exists, then bail.
    // if(boardSettings.boardPresets[index])  return;


    boardSettings.boardPresets[index] = {
    
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


    debugLog("Board Preset Initialised");
    debugLog(boardSettings);
}





// function getBoardPresetRef(presetId) {
//     const boardListSettings = boardSettings.boardPresets[presetId].listSettings;

// }



export function getListSettingsArray() {
    return boardSettings.boardPresets[boardSettings.activeBoardPreset].listSettings;
}



export function getListSettingsRef(listId) {

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

export function useBoardSettings() {

    function setBoardSettings(newBoardSettings) {
        boardSettings = newBoardSettings;
    }

    return [boardSettings, setBoardSettings];
}



export function getBoardPresets() {
    return boardSettings.boardPresets;
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




// removes any classes for a particular option set and adds in only the class passed in
export function changeClassInListInSettings(props) {
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