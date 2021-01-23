import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../Utilities/ThemeContext";
import Notification from "../Components/Notification";
import Fade from "react-reveal/Fade";
import { faTrashAlt, faUser } from "@fortawesome/free-regular-svg-icons";
const firebase = require("firebase");

function ArrivalsModal(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const [show, setShow] = useState(false);
  const [toRange, setToRange] = useState(40);
  const [items, setItems] = useState(props.data.slice(0, toRange));

  useEffect(() => {
    setItems(props.data.slice(0, toRange));
  }, [props.data, toRange]);

  //Function to delete element from db
  //function to delete last arrival
  function deleteLastArrival(element) {
    const db = firebase.firestore();

    let tmpArrivals = [];
    props.usersData.data.forEach((user) => {
      if (user.name === element.member) {
        tmpArrivals = user.arrivals;
        tmpArrivals.forEach((arrival) => {
          if (
            arrival.toDate().getTime() ===
            firebase.firestore.Timestamp.fromDate(element.date)
              .toDate()
              .getTime()
          ) {
            //Delete arrival from array
            if (
              window.confirm(
                "Opravdu vymazat záznam? (" +
                  arrival.toDate().getDate() +
                  "." +
                  (arrival.toDate().getMonth() + 1) +
                  "." +
                  arrival.toDate().getFullYear() +
                  ", " +
                  element.member +
                  ")"
              )
            ) {
              tmpArrivals.splice(tmpArrivals.indexOf(arrival), 1);
              //Update record in database
              db.collection("users")
                .doc(user.id)
                .update({ arrivals: tmpArrivals })
                .then(function () {
                  Notification("Záznam byl smazán.", false);
                })
                .catch(function (error) {
                  console.log(error);
                  Notification("Chyba", true);
                });
            }
          }
        });
      }
    });
  }

  //function to make code
  const tableData = items.map((element, index) => {
    let tmpDate =
      element.date.getDate() +
      "." +
      (element.date.getMonth() + 1) +
      "." +
      element.date.getFullYear();

    //Color of card background -> legs/shoulders/hands/chest/back
    let iconColor = "text-magma-1"; //LEGS default
    if (element.member === "Luke") iconColor = "text-magma-2";
    else if (element.member === "Tom") iconColor = "text-magma-3";
    else if (element.member === "Dudu") iconColor = "text-magma-4";
    else if (element.member === "Cahlik") iconColor = "text-magma-5";
    return (
      <tr key={index}>
        <td
          className={`border-0 border-${theme}-ttern px-4 py-3 text-${theme}-tsec`}
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
          className={`border-0 border-${theme}-ttern px-4 py-3 text-${theme}-tsec`}
        >
          {tmpDate}
        </td>
        <td className={`border-0 border-${theme}-ttern px-4 py-3`}>
          <span>
            <FontAwesomeIcon
              role="img"
              aria-label="fntawsm"
              className={`cursor-pointer text-${theme}-sec hover:text-${theme}-pr`}
              icon={faTrashAlt}
              onClick={() => deleteLastArrival(element)}
            />
          </span>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <button
        onClick={() => setShow(!show)}
        className={`w-48 rounded-full font-bold bg-${theme}-sec bg-opacity-0 text-${theme}-sec hover:bg-opacity-50 py-3 m-3 `}
      >
        Správa/historie příchodů
      </button>

      {/* Menu transition and content */}
      <Fade bottom when={show} duration={500}>
        {show && (
          <div
            className={`fixed bg-${theme}-cardbg top-0 left-0 w-full h-full z-50 p-3 text-center text-white overflow-y-scroll`}
          >
            <div className="flex justify-center">
              {/* Lazy loading table */}
              <div
                className={`w-full sm:w-full md:w-2/5 p-1 sm:p-1 md:p-6 mt-2 sm:mt-2 md:mt-0`}
              >
                <div className={`w-full bg-${theme}-cardbg p-2 text-center`}>
                  <table className={`w-full table-auto text-center py-2`}>
                    <thead>
                      <tr>
                        {/* TODO: overflow a dát jich tam třeba 15 aby to bylo scrollable */}
                        <th className={`px-4 py-2 mt-1 text-${theme}-tsec`}>
                          Uživatel
                        </th>
                        <th className={`px-4 py-2 mt-1 text-${theme}-tsec`}>
                          Příchod
                        </th>
                        <th className={`px-4 py-2 mt-1 text-${theme}-tpr`}></th>
                      </tr>
                    </thead>
                    <tbody>{tableData}</tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Load more button */}

            <button
              onClick={() => setToRange(toRange + 40)}
              className={`w-full rounded-full font-bold text-${theme}-sec hover:bg-opacity-50 py-5 mb-32`}
            >
              Načíst další
            </button>
            {/* Closing button */}
            <div
              className={`font-bold p-3 fixed bottom-0 left-0 w-full z-50 mb-6`}
            >
              <button
                onClick={() => setShow(!show)}
                className={`w-48 rounded-full font-bold bg-${theme}-sec bg-opacity-75 text-white hover:bg-opacity-50 py-3 m-3 `}
              >
                Zavřít
              </button>
            </div>
          </div>
        )}
      </Fade>
    </div>
  );
}

export default ArrivalsModal;
