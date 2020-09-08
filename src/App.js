import React from 'react';
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

function App() {
  return (
    <div className="App">
      <Router>
        <div className="flex flex-col">
          <Header />

          <div className="p-3 min-h-screen">
            <Switch>
              <Route exact path="/"> <DashboardComponent /> </Route>
              <Route path="/weight"> <WeightComponent /> </Route>
              <Route path="/records"> <RecordsComponent /> </Route>
            </Switch>          
          </div>


          <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
