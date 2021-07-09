import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import AddTutorial from "./components/add-tutorial.component";
import AddTutorial1 from "./components/add-tutorial.component1";
import TutorialsList from "./components/tutorials-list.component";
import Information from "./components/tutorials-list.component1";
import thanks from "./components/tutorials-list.component2";
import thanks1 from "./components/tutorials-list.component3";

class App extends Component {
  render() {
    return (
      <div>
        <div style={{backgroundColor: '#FFFDC0'}}>
        <nav className="navbar navbar-expand">
          <a href="/Home" className="navbar-brand">
          <Avatar alt="Remy Sharp" src="https://cdn.animaapp.com/projects/60874d0b3217b66d32be76c7/releases/60874dd2a7ec575273eb3984/img/rectangle-1@2x.png" />
            
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Home"} className="nav-link">
              <h6 style={{color: '0E1973'}}>Mapa</h6>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Cadastro"} className="nav-link">
              <h6 style={{color: '0E1973'}}>Cadastro</h6>
              </Link>
            </li>
              <li className="nav-item">
              <Link to={"/Faleconosco"} className="nav-link">
              <h6 style={{color: '0E1973'}}>Fale Conosco</h6>
              </Link>
            </li>
          </div>
        </nav>
        </div>

        <div className="container mt-3">
          <h2></h2>
          <Switch>
            <Route exact path={["/", "/Home"]} component={TutorialsList} />
            <Route exact path="/Cadastro" component={AddTutorial} />
            <Route exact path="/Faleconosco" component={AddTutorial1} />
            <Route exact path="/Informacao" component={Information} />
            <Route exact path="/Agradecimento" component={thanks} />
            <Route exact path="/Mensagem" component={thanks1} />
          </Switch>
          
       
        </div>
      </div>
    );
  }
}

export default App;
