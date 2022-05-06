import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { cycleOptionInList, $getActiveList } from "../helpers";



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
        <Tooltip title="cycle label appearance" tag="a">
            <a
                href="#"
                id={ plugin.slug + "_labels-btn" }
                className="ft_pop-over-header-btn left-most icon-sm"

                ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
                onClick={ () => {
                    cycleOptionInList( OPTIONS.LISTS.LABELS, $getActiveList() );
                }}
            >
                <i className="fas fa-tag"/>
            </a>
        </Tooltip>
    );


    // DUE DATES TOGGLE
    // Use to...
    // - Show according to list settings
    // - Show due dates normally (Trello default)
    // - Show colour & icon only for due soon and overdue
    // - Hide due dates
    jsxArr.push(
        <Tooltip title="cycle due date appearance" tag="a">
            <a
                href="#"
                id={ plugin.slug + "_dates-btn" }
                className={[    "ft_pop-over-header-btn",
                                "icon-sm"
                            ].join(" ")}

                ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
                onClick={ () => {
                    cycleOptionInList( OPTIONS.LISTS.BADGES, $getActiveList() );
                }}
            >
                <i className="fas fa-window-maximize fa-rotate-180"/> {/* fa-clock */}
            </a>
        </Tooltip>
    );


    // DETAILS TOGGLE
    jsxArr.push(
        <Tooltip title="cycle details appearance" tag="a">
            <a
                href="#"
                id={ plugin.slug + "_details-btn" }
                className={[    "ft_pop-over-header-btn",
                                "icon-sm"
                            ].join(" ")}

                ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
                onClick={ () => {
                    cycleOptionInList( OPTIONS.LISTS.DETAILS, $getActiveList() );
                }}
            >
                <i className="fas fa-user-circle"/>
            </a>
        </Tooltip>
    );
    

    // IMAGES TOGGLE
    jsxArr.push(
        <Tooltip title="cycle images appearance" tag="a">
            <a
                href="#"
                id={ plugin.slug + "_images-btn" }
                className={[    "ft_pop-over-header-btn",
                                "icon-sm"
                            ].join(" ")}

                ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
                onClick={ () => {
                    cycleOptionInList( OPTIONS.LISTS.IMAGES, $getActiveList() );
                }}
            >
                <i className="fas fa-image"/>
            </a>
        </Tooltip>
    );


    
    

    // LIST SIZE TOGGLE
    ///////////////////
    jsxArr.push(
        <Tooltip title="cycle list size" tag="a">
            <a
                href="#"
                id={ plugin.slug + "_size-btn" }
                className={[    "ft_pop-over-header-btn",
                                "icon-sm"
                            ].join(" ")}

                ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
                onClick={ () => {
                    cycleOptionInList( OPTIONS.LISTS.SIZES, $getActiveList() );
                }}
            >
                <i className="fas fa-expand-alt"/>
                {/* fa-poll fa-rotate-180 */}
            </a>
        </Tooltip>
    );



    // LIST COLOR TOGGLE
    ////////////////////
    jsxArr.push(
        <Tooltip title="cycle list colour" tag="a">
            <a
                href="#"
                id={ plugin.slug + "_size-btn" }
                className={[    "ft_pop-over-header-btn",
                                "icon-sm"
                            ].join(" ")}

                ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
                onClick={ () => {
                    cycleOptionInList( OPTIONS.LISTS.COLORS, $getActiveList() );
                }}
            >
                <i className="fas fa-fill-drip"/>
            </a>
        </Tooltip>
    );

    

    // LIST VISIBILITY BUTTON
    jsxArr.push(
        <Tooltip title="cycle list visibility" tag="a">
            <a
                href="#"
                id={ plugin.slug + "_visibility-btn" }
                className={[    "ft_pop-over-header-btn",
                                "icon-sm"
                            ].join(" ")}

                ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
                onClick={ () => {
                    cycleOptionInList( OPTIONS.LISTS.VISIBILITY, $getActiveList() );
                }}
            >
                <i className="fas fa-low-vision"/>
            </a>
        </Tooltip>
    );
    // eye-slash


    // LIST SETTINGS BUTTON
    // Use to...
    // - Change name of list it is looking for - toggle between "match" and "contains" (be warey of if the change it to a word that"s not in any list the settings will be lost - perhaps it saves elsewhere (too?)?)
    // - Copy text based settings string?
    // - Paste text based settings string?
    // jsxArr.push(
    //     <Tooltip title="adjust list control" tag="a">
    //         <a
    //             href="#"
    //             id={ plugin.slug + "_label-btn" }
    //             className={[    "ft_pop-over-header-btn",
    //                             "icon-sm"
    //                         ].join(" ")}

    //             ref={super.ref}  // ref is needed for jsx-render to have the context to run any code *inside* an event when running it later.
    //             onClick={ () => {
    //                 cycleOptionInList( OPTIONS.LISTS.SIZES, $getActiveList() );
    //             }}
    //         >
    //             <i className="fas fa-cogs"/>
    //         </a>
    //     </Tooltip>

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



