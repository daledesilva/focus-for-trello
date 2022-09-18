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
        d="M16.45 6.216a1.5 1.5 0 01.321 2.097l-5.803 7.9a1.5 1.5 0 01-2.352.084L6.06 13.292a1.5 1.5 0 012.286-1.943l1.326 1.56 4.68-6.372a1.5 1.5 0 012.098-.321z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
