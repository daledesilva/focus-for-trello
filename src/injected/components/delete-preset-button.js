import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";
import { cycleOptionInList, $getActiveList } from "../helpers";



class DeletePresetButton extends JSXComponent {


  render(props) {
      



    return (
        <a
            className = { plugin.slug + "_delete-preset-btn" }
            href = "#"
            onClick = { () => {
                alert("hello");
                // nukePresetSettings(index)
            }}
        >
            <i className="fas fa-trash"></i>
        </a>
    );


  }

}




export default DeletePresetButton;
export { DeletePresetButton };



