import "./style.scss";

// var $ = require( "jquery" );

// ==UserScript==
    // @name         Format Trello
    // @namespace    http://tampermonkey.net/
    // @version      0.22
    // @description
    // @author       Dale de Silva www.ublik-om.net
    // @match        https://trello.com/*
    // @grant        none
    // ==/UserScript==


    // Notes about development
    //////////////////////////
    // This script uses jquery annotation but doesn't "require" jquery as Trello already does.
    //////////////////////////


    /*
    19/09/2019
    - Adjustments to page change observer so that it fires immediately when started.
    - Change to @match property to include all of Trello as clicking into a board doesn't cause a recheck for scripts unless you manually refresh
    */







   var pageChangeTimeOutID;
   var pageStartTimerID;
   var $latestMutations = $("body");




   function loadIcons() {
       'use strict';

       let htmlStr = '<script src="https://kit.fontawesome.com/c0535646a5.js" crossorigin="anonymous"></script>';
       $("head").append(htmlStr);

   }



   function injectCss() {
       'use strict';

       let customCss = "";

       




       // add all the created css to the document
       //$("head").append("<style type='text/css'>" + customCss + "</style>");


   }


   var lastInterpreted = null;
   function interpretLists() {
       'use strict';

       //console.log("Restyling lists");

       $latestMutations.find(".list-header h2").each( function() {

           let $title = $(this);
           let titleText = $title.text().toUpperCase();

           if( titleText.indexOf("DONE") >= 0 || titleText.indexOf("FINISHED") >= 0 || titleText.indexOf("COMPLETE") >= 0) {
               $title.closest(".js-list").addClass("done");

           } else if( titleText.indexOf("GOAL") >= 0 || titleText.indexOf("FUTURE") >= 0 ) {
               $title.closest(".js-list").addClass("future");

           } else if( titleText.indexOf("DITCH") >= 0 || titleText.indexOf("ABANDON") >= 0 ) {
                $title.closest(".js-list").addClass("abandoned");

           } else if( titleText.indexOf("DUMP") >= 0 ) {
               $title.closest(".js-list").addClass("brain-dump");

           }


       });



   }



   function createListButtons() {
       'use strict';


       let $listSettings = $latestMutations.find(".pop-over-header").first();
       // Bail if the list settings popup isn't present
       if($listSettings.length == 0) {
           //console.log("list settings popup not found.");
           return;
       }
       console.log("Adjusting list settings.");






       let htmlStr = "";


       htmlStr += "<div class='ft_list-btn-group'>";

       //htmlStr += "	<a class='list-immediate-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-cog'></i></span></a>";




       // LABELS TOGGLE
       // Use to...
       // - Show according to list settings
       // - Show labels normally (Trello default)
       // - Show labels as coloured bar on side
       // - Hide labels
       htmlStr += "<a href='#' class='ft_pop-over-header-btn left-most icon-sm'><i class='fas fa-tag'></i></a>";
       // Global button...
       // - Overides this

       // User visibility always hidden unless global list size settings turned off
       // TO DO: What is this talking about?

       // DUE DATES TOGGLE
       // Use to...
       // - Show according to list settings
       // - Show due dates normally (Trello default)
       // - Show colour & icon only for due soon and overdue
       // - Hide due dates
       htmlStr += "<a href='#' class='ft_pop-over-header-btn icon-sm'><i class='fas fa-clock'></i></a>";
       // Global button...
       // - Overides this

       // DETAILS TOGGLE
       // Use to...
       // - Show according to list settings
       // - Show any badges other than due dates and users, and checklists normally (Trello default)
       // - Hide any badges other than due dates and users, and display checklists as progress bars
       // - Hide any badges and checklists other than due dates and users
       htmlStr += "<a href='#' class='ft_pop-over-header-btn icon-sm'><i class='fas fa-comment-alt'></i></a>";
       // Global button...
       // - Overides this only if list is not set to shrink ????

       // IMAGES TOGGLE
       // Use to..
       // - Show inline image previews (Trello default)
       // - Reduce images previews to a small horizontal bar
       // - Hide image previews
       htmlStr += "<a href='#' class='ft_pop-over-header-btn icon-sm'><i class='fas fa-image'></i></a>";
       // Global button...
       // - Overides this only if list is not set to shrink ????

       // LIST APPEARANCE TOGGLE
       // Use to...
       // - Show lists normally (Trello default)
       // - Shrink list
       // - Shrink list and darken
       // - Shrink list and fade
//        htmlStr += "<a href='#' class='ft_pop-over-header-btn icon-sm'><i class='fab fa-trello'></i></a>";
       htmlStr += "<a href='#' class='ft_pop-over-header-btn icon-sm'><i class='fas fa-poll fa-rotate-180'></i></a>";
       // Global button...
       // - Overides all these




       // LIST SETTINGS BUTTON
       // Use to...
       // - Change name of list it is looking for - toggle between "match" and "contains" (be warey of if the change it to a word that's not in any list the settings will be lost - perhaps it saves elsewhere (too?)?)
       // - Copy text based settings string?
       // - Paste text based settings string?
       htmlStr += "<a href='#' class='ft_pop-over-header-btn icon-sm'><i class='fas fa-cog'></i></a>";

       // LIST VISIBILITY BUTTON
       // Use to...
       // - Hide/Unhide list
       htmlStr += "<a href='#' class='ft_pop-over-header-btn icon-sm'><i class='fas fa-eye'></i></a>";  // eye-slash




       htmlStr += "</div>"; //ft_list-btn-group

       // apply as button set that appears to right of 3 dots in list when clicked





       //let $listExtrasMenus = $(".list-header-extras-menu"); // .board-header-btns
       //$listExtrasMenus.prepend(htmlStr);


       // remove text from list settings header
       $listSettings.find(".pop-over-header-title").html("."); // TO DO: This is visible, need to put in a blank so the header line stays visible without adding anything new.
       $listSettings.prepend(htmlStr);


   }





   function createHeaderButtons() {
       'use strict';
       console.log('attempting to create header buttons');
       
       
       
       let $rightHeader = $latestMutations.find(".mod-right").first();
       // Bail if the right header isn't present in anything that's modified
       if($rightHeader.length == 0) {
           console.log("right header not found.");
           return;
       }

       
       
       let htmlStr = "";


       htmlStr += "	<a class='board-header-btn board-header-btn-without-icon' href='#'><span class='board-header-btn-text'>Re-Format</span></a>";
       htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-save'></i></span></a>"; // check-circle
       htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-plus-square'></i></span></a>";
       htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-backspace'></i></span></a>";




       // find the standard Trell board header and the div that holds all buttons that float to the right
       // put in the new button
       //let $rightSideHeader = $(".mod-right"); // .board-header-btns
       $rightHeader.prepend(htmlStr);

       console.log($rightHeader);
       console.log('header buttons created');
   }





   function startPageChangeObserver() {

       var pageChangeObserver = new MutationObserver(function(mutations) {
            
           // erase previous mutation list and create empty jquery object
           $latestMutations = $();
           
           for (const mutation of mutations) {

               if( mutation.addedNodes !== null ) { // If there are new nodes added
                   $latestMutations = $latestMutations.add( mutation.addedNodes );
               }
               
           }
           
           immediatePageAdjustments();

           window.clearTimeout(pageChangeTimeOutID);
           pageChangeTimeOutID = window.setTimeout(delayedPageChangeAdjustments, 1000);
           

       });

       pageChangeObserver.observe(document.documentElement, {
           childList: true,
           subtree: true,
       });

   }








   // Actions that need to be run on page initialisation
   function immediatePageInitialisation() {
       console.log("Immediate page Initialisation");

       // only on initial page load (which can be the Trello home page and not again)
       loadIcons();
       injectCss();
       startPageChangeObserver();

       // and everything else that needs to run on any page update
       immediatePageAdjustments();

   }


   // Actions that need to be run on page initialisation
   function delayedPageInitialisation() {
       console.log("Delayed page Initialisation");

       // only on initial page load (which can be the Trello home page and not again)
       
       
       // and everything else that needs to run on any page update
       delayedPageChangeAdjustments();

   }



   // On any page update, do anything that needs to happen immediately (no visual discrepancy)
   function immediatePageAdjustments() {
       interpretLists();
       createListButtons();
       createHeaderButtons();
   }

   // On any page update, do anything that can happen a split second later
   function delayedPageChangeAdjustments() {
       
   }




   // TODO: create button to allow you to change titles that are searched for, colours, maybe add more titles to search for?
   // fade checkbox (or value);
   // colour overide


   // TODO: actions should be rerun based on mutation observer (or drop listener)





   // on page load
   $(function() {

       immediatePageInitialisation();
       pageStartTimerID = window.setTimeout(delayedPageInitialisation, 3000);
   });
