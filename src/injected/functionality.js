import dom, { Fragment } from "jsx-render";
// ISSUE: Using a capital F on Fragments and the same when using the tag allows VS code to show link when ctrl-hovering, however, chrome reports "jsx-render doesn"t handle undefineds" and stops execution.
// Using lowercase prevents that error but VS Code then doesn't show ctrl-hover tooltip.

// custom components
import ListButtons from "../components/list-buttons"

import "./style.scss";
import {Tooltip} from "../components/tooltip";

import {plugin} from "../metadata";


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
       "use strict";

       let iconJsx = <script src="https://kit.fontawesome.com/c0535646a5.js" crossorigin="anonymous"></script>
       $("head").append(iconJsx);

   }



   function injectCss() {
       "use strict";

       let customCss = "";

       




       // add all the created css to the document
       //$("head").append("<style type='text/css'>" + customCss + "</style>");


   }


   var lastInterpreted = null;
   function interpretLists() {
       "use strict";

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
       "use strict";


       let $listSettings = $latestMutations.find(".pop-over-header").first();
       // Bail if the list settings popup isn"t present
       if($listSettings.length == 0) {
           //console.log("list settings popup not found.");
           return;
       }



       $listSettings.prepend( <ListButtons $listReference={$listSettings} /> );


   }





   










    function createFloatingButton() {
        "use strict";
        // console.log("attempting to floating button");



        let $rightHeader = $latestMutations.find(".mod-right").first();
        // Bail if the right header isn"t present in anything that"s modified
        if($rightHeader.length == 0) {
            //console.log("right header not found.");
            return;
        }


        // TO DO: Add button to hide all extraneous trello Headers, etc, and other function

        let floatingButton = (
            <Fragment>
                <a className="board-header-btn board-header-btn-without-icon" href="#">
                    <span className="board-header-btn-text">Re-Format</span>
                </a>
                <a className="board-header-btn board-header-btn-without-icon" href="#"><span className="board-header-btn-text">Re-Format</span></a>
                <a className="board-header-btn" href="#"><span className="icon-sm board-header-btn-icon" title="Save all list settings as view"><i className="fas fa-save"></i></span></a>
                <a className="board-header-btn" href="#"><span className="icon-sm board-header-btn-icon" title="Create new view"><i className="fas fa-plus-square"></i></span></a>
                <a className="board-header-btn" href="#"><span className="icon-sm board-header-btn-icon" title="Clear unsaved settings"><i className="fas fa-backspace"></i></span></a>
            </Fragment>
        );



        // find the standard Trello board header and the div that holds all buttons that float to the right
        // put in the new button
        //let $rightSideHeader = $(".mod-right"); // .board-header-btns
        $rightHeader.prepend(floatingButton);

        // console.log($rightHeader);
        // console.log("floating button created");
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
        //    createHeaderButtons();
        createFloatingButton();
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
