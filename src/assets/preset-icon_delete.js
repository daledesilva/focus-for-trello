import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M15.52 6.465a1.5 1.5 0 010 2.121l-7.086 7.088a1.5 1.5 0 01-2.122-2.121l7.086-7.088a1.5 1.5 0 012.122 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#000"
        fillRule="evenodd"
        d="M6.311 6.466a1.5 1.5 0 012.122 0l7.087 7.086a1.5 1.5 0 11-2.121 2.121L6.312 8.587a1.5 1.5 0 010-2.121z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
