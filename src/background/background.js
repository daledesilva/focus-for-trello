
// NOTE:
// Console logs in this file won't sho up because it is a background script and in a different isolated world.
// Setting up a dev window for this is a task for a future time if necessary.





// TO DO: Even though this has a filter, perhaps only starting it when a trello page is loaded and removing it when the trello page is closed will be better?
// NOTE: That may create complications when multiple windows of trello are open

chrome.webNavigation.onCompleted.addListener(
    // This covers the initial load of a new page or if the page was open already and is just being refreshed
    // It doesn't use onDOMContentLoaded because that fires before the content script listeners are set up
    
    function(details) {

        // console.log(details.tabId + ":   "+details.url);
        // alert("web nav completed");

        chrome.tabs.sendMessage( details.tabId, {
            url: details.url
        } );


    }, {
        // filter
        url: [ {urlContains : "trello.com/b/"} ]
    }
);


chrome.webNavigation.onHistoryStateUpdated.addListener( // Board changes within the same tab aren't seen by onCompleted or onCommitted, so this covers those.
    function(details) {

        // console.log(details.tabId + ":   "+details.url);
        // alert("history updated");

        chrome.tabs.sendMessage( details.tabId, {
            url: details.url
        } );


    }, {
        // filter
        url: [ {urlContains : "trello.com/b/"} ]
    }
);



