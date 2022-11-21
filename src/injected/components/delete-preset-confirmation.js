import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"
import Button from "./button";
import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { activateBoardPreset, deletePresetSettings } from "../helpers";


const unsavedPresetPrefix = "Preset ";
const defaultPresetName = "Default";


class DeletePresetConfirmation extends JSXComponent {


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
            plugin.slug + "_delete-confirmation",
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
            Delete
          </Button>

      </div>
    );


  }

}

const initDeletePresetConfirmation = () => {
  let $deleteConfirmation = $(`.${plugin.slug}_delete-confirmation`);
  let $cancelBtn = $deleteConfirmation.find(`.${plugin.slug}_cancel-btn`);
  let $actionBtn = $deleteConfirmation.find(`.${plugin.slug}_action-btn`);
  
  // LEFT CLICK ACTION
  $cancelBtn.on("click", activateCancel);
  $actionBtn.on("click", activateAction);

}

const activateCancel = (event) => {
  let $presetContainer = $(event.currentTarget).closest("." + plugin.slug + "_preset-container");
  $presetContainer.removeClass(`${plugin.slug}_delete-confirmation-active`);
}
const activateAction = (event) => {
  const index = event.currentTarget.dataset.index;
  deletePresetSettings(index);
}







export default DeletePresetConfirmation;
export { DeletePresetConfirmation, initDeletePresetConfirmation };



