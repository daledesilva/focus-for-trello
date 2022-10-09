import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import { plugin } from "../../metadata";
import { devWarning } from "../generic-helpers";
import { nukeBoardSettings } from "../helpers";

import EraseBoardSettingsIcon from '../../assets/board-icon_erase-settings';



class EraseBoardSettingsButton extends JSXComponent {


  render(props) {

    return (
        <a
            href = "#"
            id = {`${plugin.slug}_erase-board-settings-btn`}
            className = {classnames(
                plugin.slug + "_circle-btn",
                `${plugin.slug}_tooltip`,
            )}
            data-tooltip = "Erase board settings"
        >
            <EraseBoardSettingsIcon/>
        </a>
    );


  }

}

const initEraseBoardSettingsButton = () => {
    $("#" + plugin.slug + "_erase-board-settings-btn").on("click", eraseBoardSettings);
}

const eraseBoardSettings = (event) => {
    nukeBoardSettings();
}


export default EraseBoardSettingsButton;
export { EraseBoardSettingsButton, initEraseBoardSettingsButton };


