import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { cycleOptionInList, $getActiveList } from "../helpers";


const unsavedPresetPrefix = "Unnamed Preset ";
const defaultPresetName = "Default";


class PresetButton extends JSXComponent {


  render(props) {

    const {
      index,
      boardPreset,
    } = props;



    return (
      <a className={ plugin.slug + "_preset-btn" } href="#">
        {
            index == 0 && defaultPresetName ||
            boardPreset.isSaved && boardPreset.presetName ||
            !boardPreset.isSaved && unsavedPresetPrefix+index
        }
      </a>
    );


  }

}




export default PresetButton;
export { PresetButton };



