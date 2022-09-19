import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'

function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="16"
        fill="none"
        viewBox="0 0 17 16"
      >
        <path
          fill="#fff"
          d="M4.17 7.787a2.502 2.502 0 012.503-2.502h3.25a2.502 2.502 0 010 5.005h-3.25a2.502 2.502 0 01-2.502-2.503z"
        ></path>
        <path
          fill="#fff"
          d="M5.264 11.285V9.433a.5.5 0 01.5-.5h1.852a.5.5 0 01.353.854l-1.852 1.852a.5.5 0 01-.853-.354z"
        ></path>
      </svg>
    );
  }
  
  export default Icon;
  