import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import { plugin } from "../../metadata";
import { devWarning } from "../generic-helpers";
import { cycleInterface } from "../helpers";

import FlipHeaderIcon from '../../assets/board-icon_flip-header.js';



class CycleHeaderButton extends JSXComponent {


  render(props) {

    return (
        <div
            href = "#"
            id = {`${plugin.slug}_cycle-header-btn`}
            className = {classnames(
                plugin.slug + "_circle-btn",
                `${plugin.slug}_tooltip`,
            )}
            data-tooltip = "Flip header"
        >
            <FlipHeaderIcon/>
        </div>
    );


  }

}

const initCycleHeaderButton = () => {
    $("#" + plugin.slug + "_cycle-header-btn").on("click", cycleInterface);
}


export default CycleHeaderButton;
export { CycleHeaderButton, initCycleHeaderButton };


