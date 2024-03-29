import { userConsoleNote, devWarning, debugLog } from "./generic-helpers";



export function loadBoardSettings(boardUrl, onLoad) {
    const boardId = boardUrl;

    chrome.storage.local.get(
        [boardId],
        function(result) {

            if(result[boardId] != undefined) {

                // TO DO: This is where it should run a function to update the board settings if the settings version number is old.

                // Set the boardSettings from those loaded
                let loadedBoardSettings = result[boardId];

                debugLog("Loaded these boardSettings from Chrome memory:");
                debugLog(loadedBoardSettings);

                // define an activePreset if there wasn't one
                if(!loadedBoardSettings.activeBoardPreset)    loadedBoardSettings.activeBoardPreset = 0;

                onLoad(loadedBoardSettings);

            } else {
                debugLog("Tried to load boardSettings passing no URL");
            }

            
        }
    );

}




export function saveBoardSettings(boardSettings) {

    debugLog("Sending boardSettings to save in Chrome memory");
    debugLog(boardSettings);

    const boardId = boardSettings.boardUrl;

    // Asynchronous callback
    chrome.storage.local.set({[boardId]: boardSettings}, function() {
        userConsoleNote("Board settings for " + boardSettings.boardUrl + " saved to Chrome memory.");
    });

}