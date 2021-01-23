import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import BarGraph from "../Components/BarGraph";
import { ThemeContext } from "../Utilities/ThemeContext";
import LineGraph from "../Components/LineGraph";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUser } from "@fortawesome/free-regular-svg-icons";
import { faAdjust, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ArrivalsGraph from "../Components/ArrivalsGraph";
import { useMediaQuery } from "react-responsive";
import { UserContext } from "../App";
import FastCardPreview from "../Components/FastCardPreview";
import ArrivalsModal from "../Components/ArrivalsModal";

const firebase = require("firebase");

function DashboardComponent(props) {
  const isMobile = useMediaQuery({ query: "(max-device-width: 1024px)" });
  const { loggedUser, setLoggedUser } = React.useContext(UserContext);
  const { theme, setTheme } = React.useContext(ThemeContext);

  //prichody tento rok, prichody celkove, posledni prichod
  const [content, setContent] = useState({
    thisYear: "",
    total: "",
    latest: "",
    monthDiffer: "",
  });

  const [arrivalsTableContent, setArrivalsTableContent] = useState([]);
  const [barGraphContent, setBarGraphContent] = useState([]);
  const [arrivalsModalContent, setArrivalsModalContent] = useState([]);
  const [lineGraphContent, setLineGraphContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  //function to changetheme - TODO: same func as in Navigation, fix later
  const changeTheme = () => {
    if (theme === "myLightTheme") {
      setTheme("myDarkTheme");
      localStorage.setItem("theme", "myDarkTheme");
    } else {
      setTheme("myLightTheme");
      localStorage.setItem("theme", "myLightTheme");
    }
  };

  //function to logout - TODO: same func as in Navigation, fix later
  function signOut() {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        setLoggedUser(null);
      })
      .catch((e) => {
        setLoggedUser(null);
      });
  }

  //function to generate content for dashboard graphs, cards, etc.
  function generateContent() {
    let thisYear = 0;
    let total = 0;
    let latest = 0;
    let monthLastYear = 0;
    let monthThisYear = 1;

    let latestArrivals = [];
    let barGraphData = [];
    let weekArrivals = {
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0,
    };

    props.usersData.data.forEach((user) => {
      let userArrivalsEveryYear = { name: user.name };

      user.arrivals.forEach((arrival) => {
        //Counting
        total++;
        let nDate = new Date();
        if (arrival.toDate().getYear() === nDate.getYear()) thisYear++;

        if (
          arrival.toDate().getYear() === nDate.getYear() - 1 &&
          arrival.toDate().getMonth() === nDate.getMonth()
        )
          monthLastYear++;
        if (
          arrival.toDate().getYear() === nDate.getYear() &&
          arrival.toDate().getMonth() === nDate.getMonth()
        )
          monthThisYear++;

        if (arrival > latest) latest = arrival;

        //Latest arrivals table
        latestArrivals.push({
          member: user.name,
          date: arrival.toDate(),
          key: total,
        });

        //Getting data for bar graph
        let arrivalYear = arrival.toDate().getFullYear();
        userArrivalsEveryYear[arrivalYear]
          ? (userArrivalsEveryYear[arrivalYear] += 1)
          : (userArrivalsEveryYear[arrivalYear] = 1);
      });

      //Bar graph content
      //userArrivalsEveryYear["Celkem"] = user.arrivals.length
      barGraphData.push(userArrivalsEveryYear);
    });

    //Sort latest arrivals
    latestArrivals = latestArrivals.sort((a, b) => b.date - a.date);
    setArrivalsModalContent(latestArrivals.slice());

    //Map latest arrivals to html
    latestArrivals = latestArrivals.slice(0, 5).map((element) => {
      let tmpDate =
        element.date.getDate() + "." + (element.date.getMonth() + 1) + ".";

      //Color of card background -> legs/shoulders/hands/chest/back
      let iconColor = "text-magma-1"; //LEGS default
      if (element.member === "Luke") iconColor = "text-magma-2";
      else if (element.member === "Tom") iconColor = "text-magma-3";
      else if (element.member === "Dudu") iconColor = "text-magma-4";
      else if (element.member === "Cahlik") iconColor = "text-magma-5";

      return (
        <tr key={element.key}>
          <td
            className={`border-0 border-${theme}-ttern px-4 py-1 text-${theme}-tsec`}
          >
            <span>
              <FontAwesomeIcon
                role="img"
                aria-label="fntawsm"
                className={iconColor}
                icon={faUser}
              />
            </span>
            &nbsp; {element.member}
          </td>
          <td
            className={`border-0 border-${theme}-ttern px-4 py-1 text-${theme}-tsec`}
          >
            {tmpDate}
          </td>
          {/* <td className={`border-0 border-${theme}-ttern px-4 py-1`}>
            <span>
              <FontAwesomeIcon
                role="img"
                aria-label="fntawsm"
                className={`cursor-pointer text-${theme}-sec hover:text-${theme}-pr`}
                icon={faTrashAlt}
                onClick={() => deleteLastArrival(element)}
              />
            </span>
          </td> */}
        </tr>
      );
    });

    let date =
      latest.toDate().getDate() + "." + (latest.toDate().getMonth() + 1) + ".";

    setArrivalsTableContent(latestArrivals);
    setBarGraphContent(barGraphData);
    setContent({
      thisYear: thisYear,
      total: total,
      latest: date,
      monthDiffer: monthThisYear - monthLastYear - 1,
    });
  }

  //function to generate data for line graph
  function generateLineGraph() {
    let allArrivals = [];
    let categories = {};

    //Combining arrays
    props.usersData.data.forEach((element) => {
      allArrivals = allArrivals.concat(element.arrivals);
    });

    allArrivals.forEach((date) => {
      let tmpDate = date.toDate();
      if (categories[tmpDate.getYear()]) {
        categories[tmpDate.getYear()][tmpDate.getMonth()]++;
      } else {
        categories[tmpDate.getYear()] = {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
          10: 0,
          11: 0,
        };
        categories[tmpDate.getYear()][tmpDate.getMonth()]++;
      }
    });

    setLineGraphContent(categories);
  }

  //Generate new content everytime when props change
  useEffect(() => {
    if (props.usersData.data.length > 0) {
      generateContent();
      generateLineGraph();
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [props]);

  /* 
        Render
    */
  return (
    <div className={`p-3 min-h-screen bg-${theme}-bg`}>
      {isLoading && (
        <div className={`flex justify-center mt-64`}>
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && (
        <div className={`container mx-auto md:px-32`}>
          <div className={`flex justify-center flex-wrap`}>
            <div className={`w-full mb-5 mt-5 sm:mt-5 md:mt-10`}>
              <h1
                className={`font-bold text-3xl text-center text-${theme}-tpr`}
              >
                Dashboard
              </h1>
            </div>

            {/* Fast card preview */}
            <FastCardPreview
              data={[
                { data: content.total, title: "příchodů celkem" },
                { data: content.monthDiffer, title: "rozdíl příchodů" },
                { data: content.thisYear, title: "tento rok" },
                { data: content.latest, title: "poslední příchod" },
              ]}
            />

            {/* Příchody */}
            <div className={`w-full mb-2 sm:mb-2 md:mb-0`}>
              <h1
                className={`font-bold text-2xl text-center text-${theme}-tpr`}
              >
                Příchody
              </h1>
              <h3 className={`text-center text-${theme}-tsec`}>
                V grafu níže lze pozorovat měsíční srovnání příchodů v
                jednotlivých letech.
              </h3>
            </div>

            {/* Linechart */}
            <div
              className={`w-full h-40 sm:h-40 md:h-64 p-1 sm:p-1 md:p-6 mb-12 sm:mb-12 md:mb-0`}
            >
              <div
                className={`w-full h-40 sm:h-40 md:h-64 bg-${theme}-cardbg rounded  text-center`}
              >
                <LineGraph categories={lineGraphContent} />
              </div>
            </div>

            <div
              className={`w-full flex justify-center flex-wrap mb-1 sm:mb-1 md:mt-12`}
            >
              {/* Barchart */}
              <div
                className={`w-full sm:w-full md:w-3/5 h-64 p-1 sm:p-1 md:p-6 mt-2 sm:mt-2 md:mt-0 mb-16 sm:mb-16 md:mb-0`}
              >
                <div className={`w-full`}>
                  <h3 className={`text-center text-${theme}-tsec mb-2`}>
                    Příchody jednotlivých členů
                  </h3>
                </div>
                <div
                  className={`w-full h-64 bg-${theme}-cardbg rounded  p-2 text-center`}
                >
                  <BarGraph arrivals={barGraphContent} />
                </div>
              </div>

              <div
                className={`w-full sm:w-full md:w-2/5 h-64 p-1 sm:p-1 md:p-6 mt-2 sm:mt-2 md:mt-0 mb-12 sm:mb-12 md:mb-0`}
              >
                <div className={`w-full`}>
                  <h3 className={`text-center text-${theme}-tsec mb-2`}>
                    Poslední příchody
                  </h3>
                </div>
                <div
                  className={`w-full h-64 bg-${theme}-cardbg rounded  p-2 text-center`}
                >
                  <table className={`w-full table-auto text-center py-2 h-56`}>
                    <thead>
                      <tr>
                        {/* TODO: overflow a dát jich tam třeba 15 aby to bylo scrollable */}
                        <th
                          className={`px-4 py-2 mt-1 text-${theme}-tsec font-normal `}
                        >
                          Uživatel
                        </th>
                        <th
                          className={`px-4 py-2 mt-1 text-${theme}-tsec font-normal`}
                        >
                          Příchod
                        </th>
                        {/* <th className={`px-4 py-2 mt-1 text-${theme}-tpr`}></th> */}
                      </tr>
                    </thead>
                    <tbody>{arrivalsTableContent}</tbody>
                  </table>
                </div>
              </div>

              {/* Historie příchodů */}

              <div className={`w-full`}>
                <h3
                  className={`text-center text-${theme}-tsec mt-5 sm:mt-5 md:mt-24 px-5`}
                >
                  Pro zobrazení historie příchodů a jejich správu, klikni na
                  tlačítko níže.
                </h3>
              </div>
              <ArrivalsModal
                data={arrivalsModalContent}
                usersData={props.usersData}
              />
            </div>

            {/* ArrivalsGraph */}
            <div
              className={`w-full p-1 sm:p-1 md:p-6 mb-12 sm:mb-12 md:mb-6 mt-5 sm:mt-5 md:mt-12`}
            >
              <div className={`w-full`}>
                <h3 className={`text-center text-${theme}-tsec mb-2`}>
                  Heat mapa příchodů pro vybraný rok
                </h3>
              </div>
              <div className={`w-full mb-2 flex justify-center`}>
                <button
                  className={`text-center text-${theme}-tsec text-2xl`}
                  onClick={() => setSelectedYear(selectedYear - 1)}
                >
                  &#8592;
                </button>
                <h4
                  className={`text-center text-${theme}-sec ml-2 mr-2 text-2xl`}
                >
                  {selectedYear}
                </h4>
                <button
                  className={`text-center text-${theme}-tsec text-2xl`}
                  onClick={() => setSelectedYear(selectedYear + 1)}
                >
                  &#8594;
                </button>
              </div>
              <div className={`w-full bg-${theme}-cardbg rounded  text-center`}>
                <ArrivalsGraph
                  usersData={props.usersData}
                  selectedYear={selectedYear}
                />
              </div>
            </div>

            {isMobile && (
              <div>
                <span
                  className={`text-lg text-${theme}-pr cursor-pointer`}
                  onClick={() => changeTheme()}
                >
                  <FontAwesomeIcon
                    role="img"
                    aria-label="Theme"
                    icon={faAdjust}
                  />{" "}
                  Téma
                </span>
                <span
                  className={`ml-20 text-lg text-${theme}-pr cursor-pointer`}
                  onClick={() => signOut()}
                >
                  <FontAwesomeIcon
                    role="img"
                    aria-label="fntawsm"
                    icon={faSignOutAlt}
                  />{" "}
                  Odhlásit
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardComponent;
