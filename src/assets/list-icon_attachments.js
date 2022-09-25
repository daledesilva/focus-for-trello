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
        d="M9.386 5.272a.36.36 0 00-.509.001L6.35 7.811a1.47 1.47 0 002.081 2.077L9.828 8.49a.75.75 0 011.06 1.06l-1.396 1.397a2.97 2.97 0 01-4.205-4.195l2.528-2.538a1.86 1.86 0 112.632 2.627L7.944 9.345a.75.75 0 01-1.061-1.06L9.387 5.78a.36.36 0 00-.001-.509z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
