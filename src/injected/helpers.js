import {devWarning} from "./generic-helpers";


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

    console.log("currentOption:");
    console.log(currentOption);

    console.log("nextOptions:");
    console.log(nextOption);

    console.log("$list:");
    console.log($list);

    // visually set options
    $list.removeClass(currentOption.class);
    $list.addClass(nextOption.class);

    // save options

}




