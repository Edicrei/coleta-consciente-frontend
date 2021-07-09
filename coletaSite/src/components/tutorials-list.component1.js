import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

import Tutorial from "./tutorial.component";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import { Switch, Route, Link } from "react-router-dom";

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
    Simg:{ 
    width: 50
    },
    
    

};

export default class TutorialsList extends Component {
  static defaultProps = {
    center: {
      lat: -23.6271568,
      lng: -46.645314
    },
    zoom: 11
  };
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
      
            <Grid style={style.d1}>

              
            <Grid item xs={12}>

              <h3 style={style.t1}>Local: <text style={style.t2}> Santuário São judas</text></h3>
           


              <p>O Local Santuário São Judas realiza a
                coleta de pilhas, baterias e componentes 
                e peças de celular.
              </p>

            

              <h5>Fica localizado próximo ao metrô</h5>

              <br />

              <img  style = {style.Simg} src="https://cdn.animaapp.com/projects/60874d0b3217b66d32be76c7/releases/60874dd2a7ec575273eb3984/img/pilha-1@2x.png"/>

              <img  style = {style.Simg}  src="https://cdn.animaapp.com/projects/60874d0b3217b66d32be76c7/releases/60874dd2a7ec575273eb3984/img/bateria-1@2x.png"/>

              <img style = {style.Simg}  src="https://cdn.animaapp.com/projects/60874d0b3217b66d32be76c7/releases/60874dd2a7ec575273eb3984/img/celular-1@2x.png"/>

                  
              </Grid>

              <br />

              <Grid style={{ alignItems: 'stretch'}}item xs={6}>
              <div style={{ height: '100vh', width: '200%', alignContent: 'flex-start' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyC2aryLzxafprs_7QQBoBnpN6UMxEJYp0o" }}
                  defaultCenter={this.props.center}
                  defaultZoom={this.props.zoom}
                >
                  <AnyReactComponent
                    lat={-23.6271568}
                    lng={-46.645314}
                    text="My Marker"
                  />
                </GoogleMapReact>
              </div>

           </Grid>


           <Grid item xs={12}>
                <h3 style={style.t2}> Cadastrado em: 15/02/2021</h3>
           </Grid>
     

            </Grid>
        
      </Container>
    );
  }
}
