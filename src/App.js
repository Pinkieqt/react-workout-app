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
    <div className="App">
      <Router>
        <div className="flex flex-col">
          <Header />
          <div className="p-3 min-h-screen">
            <Switch>
              <Route exact path="/"> <DashboardComponent usersData={usersData}/> </Route>
              <Route path="/weight"> <WeightComponent usersData={usersData}/> </Route>
              <Route path="/records"> <RecordsComponent usersData={usersData}/> </Route>
            </Switch>          
          </div>


          <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
