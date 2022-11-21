import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { deletePresetSettings } from "../helpers";

import Icon from '../../assets/preset-icon_delete.js';


class DeletePresetButton extends JSXComponent {


  render(props) {
      
    const {
      index,
    } = props;


    return (
        <a
          href = "#"
          className = {classnames(
            `${plugin.slug}_delete-preset-btn`,
            `${plugin.slug}_preset-side-btn`,
          )}
          data-index = {index}
        >
          <Icon/>
        </a>
    );


  }

}



const initDeletePresetButtons = () => {
  $("." + plugin.slug + "_delete-preset-btn").on("click", showDeleteConfirmation);
}

const showDeleteConfirmation = (event) => {
  let $presetContainer = $(event.currentTarget).closest("." + plugin.slug + "_preset-container");
  $presetContainer.addClass(`${plugin.slug}_delete-confirmation-active`);
}


export default DeletePresetButton;
export { DeletePresetButton, initDeletePresetButtons };



