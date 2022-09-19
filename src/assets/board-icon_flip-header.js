import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="31"
      height="31"
      fill="none"
      viewBox="0 0 31 31"
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M3.643 8.571A3.433 3.433 0 00.21 12.004v3.78a1.716 1.716 0 103.433 0v-2.167h23.133v2.167a1.716 1.716 0 103.433 0v-3.78a3.433 3.433 0 00-3.433-3.433H3.643z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#000"
        fillRule="evenodd"
        d="M6.769 17.96c.726-.05 1.378.5 1.456 1.228.09.832.375 1.412.778 1.8.776.745 2.343 1.043 4.7.247 1.494-.505 3.14-1.405 4.765-2.663h-.213c-.73 0-1.345-.591-1.374-1.32a1.26 1.26 0 011.27-1.321h3.739c.73 0 1.345.59 1.374 1.32l.146 3.736a1.26 1.26 0 01-1.27 1.32c-.73 0-1.345-.59-1.373-1.32l-.03-.781c-2 1.65-4.108 2.863-6.1 3.535-2.65.895-5.522.948-7.43-.885-.978-.94-1.472-2.179-1.612-3.49a1.261 1.261 0 011.174-1.407z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
