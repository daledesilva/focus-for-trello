    // ==UserScript==
    // @name         Format Trello
    // @namespace    http://tampermonkey.net/
    // @version      0.22
    // @description
    // @author       Dale de Silva www.ublik-om.net
<<<<<<< HEAD
    // @match        https://trello.com/*
=======
    // @match        https://trello.com/b/*
>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5
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
<<<<<<< HEAD
    var $latestMutations = $("body");
=======
>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5




    function loadIcons() {
        'use strict';

        let htmlStr = '<script src="https://kit.fontawesome.com/c0535646a5.js" crossorigin="anonymous"></script>';
        $("head").append(htmlStr);

    }



    function injectCss() {
        'use strict';

        let customCss = "";

        // TODO: create buttons to shrink and expand any list
        // TODO: create separate buttons to also show/hide: labels, users, and badges
        // TODO: button to hide image previews
        customCss += ".list-card-cover {";
        customCss += "   height: 0px !important;";
        customCss += "}";
        // TODO: Card cover height should be 0 and javascript should check if there is actually an image in there and increase it to 1px

        // absolutely position rollover preview of card image (left or right depending on where mouse is

        // All options should use browser memory to remember how you last left each one

        // TODO: create an upcoming filter as well as the done filter (like "goals", or "upcoming", or "potential")
        // can you tell it to search for multiple? - to help when one of your boards suits "goal" but another is better with "potential"

        // TODO: create global button to hide upcoming lists entirely
        // TODO: create global button to hide done lists entirely
<<<<<<< HEAD

        // TODO: ability to turn on progress bars for cards (collapse checklists or stack)

        // TODO: create an abanded/ditched filter

        // TODO: Animation that can be turned on and off (for transitions from normal states to custom and when custom switches are pressed, etc.

        // TODO: Shrink labels to 2 pixels in shrunken lists
        // TODO: Shrink label text too

        // Add class for shrunken lists so they can be styled together (across type)







        ///////////////////////
        // Affect List Buttons
        customCss += ".ft_list-btn-group {";
        customCss += "   position: absolute;";
        customCss += "   top: 0;";
        customCss += "   left: 0;";
        customCss += "   z-index: 10;";
        //customCss += "   padding-left: 4px;";
        customCss += "}";



        customCss += ".ft_pop-over-header-btn {";
        customCss += "    color: #6b778c;";
        customCss += "    padding: 10px 6px;";
        customCss += "}";
        customCss += ".ft_pop-over-header-btn.left-most {";
        customCss += "    padding-left: 10px;";
        customCss += "}";

        
        
        
        
        //////////////////////
        // Affect Lists
        
        
        // LIST WIDTHS
        //////////////
        
        // narrow
        customCss += ".ft_list-width_narrow {";
        customCss += "   width: 150px !important;";
        customCss += "}";
        //
        customCss += ".ft_list-width_narrow .js-list-name-input {";
        customCss += "   font-size: 0.7em;";
        customCss += "   height: 40px;";
        customCss += "   line-height: 1.3em;";
        customCss += "}";
        // TO DO: Does this double up on the above?
        customCss += ".ft_list-width_narrow .js-card-name {";
        customCss += "   font-size: 0.7em;";
        customCss += "   line-height: 1.3em;";
        customCss += "}";
        // shrink add new card text
        customCss += ".ft_list-width_narrow .js-open-card-composer {";
        customCss += "   font-size: 0.7em;";
        customCss += "}";
         // shrink labels
        customCss += ".ft_list-width_narrow .js-card-labels {";
        customCss += "   overflow: hidden;";
        customCss += "   font-size: 0.7em;";
        customCss += "}";
        // shrink badges and due dates
        customCss += ".ft_list-width_narrow .badge-text {";
        customCss += "   overflow: hidden;";
        customCss += "   font-size: 0.7em;";
        customCss += "}";
        
        

        
        // LIST COLORS
        //////////////
        
        // dark
        customCss += ".ft_list-bg_dark .list {";
        customCss += "   background-color: #666;";
        customCss += "}";
        //
        customCss += ".ft_list-bg_dark .js-list-name-input {";
        customCss += "   color: #eee;";
        customCss += "}";
        //
        customCss += ".ft_list-bg_dark .js-card-details {";
        customCss += "   background-color: #777;";
        customCss += "}";
        // edit card titles
        customCss += ".ft_list-bg_dark .js-card-name {";
        customCss += "   color: #ccc;";
        customCss += "}";
        
        
        // medium
        customCss += ".ft_list-bg_medium .list {";
        customCss += "   background-color: #dfe3e6;";
        customCss += "}";
        //
        customCss += ".ft_list-bg_medium .js-list-name-input {";
        customCss += "   color: #ddd;";
        customCss += "}";
        //
        customCss += ".ft_list-bg_medium .js-card-details {";
        customCss += "   background-color: #eee;";
        customCss += "}";
        
        
        // see-through
        customCss += ".ft_list-bg_clear .list {";
        customCss += "   background: none;";
        customCss += "}";
        //
        customCss += ".ft_list-bg_clear .list-card {";
        customCss += "   opacity: 0.4;";
        customCss += "}";
        // edit card titles
        customCss += ".ft_list-bg_clear .js-card-name {";
        customCss += "   color: #444;";
        customCss += "}";
        // head text
        customCss += ".ft_list-bg_clear .js-list-name-input {";
        customCss += "   color: #ddd;";
        customCss += "}";

        
        
        
        
        

        //////////////////////
        // Affect Goal Lists

                // shrink lists
                customCss += ".future {";
                customCss += "   width: 150px !important;";
                //customCss += "   opacity: 0.8 !important;";
                customCss += "}";

                // edit list color
                customCss += ".future .list {";
                //customCss += "   background-color: #a3b6c5;";
                customCss += "   background-color: #dfe3e6;";
                customCss += "}";

                // shrink head text
                customCss += ".future .js-list-name-input {";
                customCss += "   font-size: 0.7em;";
                customCss += "   height: 40px;";
                customCss += "   line-height: 1.3em;";
                customCss += "   color: #ddd;";
                customCss += "}";

                // edit card color
                customCss += ".future .js-card-details {";
             //   customCss += "   background-color: #bacbd7;";
                customCss += "   background-color: #eee;";
                customCss += "}";

                // edit card titles
                customCss += ".future .js-card-name {";
                customCss += "   font-size: 0.7em;";
                customCss += "   line-height: 1.3em;";
                customCss += "}";

                // shrink add new card text
                customCss += ".future .js-open-card-composer {";
                customCss += "   font-size: 0.7em;";
                customCss += "}";

                // shrink labels
                customCss += ".abandoned .js-card-labels {";
                customCss += "   overflow: hidden;";
                customCss += "   font-size: 0.7em;";
                customCss += "}";

                // shrink badges and due dates
                customCss += ".abandoned .badge-text {";
                customCss += "   overflow: hidden;";
                customCss += "   font-size: 0.7em;";
                customCss += "}";


        ////////////////////////
        // Affect Done Lists

                // shrink lists
                customCss += ".done {";
                customCss += "   width: 150px !important;";
                //customCss += "   opacity: 0.8 !important;";
                customCss += "}";

                // edit list color
                customCss += ".done .list {";
                //customCss += "   background-color: #a3c3a8;";
                customCss += "   background-color: #666;";
                customCss += "}";

                // shrink head text
                customCss += ".done .js-list-name-input {";
                customCss += "   font-size: 0.7em;";
                customCss += "   height: 40px;";
                customCss += "   line-height: 1.3em;";
                customCss += "   color: #eee;";
                customCss += "}";

                // edit card color
                customCss += ".done .js-card-details {";
                //customCss += "   background-color: #bbd7ba;";
                customCss += "   background-color: #777;";
                customCss += "}";

                // edit card titles
                customCss += ".done .js-card-name {";
                customCss += "   font-size: 0.7em;";
                customCss += "   line-height: 1.3em;";
                customCss += "   color: #ccc;";
                customCss += "}";

                // shrink add new card text
                customCss += ".done .js-open-card-composer {";
                customCss += "   font-size: 0.7em;";
                customCss += "}";

        // hide users assigned to the cards
        customCss += ".done .js-list-card-members {";
        customCss += "   display: none;";
        customCss += "}";

        // hide labels
        customCss += ".done .js-card-labels {";
        customCss += "   display: none;";
        customCss += "}";

        // hide badges and due dates
        customCss += ".done .badges {";
        customCss += "   display: none;";
        customCss += "}";



        //////////////////////////
        // Affect Brain Dump List

                // shrink lists
                customCss += ".brain-dump {";
                customCss += "   width: 150px !important;";
                customCss += "}";

                // edit list color
                customCss += ".brain-dump .list {";
                customCss += "   background: none;";
                customCss += "}";

                // shrink head text
                customCss += ".brain-dump .js-list-name-input {";
                customCss += "   font-size: 0.7em;";
                customCss += "   height: 40px;";
                customCss += "   line-height: 1.3em;";
                customCss += "   color: #ddd;";
                customCss += "}";

                // edit card color
                customCss += ".brain-dump .list-card {";
                customCss += "   opacity: 0.4;";
                customCss += "}";

                // edit card titles
                customCss += ".brain-dump .js-card-name {";
                customCss += "   color: #444;";
                customCss += "   font-size: 0.7em;";
                customCss += "   line-height: 1.3em;";
                customCss += "}";

                // shrink add new card text
                customCss += ".brain-dump .js-open-card-composer {";
                customCss += "   font-size: 0.7em;";
                customCss += "}";

                // shrink labels
                customCss += ".abandoned .js-card-labels {";
                customCss += "   overflow: hidden;";
                customCss += "   font-size: 0.7em;";
                customCss += "}";

                // shrink badges and due dates
                customCss += ".abandoned .badge-text {";
                customCss += "   overflow: hidden;";
                customCss += "   font-size: 0.7em;";
                customCss += "}";



        //////////////////////////
        // Affect Abandon List
=======

        // TODO: ability to turn on progress bars for cards (collapse checklists or stack)

        // TODO: create an abanded/ditched filter

        // TODO: Animation that can be turned on and off (for transitions from normal states to custom and when custom switches are pressed, etc.

        // TODO: Shrink labels to 2 pixels in shrunken lists
        // TODO: Shrink label text too

        // Add class for shrunken lists so they can be styled together (across type)
>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5

                // shrink lists
                customCss += ".abandoned {";
                customCss += "   width: 150px !important;";
                customCss += "}";

        // edit list color
        customCss += ".abandoned .list {";
        customCss += "   background: none;";
        customCss += "}";

<<<<<<< HEAD
        // shrink head text
        customCss += ".abandoned .js-list-name-input {";
        customCss += "   font-size: 0.7em;";
        customCss += "   height: 40px;";
        customCss += "   line-height: 1.3em;";
        customCss += "   color: #ddd;";
        customCss += "}";

        // edit card color
        customCss += ".abandoned .list-card {";
        customCss += "   background-color: #111;";
        customCss += "   opacity: 0.4;";
        customCss += "}";

        // edit card titles
        customCss += ".abandoned .js-card-name {";
        customCss += "   color: #888;";
        customCss += "   font-size: 0.7em;";
        customCss += "   line-height: 1.3em;";
        customCss += "}";

        // shrink add new card text
        customCss += ".abandoned .js-open-card-composer {";
        customCss += "   font-size: 0.7em;";
        customCss += "}";

        // shrink labels
        customCss += ".abandoned .js-card-labels .card-label {";
        customCss += "   overflow: hidden;";
        customCss += "   font-size: 0.7em;";
        customCss += "}";

        // shrink badges and due dates
        customCss += ".abandoned .badge-text {";
        customCss += "   overflow: hidden;";
        customCss += "   font-size: 0.7em;";
        customCss += "}";
=======




        ///////////////////////
        // Affect List Buttons
        customCss += ".ft_list-btn-group {";
        customCss += "   position: absolute;";
        customCss += "   top: 0;";
        customCss += "   left: 0;";
        customCss += "   z-index: 10;";
        //customCss += "   padding-left: 4px;";
        customCss += "}";
        
        
        
        customCss += ".ft_pop-over-header-btn {";
        customCss += "    color: #6b778c;";
        customCss += "    padding: 10px 6px;";
        customCss += "}";
        customCss += ".ft_pop-over-header-btn.left-most {";
        customCss += "    padding-left: 10px;";
        customCss += "}";

>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5




<<<<<<< HEAD
        // add all the created css to the document
        $("head").append("<style type='text/css'>" + customCss + "</style>");


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
=======
        //////////////////////
        // Affect Goal Lists

        // shrink lists
        customCss += ".future {";
        customCss += "   width: 150px !important;";
        //customCss += "   opacity: 0.8 !important;";
        customCss += "}";

        // edit list color
        customCss += ".future .list {";
        //customCss += "   background-color: #a3b6c5;";
        customCss += "   background-color: #dfe3e6;";
        customCss += "}";

        // shrink head text
        customCss += ".future .js-list-name-input {";
        customCss += "   font-size: 0.7em;";
        customCss += "   height: 40px;";
        customCss += "   line-height: 1.3em;";
        customCss += "   color: #ddd;";
        customCss += "}";

        // edit card color
        customCss += ".future .js-card-details {";
     //   customCss += "   background-color: #bacbd7;";
        customCss += "   background-color: #eee;";
        customCss += "}";

        // edit card titles
        customCss += ".future .js-card-name {";
        customCss += "   font-size: 0.7em;";
        customCss += "   line-height: 1.3em;";
        customCss += "}";

        // shrink add new card text
        customCss += ".future .js-open-card-composer {";
        customCss += "   font-size: 0.7em;";
        customCss += "}";

        // shrink labels
        customCss += ".abandoned .js-card-labels {";
        customCss += "   overflow: hidden;";
        customCss += "   font-size: 0.7em;";
        customCss += "}";

        // shrink badges and due dates
        customCss += ".abandoned .badge-text {";
        customCss += "   overflow: hidden;";
        customCss += "   font-size: 0.7em;";
        customCss += "}";


        ////////////////////////
        // Affect Done Lists

        // shrink lists
        customCss += ".done {";
        customCss += "   width: 150px !important;";
        //customCss += "   opacity: 0.8 !important;";
        customCss += "}";

        // edit list color
        customCss += ".done .list {";
        //customCss += "   background-color: #a3c3a8;";
        customCss += "   background-color: #666;";
        customCss += "}";

        // shrink head text
        customCss += ".done .js-list-name-input {";
        customCss += "   font-size: 0.7em;";
        customCss += "   height: 40px;";
        customCss += "   line-height: 1.3em;";
        customCss += "   color: #eee;";
        customCss += "}";

        // edit card color
        customCss += ".done .js-card-details {";
        //customCss += "   background-color: #bbd7ba;";
        customCss += "   background-color: #777;";
        customCss += "}";

        // edit card titles
        customCss += ".done .js-card-name {";
        customCss += "   font-size: 0.7em;";
        customCss += "   line-height: 1.3em;";
        customCss += "   color: #ccc;";
        customCss += "}";

        // shrink add new card text
        customCss += ".done .js-open-card-composer {";
        customCss += "   font-size: 0.7em;";
        customCss += "}";

        // hide users assigned to the cards
        customCss += ".done .js-list-card-members {";
        customCss += "   display: none;";
        customCss += "}";

        // hide labels
        customCss += ".done .js-card-labels {";
        customCss += "   display: none;";
        customCss += "}";

        // hide badges and due dates
        customCss += ".done .badges {";
        customCss += "   display: none;";
        customCss += "}";



        //////////////////////////
        // Affect Brain Dump List

        // shrink lists
        customCss += ".brain-dump {";
        customCss += "   width: 150px !important;";
        customCss += "}";

        // edit list color
        customCss += ".brain-dump .list {";
        customCss += "   background: none;";
        customCss += "}";

        // shrink head text
        customCss += ".brain-dump .js-list-name-input {";
        customCss += "   font-size: 0.7em;";
        customCss += "   height: 40px;";
        customCss += "   line-height: 1.3em;";
        customCss += "   color: #ddd;";
        customCss += "}";

        // edit card color
        customCss += ".brain-dump .list-card {";
        customCss += "   opacity: 0.4;";
        customCss += "}";

        // edit card titles
        customCss += ".brain-dump .js-card-name {";
        customCss += "   color: #444;";
        customCss += "   font-size: 0.7em;";
        customCss += "   line-height: 1.3em;";
        customCss += "}";

        // shrink add new card text
        customCss += ".brain-dump .js-open-card-composer {";
        customCss += "   font-size: 0.7em;";
        customCss += "}";

        // shrink labels
        customCss += ".abandoned .js-card-labels {";
        customCss += "   overflow: hidden;";
        customCss += "   font-size: 0.7em;";
        customCss += "}";

        // shrink badges and due dates
        customCss += ".abandoned .badge-text {";
        customCss += "   overflow: hidden;";
        customCss += "   font-size: 0.7em;";
        customCss += "}";



        //////////////////////////
        // Affect Abandon List

        // shrink lists
        customCss += ".abandoned {";
        customCss += "   width: 150px !important;";
        customCss += "}";

        // edit list color
        customCss += ".abandoned .list {";
        customCss += "   background: none;";
        customCss += "}";

        // shrink head text
        customCss += ".abandoned .js-list-name-input {";
        customCss += "   font-size: 0.7em;";
        customCss += "   height: 40px;";
        customCss += "   line-height: 1.3em;";
        customCss += "   color: #ddd;";
        customCss += "}";

        // edit card color
        customCss += ".abandoned .list-card {";
        customCss += "   background-color: #111;";
        customCss += "   opacity: 0.4;";
        customCss += "}";

        // edit card titles
        customCss += ".abandoned .js-card-name {";
        customCss += "   color: #888;";
        customCss += "   font-size: 0.7em;";
        customCss += "   line-height: 1.3em;";
        customCss += "}";

        // shrink add new card text
        customCss += ".abandoned .js-open-card-composer {";
        customCss += "   font-size: 0.7em;";
        customCss += "}";
>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5

        // shrink labels
        customCss += ".abandoned .js-card-labels .card-label {";
        customCss += "   overflow: hidden;";
        customCss += "   font-size: 0.7em;";
        customCss += "}";

        // shrink badges and due dates
        customCss += ".abandoned .badge-text {";
        customCss += "   overflow: hidden;";
        customCss += "   font-size: 0.7em;";
        customCss += "}";


<<<<<<< HEAD
        // LABELS TOGGLE
        // Use to...
        // - Show according to list settings
        // - Show labels normally (Trello default)
        // - Show labels as coloured bar on side
        // - Hide labels
        htmlStr += "<a href='#' class='ft_pop-over-header-btn left-most icon-sm'><i class='fas fa-tag'></i></a>";
        // Global button...
        // - Overides this
=======
>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5

        // User visibility always hidden unless global list size settings turned off
        // TO DO: What is this talking about?

<<<<<<< HEAD
        // DUE DATES TOGGLE
        // Use to...
        // - Show according to list settings
        // - Show due dates normally (Trello default)
        // - Show colour & icon only for due soon and overdue
        // - Hide due dates
        htmlStr += "<a href='#' class='ft_pop-over-header-btn icon-sm'><i class='fas fa-clock'></i></a>";
        // Global button...
        // - Overides this
=======
        // add all the created css to the document
        $("head").append("<style type='text/css'>" + customCss + "</style>");
>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5

        // DETAILS TOGGLE
        // Use to...
        // - Show according to list settings
        // - Show any badges other than due dates and users, and checklists normally (Trello default)
        // - Hide any badges other than due dates and users, and display checklists as progress bars
        // - Hide any badges and checklists other than due dates and users
        htmlStr += "<a href='#' class='ft_pop-over-header-btn icon-sm'><i class='fas fa-comment-alt'></i></a>";
        // Global button...
        // - Overides this only if list is not set to shrink ????

<<<<<<< HEAD
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
=======
    }

>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5


    function interpretLists() {
        'use strict';


<<<<<<< HEAD
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
=======

        // TODO: Rewrite and move this inside the previous list loop
        $(".list-header h2").each( function() {

            let $title = $(this);

            // bail if it's not a "done" list
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
        
        
        let $listSettings = $(".pop-over-header");
        
        // remove text from list settings header
        $listSettings.find(".pop-over-header-title").html("."); // TO DO: This is visible, need to put in a blank so the header line stays visible without adding anything new.
        
        
        
        
        

        
        $listSettings.prepend(htmlStr);


    }
>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5




<<<<<<< HEAD
        // find the standard Trell board header and the div that holds all buttons that float to the right
        // put in the new button
        //let $rightSideHeader = $(".mod-right"); // .board-header-btns
        $rightHeader.prepend(htmlStr);

        console.log($rightHeader);
        console.log('header buttons created');
    }
=======

    function createHeaderButtons() {
        'use strict';
>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5

        let htmlStr = "";


<<<<<<< HEAD
=======
        htmlStr += "	<a class='board-header-btn board-header-btn-without-icon' href='#'><span class='board-header-btn-text'>Re-Format</span></a>";
        htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-save'></i></span></a>"; // check-circle
        htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-plus-square'></i></span></a>";
        htmlStr += "	<a class='board-header-btn' href='#'><span class='icon-sm board-header-btn-icon'><i class='fas fa-backspace'></i></span></a>";
>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5

        

    function startPageChangeObserver() {

<<<<<<< HEAD
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
            

=======
        // find the standard Trell board header and the div that holds all buttons that float to the right
        // put in the new button
        let $rightSideHeader = $(".mod-right"); // .board-header-btns
        $rightSideHeader.prepend(htmlStr);

        console.log($rightSideHeader);
        console.log('header buttons created');
    }





    function startPageChangeObserver() {

        var pageChangeObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {

                immediatePageAdjustments();

                window.clearTimeout(pageChangeTimeOutID);
                pageChangeTimeOutID = window.setTimeout(delayedPageChangeAdjustments, 1000);

            });
>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5
        });

        pageChangeObserver.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });

    }








<<<<<<< HEAD
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

=======

    function immediatePageInitialisation() {
        loadIcons();
        injectCss();
        startPageChangeObserver();
    }

    function delayedPageInitialisation() {
        createHeaderButtons();
        createListButtons();
>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5
    }



<<<<<<< HEAD
    // On any page update, do anything that needs to happen immediately (no visual discrepancy)
    function immediatePageAdjustments() {
        interpretLists();
        createListButtons();
        createHeaderButtons();
    }

    // On any page update, do anything that can happen a split second later
    function delayedPageChangeAdjustments() {
        
=======
    // do anything that needs to happen immediately (no visual discrepancy)
    function immediatePageAdjustments() {
        interpretLists();
    }

    // do anything that can happen a split second later
    function delayedPageChangeAdjustments() {

>>>>>>> a30cad754e0e8f147051893831c5f25d774271d5
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
