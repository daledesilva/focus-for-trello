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
        fillRule="evenodd"
        d="M8.196 10.466a2.441 2.441 0 100-4.882 2.441 2.441 0 000 4.883zm-.972-2.503c0-.483.392-.874.874-.874a.4.4 0 100-.8c-.924 0-1.674.75-1.674 1.674a.4.4 0 10.8 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M8.119 6.265c-1.105-.008-2.23.463-3.239 1.526A.75.75 0 113.792 6.76c1.252-1.32 2.76-2.005 4.337-1.994 1.569.01 3.109.708 4.442 1.964a.75.75 0 01-1.028 1.092c-1.12-1.054-2.31-1.549-3.424-1.556z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
