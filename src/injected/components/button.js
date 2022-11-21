import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import {plugin} from "../../metadata";
import {devWarning} from "../generic-helpers";



// This doesn't apply any click action as those have to vbe applied after DOM load.
// This is just an abstraction for turning a link tag into a button

class Button extends JSXComponent {


  render(props) {

    const {
      className,
      children
    } = props;


    return (
      <a
        href = "#"
        className = {className}
      >
        {children}
      </a>
    );


  }

}




export default Button;
export { Button };



