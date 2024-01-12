import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";

import Icon from '../../assets/preset-icon_rename.js';


class RenamePresetButton extends JSXComponent {


  render(props) {
      
    const {
      index,
    } = props;


    return (
      <a
        href = "#"
        className = {classnames(
          `${plugin.slug}_rename-preset-btn`,
          `${plugin.slug}_preset-side-btn`,
        )}
        data-index = {index}
      >
        <Icon/>
      </a>
    );


  }

}


const initRenamePresetButtons = () => {
  $("." + plugin.slug + "_rename-preset-btn").on("click", renamePreset);
}

const renamePreset = (event) => {
  let $presetContainer = $(event.currentTarget).closest("." + plugin.slug + "_preset-container");
  $presetContainer.removeClass(`${plugin.slug}_edit-buttons-active`);
  $presetContainer.addClass(`${plugin.slug}_save-confirmation-active`);
  console.log($presetContainer);
}




export default RenamePresetButton;
export { RenamePresetButton, initRenamePresetButtons };



