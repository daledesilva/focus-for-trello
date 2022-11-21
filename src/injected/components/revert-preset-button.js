import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";

import Icon from '../../assets/preset-icon_revert.js';


class RevertPresetButton extends JSXComponent {


  render(props) {
      
    const {
      index,
    } = props;


    return (
      <a
        href = "#"
        className = {classnames(
          `${plugin.slug}_revert-preset-btn`,
          `${plugin.slug}_preset-side-btn`,
        )}
        data-index = {index}
      >
        <Icon/>
      </a>
    );


  }

}




const initRevertPresetButtons = () => {
  $("." + plugin.slug + "_revert-preset-btn").on("click", revertPreset);
}

const revertPreset = (event) => {
  let $presetContainer = $(event.currentTarget).closest("." + plugin.slug + "_preset-container");
  $presetContainer.addClass(`${plugin.slug}_revert-confirmation-active`);
}



export default RevertPresetButton;
export { RevertPresetButton, initRevertPresetButtons };



