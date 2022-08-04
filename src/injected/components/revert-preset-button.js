import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { cycleOptionInList, $getActiveList } from "../helpers";



class RevertPresetButton extends JSXComponent {


  render(props) {
      
    const {
      index,
    } = props;


    return (
      <a
        href = "#"
        className = {plugin.slug + "_revert-preset-btn"}
        data-index = {index}
      >
        <i className="fas fa-undo-alt"></i>
      </a>
    );


  }

}




const initRevertPresetButtons = () => {
  let $body = $("body");
  $body.find("." + plugin.slug + "_revert-preset-btn").on("click", revertPreset);
}

const revertPreset = (event) => {
  const index = event.currentTarget.dataset.index;
  console.log("revert preset button clicked: ", index);
  // activateBoardPreset(index);
}



export default RevertPresetButton;
export { RevertPresetButton, initRevertPresetButtons };



