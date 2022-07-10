import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { cycleOptionInList, $getActiveList } from "../helpers";



class SavePresetButton extends JSXComponent {


  render(props) {
      



    return (
      <a className={ plugin.slug + "_save-preset-btn" } href="#">
        <i className="fas fa-save"></i>
      </a>
    );


  }

}




export default SavePresetButton;
export { SavePresetButton };



