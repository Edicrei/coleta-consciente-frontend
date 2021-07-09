import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

import { Switch, Route, Link } from "react-router-dom";

const style = {

  L1:{    
    color: '#0E1973',
    alignSelf: 'flex-start', 
    fontSize: 16, 
    fontWeight: 'bold'
    },
    I1:{
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent', 
    borderRightColor: 'transparent'
    },
    B1:{
    borderRadius: 18, 
    color: '#fff', 
    backgroundColor: '#742699', 
    width: 137, 
    height: 36
    }
    

};

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      title: "",
      description: "",
      published: false,

      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  saveTutorial() {
    /*let data = {
      title: this.state.title,
      description: this.state.description,
      published: false
    };

    TutorialDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });*/

      this.props.history.push("/Mensagem");
  }

  newTutorial() {
    this.setState({
      title: "",
      description: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
              <h2>Fale Conosco</h2>


              <h6>Preencha o formulário abaixo com sugestões ou dúvidas.</h6>

              <div className="form-group">
              <label style={style.L1} htmlFor="title">Name:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"

                style={style.I1}
              />
            </div>

            <div className="form-group">
              <label style={style.L1} htmlFor="description">E-mail:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"

                style={style.I1}
              />
            </div>

            <div className="form-group">
              <label  style={style.L1} htmlFor="title">Telefone:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
                style={style.I1}
              />
            </div>

            <div className="form-group">
              <label style={style.L1} htmlFor="description">Mensagem:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
                style={style.I1}
              />
            </div>



            <button onClick={this.saveTutorial} style={style.B1}>
              Enviar
            </button>
          </div>
        )}
      </div>
    );
  }
}
