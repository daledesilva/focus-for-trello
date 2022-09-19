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
        d="M9.536 5.12v2.938a1 1 0 01-2 0V5.121a1 1 0 012 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M11.49 11.976a1 1 0 01-1.404-.18L7.754 8.782a1 1 0 111.583-1.224l2.332 3.016a1 1 0 01-.18 1.403z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
