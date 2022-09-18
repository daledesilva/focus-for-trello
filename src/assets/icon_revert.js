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
        d="M9.435 6.852a1.5 1.5 0 011.5-1.5 5.646 5.646 0 11-5.646 5.646 1.5 1.5 0 013 0 2.646 2.646 0 102.646-2.646 1.5 1.5 0 01-1.5-1.5z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#000"
        fillRule="evenodd"
        d="M10.614 4.307a1 1 0 010 1.415l-1.13 1.13 1.13 1.13A1 1 0 019.2 9.398L7.716 7.913a1.5 1.5 0 010-2.122L9.2 4.307a1 1 0 011.414 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
