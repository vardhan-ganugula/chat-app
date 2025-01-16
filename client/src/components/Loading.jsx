import React from "react";
import { FaInstalod } from "react-icons/fa";


const Loading = ({ classes }) => {
  return (
    <div
      className={`text-8xl grid place-content-center text-center w-full ${classes}`}
    >
      <FaInstalod className="animate-spin " />
    </div>
  );
};

export default Loading;
