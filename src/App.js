import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Component/SidebarContents/Home';
import Create from './Component/SidebarContents/Create';
import View from './Component/SidebarContents/View';
import Notification from './Component/SidebarContents/Notification';
import About from './Component/SidebarContents/About';

function App() {
  return ( 
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Create" component={Create} />
            <Route exact path="/View" component={View} />
            <Route exact path="/Notification" component={Notification} />
            <Route exact path="/About" component={About} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;