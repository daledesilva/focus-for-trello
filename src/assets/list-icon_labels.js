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
        d="M4.745 8.902a1 1 0 00.194 1.4l2.105 1.593a1 1 0 001.4-.194l2.663-3.518a2 2 0 00.356-1.646l-.278-1.233a1 1 0 00-1.03-.779l-1.261.068a2 2 0 00-1.488.79L4.745 8.903zm4.663-3.207a.535.535 0 11.853.646.535.535 0 01-.853-.646z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
