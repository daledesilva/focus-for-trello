import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      fill="none"
      viewBox="0 0 19 19"
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="2"
        d="M17.197 4.58V2.379a1 1 0 00-1-1H2.72a1 1 0 00-1 1V4.58"
      ></path>
      <path
        fill="#000"
        d="M1.719 2.378a1 1 0 011-1h13.478a1 1 0 011 1v1.36H1.72v-1.36z"
      ></path>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="2"
        d="M1.719 13.895v2.202a1 1 0 001 1h13.478a1 1 0 001-1v-2.202"
      ></path>
      <path
        fill="#000"
        fillRule="evenodd"
        d="M14.062 5.02a1.5 1.5 0 010 2.12l-7.086 7.088a1.5 1.5 0 01-2.122-2.121l7.086-7.088a1.5 1.5 0 012.122 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#000"
        fillRule="evenodd"
        d="M4.853 5.02a1.5 1.5 0 012.122 0l7.087 7.086a1.5 1.5 0 11-2.121 2.121L4.854 7.141a1.5 1.5 0 010-2.121z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
