import React from "react";
import { ThemeContext } from "../Utilities/ThemeContext";

function FastCardPreview(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div
      className={`w-full flex justify-around flex-wrap mb-5 sm:mb-5 md:mb-12`}
    >
      <div className={`w-2/4 sm:w-2/4 md:w-48 h-24 p-1 sm:p-1 md:p-0`}>
        <div
          className={`w-full h-full bg-magma-2 bg-opacity-25 rounded-lg  text-center`}
        >
          {/* <div className={`w-full h-1 bg-magma-2`}></div> */}
          <div className={`pt-3 text-${theme}-tpr`}>{props.data[0].title}</div>
          <div className={`text-4xl font-bold text-magma-2`}>
            {props.data[0].data}
          </div>
        </div>
      </div>
      <div className={`w-2/4 sm:w-2/4 md:w-48 h-24 p-1 sm:p-1 md:p-0`}>
        <div
          className={`w-full h-full bg-magma-3 bg-opacity-25 rounded-lg  text-center`}
        >
          {/* <div className={`w-full h-1 bg-magma-3`}></div> */}
          <div className={`pt-3 text-${theme}-tpr`}>{props.data[1].title}</div>
          <div className={`text-4xl font-bold text-magma-3`}>
            {props.data[1].data}
          </div>
        </div>
      </div>
      <div className={`w-2/4 sm:w-2/4 md:w-48 h-24 p-1 sm:p-1 md:p-0`}>
        <div
          className={`w-full h-full bg-magma-4 bg-opacity-25 rounded-lg  text-center`}
        >
          {/* <div className={`w-full h-1 bg-magma-4`}></div> */}
          <div className={`pt-3 text-${theme}-tpr`}>{props.data[2].title}</div>
          <div className={`text-4xl font-bold text-magma-4`}>
            {props.data[2].data}
          </div>
        </div>
      </div>
      <div className={`w-2/4 sm:w-2/4 md:w-48 h-24 p-1 sm:p-1 md:p-0`}>
        <div
          className={`w-full h-full bg-magma-5 bg-opacity-25 rounded-lg  text-center`}
        >
          {/* <div className={`w-full h-1 bg-magma-5`}></div> */}
          <div className={`pt-3 text-${theme}-tpr`}>{props.data[3].title}</div>
          <div className={`text-4xl font-bold text-magma-5`}>
            {props.data[3].data}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FastCardPreview;
