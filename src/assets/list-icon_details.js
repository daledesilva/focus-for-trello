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
        d="M12.672 6.71c0 .47-.38.85-.85.85H4.944a.85.85 0 010-1.7h6.878c.47 0 .85.38.85.85zM9.019 10.089H4.945a.85.85 0 110-1.7h4.074a.85.85 0 010 1.7z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
