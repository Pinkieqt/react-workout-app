import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import DashboardComponent from "./Views/Dashboard";
import RecordsComponent from "./Views/Records";
import WeightComponent from "./Views/Weight";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlansComponent from "./Views/Plans";
import ThemeContext from "./Utilities/ThemeContext";
import DefUserContext from "./Utilities/DefUserContext";
import LoginComponent from "./Views/Login";
import LoadingSpinner from "./Components/LoadingSpinner";

const firebase = require("firebase");
export const UserContext = React.createContext();

function App() {
  const [loggedUser, setLoggedUser] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const defaultContext = { loggedUser, setLoggedUser };

  const [usersData, setUsersData] = useState({
    loading: false,
    data: [],
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setLoggedUser(user);
      setIsLoading(false);
    });

    if (loggedUser !== null) {
      firebase
        .firestore()
        .collection("users")
        .onSnapshot((serverUpdate) => {
          const users = serverUpdate.docs.map((_doc) => {
            const data = _doc.data();
            data["id"] = _doc.id;
            return data;
          });
          setUsersData({ loading: false, data: users });
        });
    }
  }, [loggedUser]);

  return (
    <ThemeContext>
      <DefUserContext>
        <UserContext.Provider value={defaultContext}>
          <div className={`App font-robot`}>
            {isLoading ? (
              <div className={`flex justify-center mt-64`}>
                <LoadingSpinner />
              </div>
            ) : (
              <div>
                <Router>
                  {loggedUser === null ? (
                    <LoginComponent />
                  ) : (
                    <div className={`flex flex-col`}>
                      <Header usersData={usersData} />
                      {/* <div className={`p-3 min-h-screen bg-myLightTheme-bg`}> */}
                      <Switch>
                        <Route exact path="/">
                          {" "}
                          <DashboardComponent usersData={usersData} />{" "}
                        </Route>
                        <Route path="/weight">
                          {" "}
                          <WeightComponent usersData={usersData} />{" "}
                        </Route>
                        <Route path="/records">
                          {" "}
                          <RecordsComponent usersData={usersData} />{" "}
                        </Route>
                        <Route path="/plans">
                          {" "}
                          <PlansComponent usersData={usersData} />{" "}
                        </Route>
                        <Route>
                          {" "}
                          <Redirect to="/" />{" "}
                        </Route>
                      </Switch>
                      {/* </div> */}

                      <Footer className={`mt-12 sm:mt-12 md:mt-0`} />

                      <ToastContainer
                        position="top-center"
                        transition={Slide}
                        autoClose={2500}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable={false}
                        pauseOnHover
                      />
                    </div>
                  )}
                </Router>
              </div>
            )}
          </div>
        </UserContext.Provider>
      </DefUserContext>
    </ThemeContext>
  );
}

export default App;
