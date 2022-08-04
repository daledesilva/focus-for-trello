import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { nukePresetSettings } from "../helpers";


class DeletePresetButton extends JSXComponent {


  render(props) {
      
    const {
      index,
    } = props;


    return (
        <a
          href = "#"
          className = { plugin.slug + "_delete-preset-btn" }
          data-index = {index}
        >
            <i className="fas fa-trash"></i>
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
  nukePresetSettings(index);
}


export default DeletePresetButton;
export { DeletePresetButton, initDeletePresetButtons };



