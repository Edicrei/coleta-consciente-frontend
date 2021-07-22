import React, { Component } from "react";
import { Alert, ImageBackground, View,Button, Image, Text, StyleSheet, TouchableOpacity, TextInput, Platform, PermissionsAndroid} from "react-native";
//import { CheckBox } from 'react-native-elements'
import CheckBox from 'react-native-check-box'
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from   'axios';

const image = {  };



class Contact extends Component {
  watchId = null;

  constructor(){
    super();
     
      this.state = {
        name:'',
        email:'',
        phone:'',
        material:'',
        number: '',
        complement: '',
        city: '',
        state: '',
        loading: false,
        updatesEnabled: false,
        location: '',
        //isLoading: false,
        coordinate: '',
        isChecked:false,
        isChecked1:false
      };
  }

  componentDidMount(){

    this.hasLocationPermission()

    AsyncStorage.getItem('token').then(
      (value) =>
      
      
        global.token = value
      
    );
  
 
  }

  
  hasLocationPermission = async () => {
    if (Platform.OS === 'ios' ||
        (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }

    return false;
  }

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({ location: position, loading: false });
          global.lat = position.coords.latitude;
          global.long =position.coords.longitude;
          
        },
        (error) => {
          this.setState({ location: error, loading: false });
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000, distanceFilter: 5 }
      );
    });
  }

  getLocationUpdates = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;

    this.setState({ updatesEnabled: true }, () => {
      this.watchId = Geolocation.watchPosition(
        (position) => {
          this.setState({ location: position });
          console.log(position);
        },
        (error) => {
          this.setState({ location: error });
          console.log(error);
        },
        { enableHighAccuracy: true, distanceFilter: 0, interval: 1000, fastestInterval: 1000 }
      );
    });
  }

  removeLocationUpdates = () => {
      if (this.watchId !== null) {
          Geolocation.clearWatch(this.watchId);
          this.setState({ updatesEnabled: false })
      }
  }
  
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  

  onPostLocation = async () =>{

    const { navigation } = this.props;

    //this.getLocation();

    let checked = '';

    if(this.state.isChecked == true && this.state.isChecked1 == false){

      checked = 'PILHA'

    }else if(this.state.isChecked1 == true && this.state.isChecked == false){
     checked = 'BATERIA'
    }else if(this.state.isChecked1 == true && this.state.isChecked == true){
     checked = 'AMBOS'
    } else {
      //checked = 'AMBOS'
      Alert.alert('Selecione um Material ou ambos!!')
    }

    console.log("checked", checked)
  
 
    var url = `http://api.positionstack.com/v1/forward?access_key=3cb6aa9a7fc6bfc568800c150925d41f&query=${this.state.number} ${this.state.location}, ${this.state.city} ${this.state.state}`
    console.log("URL: ", url)
    await axios.get(url) 
    .then(function (response) {
      
    const data = response;

   
    let wholeArray = Object.keys(data).map(key => data[key]);

     const  media = wholeArray[0].data[0]
     
   

      
      global.latitude = media.latitude
      global.longitude = media.longitude
  

 
    })
    .catch(function (error) {
      console.log(error);
    });

    const lat = global.latitude;
    const long =  global.longitude;
    
  //validar token para enviar info se estiver invalido enfiar para tela de login 
  const headers = {
    'Authorization':'Bearer '+ global.token,
   }

   console.log("Header Location", headers)
  await axios.post(`http://134.209.115.59:38708/location`,  
  { 
    "name": this.state.name, 
    "address": {
      "street": this.state.location,
      "number": this.state.number,
      "complement": this.state.complement,
      "coordinates": {
          "latitude": lat,
          "longitude":  long
      }
    },
    "material": checked,
    "isValid": true,
    "userId": 1
  }, { headers }) 
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
    Alert.alert('Faça o login novamente!')

    navigation.navigate("Login")
  });

  this.setState({
        name:'',  
        material:'',
        number: '',
        complement: '',
        city: '',
        state: '',
        location: '',
        coordinate: '',
        isChecked: ''
   })
   
    navigation.navigate("End")
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
          <View style={styles.vregister}>
          <Text style={styles.T3}>Cadastre um Local</Text>

          <Text style={styles.T4}>Preencha o formulário abaixo e cadastre um local.</Text>

          <View style={styles.Vinput}>
          

          <TextInput
            style={styles.input}
            placeholder={'Nome'}            
            onChangeText={(text) => this.updateTextInput(text, 'name')}
            value={this.state.name}
          />        

    

        <TextInput
          style={styles.input}
          placeholder={'Local'}            
          onChangeText={(text) => this.updateTextInput(text, 'location')}
          value={this.state.location}
        />

        <TextInput
          style={styles.input1}
          placeholder={'Complemento'}            
          onChangeText={(text) => this.updateTextInput(text, 'complement')}
          value={this.state.complement}
        />

      <TextInput
                style={styles.input1}
                placeholder={'Cidade'}            
                onChangeText={(text) => this.updateTextInput(text, 'city')}
                value={this.state.city}
              />

        <TextInput
                  style={styles.input1}
                  placeholder={'Estado'}            
                  onChangeText={(text) => this.updateTextInput(text, 'state')}
                  value={this.state.state}
                />
 <TextInput
          style={styles.input1}
          placeholder={'Número'}            
          onChangeText={(text) => this.updateTextInput(text, 'number')}
          value={this.state.number}
        />


       <Text style={styles.Ti}>Material:</Text>
      
      <View style={{alignSelf: 'center'}}>
      <View style={styles.VCheck}>
          <CheckBox
                style={{flex: 1, padding: 10, color: '#000'}}
                onClick={()=>{
                  this.setState({
                      isChecked:!this.state.isChecked
                  })
                }}
                isChecked={this.state.isChecked}
                //leftText={"CheckBox"}
                rightText={"Pilha"}
            />
           
            </View>
            <Text style={styles.Ti3}>Pilha</Text>
            <View style={styles.VCheck}>
            <CheckBox
                style={{flex: 1, padding: 10, color: '#000'}}
                onClick={()=>{
                  this.setState({
                      isChecked1:!this.state.isChecked1
                  })
                }}
                isChecked={this.state.isChecked1}
                //leftText={"CheckBox"}
                rightText={"Pilha"}
            />
           

              </View>
              <Text style={styles.Ti3}> Bateria</Text>
         </View>
                                
          </View>
     
         
     
           
        
          
  
        <View  style={styles.button}>
        <Button
          title="Enviar"
          color="#742699"
          onPress={() => this.onPostLocation()}
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
    fontSize: 28, 
    alignSelf: 'center',
    marginTop: 100, 
    color: '#1DA64B',
    marginLeft: 25, 
    justifyContent: 'center'
   },
   T4:{
    fontWeight: 'normal',
    fontSize: 16, 
    marginTop: 30, 
    color: '#000', 
    alignSelf: "center",
    justifyContent: 'center'
   },
   button:{
   alignSelf: 'center', 
   //marginLeft: 25,
   marginTop: - 30,
   borderRadius: 45,
   width: 180,
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
    marginTop: 0,
    marginLeft: 20,
    borderWidth: 1,
    color: '#fff',
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
    marginTop: - 30, 
    alignSelf: "center",
    paddingRight: '10%',
    paddingLeft: '10%',
    paddingTop: '10%',
    paddingBottom: '10%'
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
   
    vregister: {
      marginTop: - 75,
      paddingRight: '10%',
      paddingLeft: '10%',
      paddingTop: '10%',
      paddingBottom: '10%'
    
    }

  });

export default Contact;