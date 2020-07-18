import { userConsoleNote, devWarning } from "./generic-helpers";


var $activeList;


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
    })

}






var boardUrl;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        console.log("URL RECEIVED: " + request.url);

        if(request.url)     boardUrl = request.url;
   
    }
);






function getBoardName() {
    return  $(".js-board-editing-target").text();
}

function getBoardId() {

    // remove board name from end of URL so it's consistent if name changes
    let id = boardUrl.substr( 0, boardUrl.lastIndexOf("/") );
    return id;

}

function getListId(props) {
    const { $list } = props;

    // TO DO: THe list Id is currently just the list name, but maybe there's another id somewherer to use that will stay the same even if the name changes?
    // Or, compare with position and card number, etc. so that it van be relinked (silently?) here if broken.

    return  $list.find(".js-list-name-input").text();
}





export function visualizeListOption(props) {
    const {$list, newClass, oldClass} = props

    $list.addClass(newClass);
    if(oldClass) $list.removeClass(oldClass);

}





export function saveListOption(props) {
    const {$list, newClass} = props

    let boardName = getBoardName();
    let boardId = getBoardId();

    let listName = getListId({ $list });
    


    // chrome.storage.sync.set({'value': theValue}, function() {
    //     // Notify that we saved.
    //     message('Settings saved');
    // });




    userConsoleNote( "Saving '" + listName + "' list in board '" + boardName + "'" );
    userConsoleNote( "Board ID: " + boardId );

}






// Each board
var boardSettings = {

    boardName: "The name of the board",
    boardUrl: "The URL of the board",

    boardPresets: [
        { // Board preset 1

            presetName: "Board preset name",
            isActiveWhenCycling: true,
            
            headerSettings: "DEFAULT | HIDE_LEFT_BOARD_HEADER | SHOW_RIGHT_BOARD_HEADER | HIDE_ALL | SHOW_TRELLO_HEADER",

            listSettings: [
                { // A list's settings
                    listId: "DONE,FINISHED,COMPLETE", // It's name
                    matchMethod: "EXACT | CONTAINS",
                    presetId: "The ID of a global preset to apply (optional)",
                    classes: ["CSS name of each class to apply"],
                    customSettings: {} // a place for any customisations if made possible
                },
                { // A list's settings

                }
            ]

        },
        { // Board preset 2
        
        }

    ]

}