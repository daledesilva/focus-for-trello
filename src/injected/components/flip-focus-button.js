import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import { plugin } from "../../metadata";
import { devWarning } from "../generic-helpers";
import { cycleBoardPresets } from "../helpers";

import FlipFocusIcon from '../../assets/board-icon_flip-focus.js';



class FlipFocusButton extends JSXComponent {


  render(props) {

    return (
        <a
            href="#"
            id={ plugin.slug + "_flip-focus-btn" }
            className={classnames(
                `${plugin.slug}_tooltip`,
            )}
            data-tooltip = "Flip focus"
        >
            <FlipFocusIcon/>
        </a>
    );


  }

}

const listenForOutsideClick = (event) => {
    var $target = $(event.target);
    let $flipFocusContainer = $(`#${plugin.slug }_flip-focus-container`);
    
    if( !$target.closest(`#${plugin.slug }_flip-focus-container`).length &&
        $flipFocusContainer.hasClass( plugin.slug + "_open" ) ) {
        $flipFocusContainer.toggleClass( plugin.slug + "_open" );
        // document.removeEventListener('click', outsideClickListener);
    }
}

const initFlipFocusButton = () => {
    let $flipFocusContainer = $(`#${plugin.slug }_flip-focus-container`);
    let $flipFocusBtn = $flipFocusContainer.find("#" + plugin.slug + "_flip-focus-btn" );

    // LEFT CLICK ACTIONS
    $flipFocusBtn.on("click", cycleBoardPresets);
    
    // RIGHT CLICK ACTIONS
    $flipFocusBtn.on("contextmenu", () => {
        const menuIsClosed = !$flipFocusContainer.hasClass( plugin.slug + "_open" );

        if(menuIsClosed) {
            $flipFocusContainer.addClass( plugin.slug + "_open" );
            document.addEventListener('pointerdown', listenForOutsideClick);
        } else {
            $flipFocusContainer.removeClass( plugin.slug + "_open" );
            document.removeEventListener('pointerdown', listenForOutsideClick);
        }
        
        // Stop the standard context menu appearing
        return false;
    });

}







export default FlipFocusButton;
export { FlipFocusButton, initFlipFocusButton };


