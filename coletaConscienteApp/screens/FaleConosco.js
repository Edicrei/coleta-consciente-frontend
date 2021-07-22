import React, { Component } from "react";
import {ImageBackground, View,Button, Image, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
//import { CheckBox } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

class About extends Component {

  constructor(){
    super();
     
      this.state = {
        name:'',
        email:'',
        phone:'',
        message: '',
      };
  }
  

componentDidMount (){

  AsyncStorage.getItem('token').then(
    (value) =>
      // AsyncStorage returns a promise
      // Adding a callback to get the value
      //setGetValue(value),

    
      global.token = value
    
    // Setting the value in Text
  );
  

}
  onPostContact = async () =>{

   const { navigation } = this.props;

   await axios.post(`http://134.209.115.59:60343/fale-conosco`, 
  { 
    "name": this.state.name, 
    "phone": this.state.phone,
    "email": this.state.email,
    "message": this.state.message,
  }) 
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  this.setState({
    name:'',
    email:'',
    phone:'',
    message: '',
})

    navigation.navigate("End1")
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  

  render(){
  
    const { navigation } = this.props;
  
    return (
      <View style={{alignItems:'center'}}>
      
            <View style={styles.Vlogo}>
               
                  <Image style={styles.Ilogo} source={require('../assets/logo.png')}/>               

                <View style={styles.Vdrawer}>
                <TouchableOpacity onPress={()=> navigation.openDrawer()}>

                <Image style={styles.Idrawer} source={require('../assets/drawer.png')}/>
                </TouchableOpacity>
                </View>      

        </View>
           
         
         <ImageBackground source={require('../assets/bax.png')} style={styles.image}>
         <View style={styles.Vftalks}>
          <Text style={styles.T3}>Fale Conosco</Text>

          <Text style={styles.T4}>Preencha o formulário abaixo com sugestões ou dúvidas.</Text>

          <View style={styles.Vinput}>
      

          <TextInput
            style={styles.input}
            placeholder={'Nome'}            
            onChangeText={(text) => this.updateTextInput(text, 'name')}
            value={this.state.name}
          />

      

          <TextInput
            style={styles.input}
            placeholder={'E-mail'}            
            onChangeText={(text) => this.updateTextInput(text, 'email')}
          value={this.state.email}
          />


        

        <TextInput
          style={styles.input}
          placeholder={'Telefone'}            
          onChangeText={(text) => this.updateTextInput(text, 'phone')}
         value={this.state.phone}
        />

     

        <TextInput
          style={styles.input}
          placeholder={'Messagem'}            
          onChangeText={(text) => this.updateTextInput(text, 'message')}
          value={this.state.message}
        />

    
                                
          </View>
     
         
     
           
        
          
  
        <View  style={styles.button}>
        <Button
          title="Enviar"
          color="transparent"
          onPress={() => this.onPostContact()}
        />
        </View>
        </View>
         </ImageBackground>
      </View>
    );
  };
  }
  
  const styles = StyleSheet.create({
    Vlogo: {
      alignItems: 'flex-start', 
      backgroundColor: '#FFFDC0', 
      width:'100%',
      height: 50
    },
    Ilogo: {
      width: 50, 
      height: 40, 
      marginTop: 5 
    },
    Vdrawer: {
      marginTop: - 40,  
      
      alignSelf: 'flex-end'
    },
    Idrawer: {
      width: 30, 
      height: 30,
    },
      socialIcon:{
        height: 55,
        width: 55,
        marginTop: 5
      },
      VSocial:{
        flex: 1, 
        flexDirection: 'row',
        marginLeft: 25,
        alignSelf: 'flex-start'
      },
      Cimage:{
        width: 400,
        height: 500,
        marginTop: 10
      },
      Tcongrats: {
        fontWeight: 'bold',
        fontSize: 24,  
        color: '#0E1973'
     },
     T1: {
        fontWeight: 'bold', 
        fontSize: 24, 
        justifyContent: 'center'
     },
     T2: {
       fontWeight: 'normal',
       fontSize: 26, 
       marginTop: 0, 
       justifyContent: 'center'
     },
     T3:{
      fontWeight: 'bold',
      fontSize: 34, 
      alignSelf: 'center',
      marginTop: - 150, 
      color: '#000',
      marginLeft: 25, 
      justifyContent: 'center'
     },
     T4:{
      fontWeight: 'normal',
      fontSize: 18, 
      marginTop: 30, 
      color: '#000', 
      alignSelf: "center",
      justifyContent: 'center'
     },
     button:{
     alignSelf: 'center', 
     //marginLeft: 25,
     marginTop: 30,
     borderRadius: 20,
     width: 160,
     backgroundColor:"#742699"
     },
     input: {
      width: 280,
      height: 40,
      margin: 12,
      marginTop: 0,
      marginLeft: 20,
      borderWidth: 1,
      color: '#fff',
      borderLeftColor: "transparent",
      borderRightColor: 'transparent',
      borderTopColor: 'transparent',
      backgroundColor: '#0e1973'
    },
    input1: {
      width: 280,
      height: 40,
      margin: 12,
      marginTop: - 10,
      marginLeft: 60,
      borderWidth: 1,
      color: '#000',
      borderLeftColor: "transparent",
      borderRightColor: 'transparent',
      borderTopColor: 'transparent',
      backgroundColor: '#0e1973'
    },
    Ti: {
      color: '#0E1973',
      alignSelf: 'flex-start', 
      fontSize: 16, 
      fontWeight: 'bold', 
      marginLeft: 60
    },
    Vinput: {
      marginTop: 40, 
      alignSelf: "center"
    },
    Ti3: {
      color: '#0E1973',
      alignSelf: 'flex-start', 
      fontSize: 20, 
      fontWeight: 'normal', 
      marginTop: - 20,
      marginLeft: 45
    },
    Ti2: {
      color: '#0E1973',
      alignSelf: 'flex-start', 
      fontSize: 16, 
      fontWeight: 'bold', 
      marginLeft: - 30 
    },
     image: {
      //flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      height: '100%',
      width: '100%'
    },
    VCheck: {
      // backgroundColor: '#ECFED5', 
       width: 30, 
       height: 30
       },
       VCheckD: {
         height: 10,
         },
        Vftalks:{
        marginTop: - 30, 
        paddingRight: '10%',
        paddingLeft: '10%',
        paddingTop: '10%',
        paddingBottom: '10%'
      }
          
    
  });

export default About;