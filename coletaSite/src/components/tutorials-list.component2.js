import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

import Tutorial from "./tutorial.component";

import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';

import { Switch, Route, Link } from "react-router-dom";

const style = {
 
  d1:{
    alignSelf: 'center'
    },
    t1:{
    color: '#1DA64B', 
    fontWeight: 'bold'
    },
    t2: {
    color: '#0E1973', 
    fontWeight: 'bold'
    },
    t3:{
    fontWeight: 'bold'
    },
    Simg:{ 
    width: '50%', 
    marginLeft: 100
    },
    


};

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = TutorialDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let tutorials = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      tutorials.push({
        id: id,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    this.setState({
      tutorials: tutorials,
    });
  }

  refreshList() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  render() {
    const { tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <Container maxWidth="sm">
      <div className="list row">
        <div className="col-md-6">
          <h4></h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>
        </div>
        <div >
          {currentTutorial ? (
            <Tutorial
              tutorial={currentTutorial}
              refreshList={this.refreshList}
            />
          ) : (
            <div >

              
            <br />

         
            <h3 style={style.t2}> Obrigado</h3>


            <img   src="https://cdn.animaapp.com/projects/60874d0b3217b66d32be76c7/releases/60874dd2a7ec575273eb3984/img/sem-ti-tulo-1-1@2x.png"/>

            <h3 style={style.t3} > {"Você já está contribuindo para um mundo melhor ;)"}</h3>

            <br />


            <h3 > Em breve você receberá um E-mail com os próximos passos.</h3>

            <br />
  
            <h3 style={style.t1} > Enquanto isso, conheça nosso trabalho nas redes sociais:</h3>

            <br />

            <img  style = {style.Simg}  src="https://cdn.animaapp.com/projects/60874d0b3217b66d32be76c7/releases/60874dd2a7ec575273eb3984/img/social-1@2x.png"/>

           


            <br />

            <br />    



          </div>
          )}
        </div>
      </div>
      </Container>
    );
  }
}
