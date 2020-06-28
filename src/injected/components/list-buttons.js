import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'

// custom components
import { Tooltip } from "../../components/tooltip"

import { plugin } from "../../metadata";



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
                id={ plugin.slug + "_label-btn" }
                className="ft_pop-over-header-btn left-most icon-sm"
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
                id={ plugin.slug + "_label-btn" }
                className={[    "ft_pop-over-header-btn",
                                "icon-sm"
                            ].join(" ")}
            >
                <i className="fas fa-clock"/>
            </a>
        </Tooltip>
    );


    // DETAILS TOGGLE
    // Use to...
    // - Show according to list settings
    // - Show any badges other than due dates and users, and checklists normally (Trello default)
    // - Hide any badges other than due dates and users, and display checklists as progress bars
    // - Hide any badges and checklists other than due dates and users
    jsxArr.push(
        <Tooltip title="cycle details appearance" tag="a">
            <a
                href="#"
                id={ plugin.slug + "_label-btn" }
                className={[    "ft_pop-over-header-btn",
                                "icon-sm"
                            ].join(" ")}
            >
                <i className="fas fa-comment-alt"/>
            </a>
        </Tooltip>
    );
    

    // IMAGES TOGGLE
    // Use to..
    // - Show inline image previews (Trello default)
    // - Reduce images previews to a small horizontal bar
    // - Hide image previews
    jsxArr.push(
        <Tooltip title="cycle images appearance" tag="a">
            <a
                href="#"
                id={ plugin.slug + "_label-btn" }
                className={[    "ft_pop-over-header-btn",
                                "icon-sm"
                            ].join(" ")}
            >
                <i className="fas fa-image"/>
            </a>
        </Tooltip>
    );
    

    // LIST APPEARANCE TOGGLE
    // Use to...
    // - Show lists normally (Trello default)
    // - Shrink list
    // - Shrink list and darken
    // - Shrink list and fade
    //        htmlStr += "<a href="#" className="ft_pop-over-header-btn icon-sm"><i className="fab fa-trello"></i></a>";
    jsxArr.push(
        <Tooltip title="cycle whole list appearance" tag="a">
            <a
                href="#"
                id={ plugin.slug + "_label-btn" }
                className={[    "ft_pop-over-header-btn",
                                "icon-sm"
                            ].join(" ")}
            >
                <i className="fas fa-poll fa-rotate-180"/>
            </a>
        </Tooltip>
    );
    

    // LIST VISIBILITY BUTTON
    // Use to...
    // - Hide/Unhide list
    jsxArr.push(
        <Tooltip title="cycle list visibility" tag="a">
            <a
                href="#"
                id={ plugin.slug + "_label-btn" }
                className={[    "ft_pop-over-header-btn",
                                "icon-sm"
                            ].join(" ")}
            >
                <i className="fas fa-eye"/>
            </a>
        </Tooltip>
    );
    // eye-slash


    // LIST SETTINGS BUTTON
    // Use to...
    // - Change name of list it is looking for - toggle between "match" and "contains" (be warey of if the change it to a word that"s not in any list the settings will be lost - perhaps it saves elsewhere (too?)?)
    // - Copy text based settings string?
    // - Paste text based settings string?
    jsxArr.push(
        <Tooltip title="adjust list control" tag="a">
            <a
                href="#"
                id={ plugin.slug + "_label-btn" }
                className={[    "ft_pop-over-header-btn",
                                "icon-sm"
                            ].join(" ")}
            >
                <i className="fas fa-cog"/>
            </a>
        </Tooltip>

        // Popup should contain:
        // - fade checkbox (or value);
        // - colour overide
    );



    // Remove text from list settings header to make clean background for buttons
    // replace with space so that headre doesn't collapse
    props.$listReference.find(".pop-over-header-title").html("&nbsp;");


    

    return (
        <div className="ft_list-btn-group">
            { jsxArr }
        </div>
    );


  }

}




export default ListButtons;
export { ListButtons };



