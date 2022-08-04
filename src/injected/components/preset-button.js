import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { activateBoardPreset } from "../helpers";


const unsavedPresetPrefix = "Unnamed Preset ";
const defaultPresetName = "Default";


class PresetButton extends JSXComponent {


  render(props) {

    const {
      index,
      boardPreset,
    } = props;


    return (
      <a
        href = "#"
        className = {plugin.slug + "_preset-btn"}
        data-index = {index}
      >
        {
            index == 0 && defaultPresetName ||
            boardPreset.isSaved && boardPreset.presetName ||
            !boardPreset.isSaved && unsavedPresetPrefix+index
        }
      </a>
    );


  }

}

const initPresetButtons = () => {
  let $body = $("body");
  $body.find("." + plugin.slug + "_preset-btn").on("click", activatePreset);
}

const activatePreset = (event) => {
  const index = event.target.dataset.index;
  console.log("button clicked: ", index);
  activateBoardPreset(index);
}




export default PresetButton;
export { PresetButton, initPresetButtons };



