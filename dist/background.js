/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background/background.js":
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// NOTE:
// Console logs in this file won't sho up because it is a background script and in a different isolated world.
// Setting up a dev window for this is a task for a future time if necessary.
// Information to store about the current tab for use later
///////////////////////////////////////////////////////////
var tabUrl; // chrome.runtime.onMessage.addListener(
// function(request, sender, sendResponse) {
//     if (request.greeting == "hello")
//     sendResponse({farewell: "goodbye"});
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  //notifyContent_newUrl();
  if (changeInfo.url) {
    // specifiy which tab to send it to
    console.log("TAB CREATED: tab:");
    console.log(tab);
    chrome.tabs.query(query_activeTrelloTab, tabs => {
      // send it
      chrome.tabs.sendMessage(tabs[0].id, {
        url: tab.url
      });
    });
  }
});
chrome.tabs.onCreated.addListener((tabId, changeInfo, tab) => {
  //notifyContent_newUrl();
  if (changeInfo.url) {
    // specifiy which tab to send it to
    console.log("SENDING TAB UPDATE: url = " + changeInfo.url);
    chrome.tabs.query(query_activeTrelloTab, tabs => {
      // send it
      chrome.tabs.sendMessage(tabs[0].id, {
        url: changeInfo.url
      });
    });
  }
}); // since only one tab should be active and in the current window at once
// the return variable should only have one entry
// and should be empty if it's not a trello board

const query_activeTrelloTab = {
  active: true,
  // If the tab is active in the window.
  currentWindow: true,
  // The window in which the code is executing.
  url: "https://trello.com/b/*"
}; // function notifyContent_newUrl() {
//     chrome.tabs.query( query_activeTrelloTab, (tabs) => {
//         tabUrl = tabs[0].url;
//     });
// }

/***/ })

/******/ });
//# sourceMappingURL=background.js.map