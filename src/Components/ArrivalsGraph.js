import React, { useEffect, useState } from "react";
import { ThemeContext } from "../Utilities/ThemeContext";

function ArrivalsGraph(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const [tableContent, setTableContent] = useState([]);
  const [daysCount, setDaysCount] = useState(365);

  //Generate new content everytime when props change
  useEffect(() => {
    if (props.usersData.data.length > 0) {
      getTableContent();
    }
  }, [props]);

  //Function to get day of month in year
  function getHoverDate(hoverDate) {}

  //Function to get table content
  function getTableContent() {
    let result = [];
    let arrivals = [];
    let todaysYear = props.selectedYear;

    //Get all arrivals data combined
    for (let tmp in props.usersData.data) {
      arrivals = arrivals.concat(props.usersData.data[tmp].arrivals);
    }

    let countedArrivals = {};

    for (let x in arrivals) {
      if (arrivals[x].toDate().getFullYear() === todaysYear) {
        var now = arrivals[x].toDate();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff =
          now -
          start +
          (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);

        countedArrivals[day]
          ? (countedArrivals[day] += 1)
          : (countedArrivals[day] = 1);
      }
    }

    //Get number of days in current year
    let dcount = 365;
    todaysYear % 400 === 0 || (todaysYear % 100 !== 0 && todaysYear % 4 === 0)
      ? (dcount = 366)
      : (dcount = 365);

    for (let i = 1; i <= daysCount; i++) {
      let tmpDict = {};
      countedArrivals[i] ? (tmpDict[i] = countedArrivals[i]) : (tmpDict[i] = 0);
      result.push(tmpDict);
    }
    setDaysCount(dcount);
    setTableContent(result);
  }

  const content = tableContent.map((el) => {
    let tmp = Object.values(el)[0];
    let dotStyle = "bg-" + theme + "-ttern"; //default

    if (tmp === 1) dotStyle = "bg-magma-2";
    else if (tmp === 2) dotStyle = "bg-magma-3";
    else if (tmp === 3) dotStyle = "bg-magma-4";
    else if (tmp === 4) dotStyle = "bg-magma-5";
    else if (tmp === 5) dotStyle = "bg-magma-6";

    return (
      <div
        className={`w-2 sm:w-2 md:w-3 h-2 sm:h-2 md:h-3 rounded-sm m-1 ${dotStyle}`}
        key={Object.keys(el)[0]}
      ></div>
    );
  });

  return (
    <div>
      <div className={`w-full flex flex-wrap justify-evenly p-2 pt-3`}>
        <h6 className={`text-${theme}-ttern`}>
          <div
            className={`w-2 sm:w-2 md:w-3 h-2 sm:h-2 md:h-3 rounded-sm m-1 bg-${theme}-ttern`}
          ></div>
          0
        </h6>
        <h6 className={`text-magma-2`}>
          <div
            className={`w-2 sm:w-2 md:w-3 h-2 sm:h-2 md:h-3 rounded-sm m-1 bg-magma-2`}
          ></div>
          1
        </h6>
        <h6 className={`text-magma-3`}>
          <div
            className={`w-2 sm:w-2 md:w-3 h-2 sm:h-2 md:h-3 rounded-sm m-1 bg-magma-3`}
          ></div>
          2
        </h6>
        <h6 className={`text-magma-4`}>
          <div
            className={`w-2 sm:w-2 md:w-3 h-2 sm:h-2 md:h-3 rounded-sm m-1 bg-magma-4`}
          ></div>
          3
        </h6>
        <h6 className={`text-magma-5`}>
          <div
            className={`w-2 sm:w-2 md:w-3 h-2 sm:h-2 md:h-3 rounded-sm m-1 bg-magma-5`}
          ></div>
          4
        </h6>
        <h6 className={`text-magma-6`}>
          <div
            className={`w-2 sm:w-2 md:w-3 h-2 sm:h-2 md:h-3 rounded-sm m-1 bg-magma-6`}
          ></div>
          5
        </h6>
      </div>
      <div className={`w-full flex flex-wrap justify-center p-2`}>
        {content}
      </div>
    </div>
  );
}

export default ArrivalsGraph;
