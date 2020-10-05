import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import DashboardComponent from "./Views/Dashboard";
import RecordsComponent from "./Views/Records";
import WeightComponent from "./Views/Weight";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlansComponent from "./Views/Plans"

const firebase = require('firebase');

function App() {

  const [usersData, setUsersData] = useState({
    loading: false,
    data: []
  });

  useEffect(() => {
    firebase.firestore().collection('users').onSnapshot(serverUpdate => {
      const users = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      setUsersData({loading: false, data: users});
    })
  }, []);

  return (
    <div className="App font-robot">
      <Router>
        <div className="flex flex-col bg-myTheme-bg ">
          <Header usersData={usersData}/>
          <div className="p-3 min-h-screen bg-myTheme-bg">
            <Switch>
              <Route exact path="/"> <DashboardComponent usersData={usersData}/> </Route>
              <Route path="/weight"> <WeightComponent usersData={usersData}/> </Route>
              <Route path="/records"> <RecordsComponent usersData={usersData}/> </Route>
              <Route path="/plans"> <PlansComponent usersData={usersData}/> </Route>
            </Switch>          
          </div>

          <Footer className="mt-12 sm:mt-12 md:mt-0"/>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
          />

        </div>
      </Router>
    </div>
  );
}

export default App;
