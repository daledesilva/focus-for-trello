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
        d="M12.108 8.726H4.435a.75.75 0 110-1.5h7.673a.75.75 0 010 1.5z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M4.59 6.598a.55.55 0 01.927.4v1.95a.55.55 0 01-.927.4l-.921-.865a.7.7 0 010-1.02l.921-.865zM11.955 9.351a.55.55 0 01-.927-.4V7a.55.55 0 01.927-.4l.92.865a.7.7 0 010 1.02l-.92.865z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
