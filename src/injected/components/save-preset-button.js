import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";

import Icon from '../../assets/preset-icon_save.js';


class SavePresetButton extends JSXComponent {


  render(props) {
      
    const {
      index,
    } = props;


    return (
      <a
        href = "#"
        className = {classnames(
          `${plugin.slug}_save-preset-btn`,
          `${plugin.slug}_preset-side-btn`,
        )}
        data-index = {index}
      >
        <Icon/>
      </a>
    );


  }

}


const initSavePresetButtons = () => {
  let $body = $("body");
  $body.find("." + plugin.slug + "_save-preset-btn").on("click", savePreset);
}

const savePreset = (event) => {
  const index = event.currentTarget.dataset.index;
  console.log("save preset button clicked: ", index);
  // activateBoardPreset(index);
}




export default SavePresetButton;
export { SavePresetButton, initSavePresetButtons };



