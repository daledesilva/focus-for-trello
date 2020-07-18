
// NOTE:
// Console logs in this file won't sho up because it is a background script and in a different isolated world.
// Setting up a dev window for this is a task for a future time if necessary.



// Information to store about the current tab for use later
///////////////////////////////////////////////////////////
var tabUrl;










// chrome.runtime.onMessage.addListener(
// function(request, sender, sendResponse) {

//     if (request.greeting == "hello")
//     sendResponse({farewell: "goodbye"});

// });






chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab) => {
    //notifyContent_newUrl();

    if(changeInfo.url) {
        // specifiy which tab to send it to

        console.log("TAB CREATED: tab:");
        console.log(tab);

        chrome.tabs.query( query_activeTrelloTab, (tabs) => {
            // send it

            chrome.tabs.sendMessage( tabs[0].id, {
                url: tab.url
            } );
        });
    }
})




chrome.tabs.onCreated.addListener( (tabId, changeInfo, tab) => {
    //notifyContent_newUrl();

    if(changeInfo.url) {
        // specifiy which tab to send it to

        console.log("SENDING TAB UPDATE: url = "+changeInfo.url);

        chrome.tabs.query( query_activeTrelloTab, (tabs) => {
            // send it

            chrome.tabs.sendMessage( tabs[0].id, {url: changeInfo.url} );
        });
    }
})





// since only one tab should be active and in the current window at once
// the return variable should only have one entry
// and should be empty if it's not a trello board
const query_activeTrelloTab = {
    active: true, // If the tab is active in the window.
    currentWindow: true, // The window in which the code is executing.
    url: "https://trello.com/b/*"
}




// function notifyContent_newUrl() {

//     chrome.tabs.query( query_activeTrelloTab, (tabs) => {

//         tabUrl = tabs[0].url;

        

//     });

// }



