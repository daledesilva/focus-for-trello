import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { deletePresetSettings } from "../helpers";

import Icon from '../../assets/icon_delete.js';


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
  let $body = $("body");
  $body.find("." + plugin.slug + "_delete-preset-btn").on("click", deletePreset);
}

const deletePreset = (event) => {
  const index = event.currentTarget.dataset.index;
  console.log("delete preset button clicked: ", index);
  deletePresetSettings(index);
}


export default DeletePresetButton;
export { DeletePresetButton, initDeletePresetButtons };



