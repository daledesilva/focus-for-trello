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
        d="M10.565 5.186a1.5 1.5 0 011.5 1.5v9.5a1.5 1.5 0 01-3 0v-9.5a1.5 1.5 0 011.5-1.5z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#000"
        fillRule="evenodd"
        d="M8.314 6.686a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 010 3h-1.5a1.5 1.5 0 01-1.5-1.5zM8.314 16.186a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 010 3h-1.5a1.5 1.5 0 01-1.5-1.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
