import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { activateBoardPreset } from "../helpers";

import SettingsIcon from '../../assets/icon_more';



class SettingsButton extends JSXComponent {


  render(props) {

    return (
        <a
            href="#"
            id={ plugin.slug + "_settings-btn" }
            className={classnames(
                plugin.slug + "_circle-btn",
                `${plugin.slug}_tooltip`,
            )}
            data-tooltip = "Setup actions"
        >
            <SettingsIcon/>
        </a>
    );


  }

}

const initSettingsButton = () => {
  $("#" + plugin.slug + "_settings-btn").on("click", openSettings);
}

const openSettings = (event) => {
  console.log('Settings button clicked');
}


export default SettingsButton;
export { SettingsButton, initSettingsButton };



