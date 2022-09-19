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
        d="M5.471 8.663L4.17 10.9a.5.5 0 00.432.752h8.107a.5.5 0 00.432-.752l-2.943-5.056a.5.5 0 00-.864 0L7.446 9.085a.5.5 0 01-.865 0l-.245-.422a.5.5 0 00-.865 0zM6.585 5.465a.982.982 0 11-1.965 0 .982.982 0 011.965 0z"
      ></path>
    </svg>
  );
}

export default Icon;
