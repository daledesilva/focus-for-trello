import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { cycleListOption, $getActiveList } from "../helpers";

import ListColorIcon from "../../assets/list-icon_color";
import ListDatesIcon from "../../assets/list-icon_dates";
import ListDetailsIcon from "../../assets/list-icon_details";
import ListCommentsIcon from "../../assets/list-icon_comments";
import ListImagesIcon from "../../assets/list-icon_images";
import ListLabelsIcon from "../../assets/list-icon_labels";
import ListSizeIcon from "../../assets/list-icon_size";
import ListVisibilityIcon from "../../assets/list-icon_visibility";



class ListButtons extends JSXComponent {


  render(props) {
      


    let jsxArr = [];


    // LABELS TOGGLE
    // Use to...
    // - Show according to list settings
    // - Show labels normally (Trello default)
    // - Show labels as coloured bar on side
    // - Hide labels
    jsxArr.push(
        <a
            href="#"
            id={ plugin.slug + "_labels-btn" }
            className={classnames(
                `${plugin.slug}_list-btn`,
                `${plugin.slug}_tooltip`,
            )}
            data-tooltip = "Cycle labels visibility"

            ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
            onClick={ () => {
                cycleListOption( $getActiveList(), OPTIONS.LISTS.LABELS );
            }}
        >
            <ListLabelsIcon/>
        </a>
    );


    // DUE DATES TOGGLE
    // Use to...
    // - Show according to list settings
    // - Show due dates normally (Trello default)
    // - Show colour & icon only for due soon and overdue
    // - Hide due dates
    jsxArr.push(
        <a
            href="#"
            id={ plugin.slug + "_dates-btn" }
            className={classnames(
                `${plugin.slug}_list-btn`,
                `${plugin.slug}_tooltip`,
            )}
            data-tooltip = "Cycle due date visibility"

            ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
            onClick={ () => {
                cycleListOption( $getActiveList(), OPTIONS.LISTS.BADGES );
            }}
        >
            <ListDatesIcon/>
        </a>
    );


    // DETAILS TOGGLE
    jsxArr.push(
        <a
            href="#"
            id={ plugin.slug + "_details-btn" }
            className={classnames(
                `${plugin.slug}_list-btn`,
                `${plugin.slug}_tooltip`,
            )}
            data-tooltip = "Cycle details visibility"

            ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
            onClick={ () => {
                cycleListOption( $getActiveList(), OPTIONS.LISTS.DETAILS );
            }}
        >
            <ListDetailsIcon/>
        </a>
    );


    // COMMENTS TOGGLE
    jsxArr.push(
        <a
            href="#"
            id={ plugin.slug + "_comments-btn" }
            className={classnames(
                `${plugin.slug}_list-btn`,
                `${plugin.slug}_tooltip`,
            )}
            data-tooltip = "Cycle comments visibility"

            ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
            onClick={ () => {
                cycleListOption( $getActiveList(), OPTIONS.LISTS.COMMENTS );
            }}
        >
            <ListCommentsIcon/>
        </a>
    );
    

    // IMAGES TOGGLE
    jsxArr.push(
        <a
            href="#"
            id={ plugin.slug + "_images-btn" }
            className={classnames(
                `${plugin.slug}_list-btn`,
                `${plugin.slug}_tooltip`,
            )}
            data-tooltip = "Cycle images appearance"

            ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
            onClick={ () => {
                cycleListOption( $getActiveList(), OPTIONS.LISTS.IMAGES );
            }}
        >
            <ListImagesIcon/>
        </a>
    );


    
    

    // LIST SIZE TOGGLE
    ///////////////////
    jsxArr.push(
        <a
            href="#"
            id={ plugin.slug + "_size-btn" }
            className={classnames(
                `${plugin.slug}_list-btn`,
                `${plugin.slug}_tooltip`,
            )}
            data-tooltip = "Cycle list size"

            ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
            onClick={ () => {
                cycleListOption( $getActiveList(), OPTIONS.LISTS.SIZES );
            }}
        >
            <ListSizeIcon/>
        </a>
    );



    // LIST COLOR TOGGLE
    ////////////////////
    jsxArr.push(
        <a
            href="#"
            id={ plugin.slug + "_size-btn" }
            className={classnames(
                `${plugin.slug}_list-btn`,
                `${plugin.slug}_tooltip`,
            )}
            data-tooltip = "Cycle list colour"

            ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
            onClick={ () => {
                cycleListOption( $getActiveList(), OPTIONS.LISTS.COLORS );
            }}
        >
            <ListColorIcon/>
        </a>
    );

    

    // LIST VISIBILITY BUTTON
    jsxArr.push(
        <a
            href="#"
            id={ plugin.slug + "_visibility-btn" }
            className={classnames(
                // "ft_pop-over-header-btn",
                // "icon-sm",
                `${plugin.slug}_list-btn`,
                `${plugin.slug}_tooltip`,
            )}
            data-tooltip = "Cycle list visibility"

            ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
            onClick={ () => {
                cycleListOption( $getActiveList(), OPTIONS.LISTS.VISIBILITY );
            }}
        >
            <ListVisibilityIcon/>
        </a>
    );


    // LIST SETTINGS BUTTON
    // Use to...
    // - Change name of list it is looking for - toggle between "match" and "contains" (be warey of if the change it to a word that"s not in any list the settings will be lost - perhaps it saves elsewhere (too?)?)
    // - Copy text based settings string?
    // - Paste text based settings string?
    // jsxArr.push(
    //     <a
    //         href="#"
    //         id={ plugin.slug + "_label-btn" }
    //             className={classnames(
    //                 "ft_pop-over-header-btn",
    //                 "icon-sm",
    //                 `${plugin.slug}_tooltip`,
    //             )}
    //             data-tooltip = "Adjust list control"

    //         ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
    //         onClick={ () => {
    //             cycleListOption( $getActiveList(), OPTIONS.LISTS.SIZES );
    //         }}
    //     >
    //         <i className="fas fa-cogs"/>
    //     </a>
    //     // Popup should contain:
    //     // - fade checkbox (or value);
    //     // - colour overide
    // );




    return (
        <div className="ft_list-btn-group">
            { jsxArr }
        </div>
    );


  }

}




export default ListButtons;
export { ListButtons };



