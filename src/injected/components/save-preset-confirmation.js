import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"
import Button from "./button";
import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { activateBoardPreset } from "../helpers";


const unsavedPresetPrefix = "Preset ";
const defaultPresetName = "Default";


class SavePresetConfirmation extends JSXComponent {


  render(props) {

    const {
      actionLabel,
      onActionClick,
      index,
    } = props;


    return (
      <div
          className = {classnames(
            plugin.slug + "_confirmation",
            plugin.slug + "_save-confirmation",
          )}
        >
          
          <Button
            className = {classnames(
              plugin.slug + "_cancel-btn",
            )}
          >
            Cancel
          </Button>

          <Button
            className = {classnames(
              plugin.slug + "_action-btn",
            )}
            data-index = {index}
          >
            Save
          </Button>

      </div>
    );


  }

}

const initSavePresetConfirmation = () => {
  let $saveConfirmation = $(`.${plugin.slug}_save-confirmation`);
  let $cancelBtn = $saveConfirmation.find(`.${plugin.slug}_cancel-btn`);
  let $actionBtn = $saveConfirmation.find(`.${plugin.slug}_action-btn`);
  
  // LEFT CLICK ACTION
  $cancelBtn.on("click", activateCancel);
  $actionBtn.on("click", activateAction);

}

const activateCancel = (event) => {
  let $presetContainer = $(event.currentTarget).closest("." + plugin.slug + "_preset-container");
  $presetContainer.removeClass(`${plugin.slug}_save-confirmation-active`);
}
const activateAction = (event) => {
  const index = event.currentTarget.dataset.index;
  console.log("SAVE!")
}




export default SavePresetConfirmation;
export { SavePresetConfirmation, initSavePresetConfirmation };

