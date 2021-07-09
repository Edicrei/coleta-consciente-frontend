import React, { Component } from "react";
import { Button, View,Platform,Image, Text, FlatList,StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, SafeAreaView, Dimensions} from "react-native";
import Geolocation from 'react-native-geolocation-service';
// Import Map and Marker
import MapView, {Marker} from 'react-native-maps';

import firestore from '@react-native-firebase/firestore';

import firebase from '@react-native-firebase/app';

import { GeoFirestore } from 'geofirestore'

import SplashScreen from 'react-native-splash-screen'

import axios from 'axios'

const radius = 200;


class Home extends Component {
  watchId = null;


  constructor(props){
    super(props);

    const lat = global.lat;
    const long = global.long


   /* const firestore = firebase.firestore();
    const geofirestore = new GeoFirestore(firestore);
    const geocollection = geofirestore.collection('ColectPoints');*/

    


    
    this.ref = firestore().collection('ColectPoints'); 
   /*this.ref = geocollection.limit(50).near({
      center: new firebase.firestore.GeoPoint(/*lat, long*//*-23.525365,-46.57867),
      radius: radius
    });*/
    this.unsubscribe = null;
    this.state = {
      loading: false,
      updatesEnabled: false,
      location: {},
      data:[]
    };
  }
 
  fetchData= async()=>{
    const response = await fetch('http://192.168.15.12:1348/colect/');
    const users = await response.json();
    this.setState({data: users});

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
    //const { navigation } = this.props;
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({ location: position, loading: false });
          global.lat = position.coords.latitude;
          global.long =position.coords.longitude;
          console.log(global.long)
        },
        (error) => {
          this.setState({ location: error, loading: false });
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000, distanceFilter: 5 }
      );
    });
    //navigation.navigate("Information")
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

componentDidMount(){

  this.hasLocationPermission();

  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

  this.fetchData();
  SplashScreen.hide();
//this.getLocation();
}

onCollectionUpdate = (querySnapshot) => {
  const data = [];
  querySnapshot.forEach((doc) => {
    const { coordinate, email, location, material, name, phone} = doc.data();
    data.push({
      key: doc.id,
      doc, // DocumentSnapshot
      coordinate, 
      email, 
      location, 
      material, 
      name, 
      phone
    });
  });
  this.setState({
    data,
    isLoading: false,
 });
}


getaddress =()=>{
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address:"Avenida Marechal Castelo Branco",
      key:'AIzaSyBK6iLYuIRCxJY2dXHISyA4yXQw9WrC5wo'//usar  isso aqui 
    }
  })
  .then(function(response){
    // Log full response
    console.log(response);
  })
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

    <View>

    <MapView style={styles.map}
          
          initialRegion={{
            latitude: -23.525365,
            longitude: -46.57867,
            latitudeDelta: 0.922,
            longitudeDelta: 0.0421,
          }}
          
          
          >

            
          
            <Marker
                draggable
                coordinate={{
                  latitude:-23.525365,
                  longitude: -46.57867,
                }}
                onDragEnd={
                  (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                }
                onPress={() => {

                  const { navigation } = this.props;
    

                  global.lat = -23.525365;
                  global.long =  -46.57867

                  navigation.navigate("Information")
                }}
                image={require('../assets/location.png')}
                title={'Test Marker'}
                description={'This is a description of the marker'}
                style={{backgroundColor: 'red'}}
              />
    

               <Marker
                draggable
                coordinate={{
                  latitude:-23.4369791,
                  longitude: -46.7216082,
                }}
                onPress={() => {
                  const { navigation } = this.props;
    

                  global.lat = -23.4369791;
                  global.long =  -46.7216082;

                  navigation.navigate("Information")
                }}
                onDragEnd={
                  (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                }
                image={require('../assets/location.png')}
                title={'Test Marker'}
                description={'This is a description of the marker'}
                style={{backgroundColor: 'red'}}
              />
                


                <Marker
                draggable
                coordinate={{
                  latitude:-23.5508909,
                  longitude: -46.5295268,
                }}
                onPress={() => {
                  const { navigation } = this.props;
    

                  global.lat = -23.5508909;
                  global.long =  -46.5295268

                  navigation.navigate("Information")
                }}
                onDragEnd={
                  (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                }
                image={require('../assets/location.png')}
                title={'Test Marker'}
                description={'This is a description of the marker'}
                style={{backgroundColor: 'red'}}
              />
                

                <Marker
                draggable
                coordinate={{
                  latitude:-23.5390714,
                  longitude: -46.7214461,
                }}
                onPress={() => {
                  const { navigation } = this.props;
    

                  global.lat = -23.5390714;
                  global.long =  -46.7214461

                  navigation.navigate("Information")
                }}
                onDragEnd={
                  (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                }
                image={require('../assets/location.png')}
                title={'Test Marker'}
                description={'This is a description of the marker'}
                style={{backgroundColor: 'red'}}
              />
              
                
           
           </MapView> 
     {/*<FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <View>
                  <Text> {item.location} </Text>
                  <Text> {item.name} </Text>
                  <Text> {item.email} </Text>
                  <Text> {item.coordinate.latitude} </Text>
                  <Text> {item.coordinate.longitude} </Text>       

                </View>
              )}
              /> */}


      

   
     </View>
     
    </View>
  );
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Dimensions.get('window').height / 2 - 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
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
   marginTop: 75, 
   justifyContent: 'center'
 },
 T3:{
  fontWeight: 'bold',
  fontSize: 34, 
  alignSelf: 'flex-start',
 // marginTop: 150, 
  color: '#1DA64B',
  marginLeft: 25, 
  justifyContent: 'center'
 },
 T4:{
  fontWeight: 'bold',
  fontSize: 28, 
 // marginTop: 150, 
  color: '#0E1973', 
  justifyContent: 'center'
 },
 button:{
 alignSelf: 'flex-start', 
 marginLeft: 25,
 marginTop: 20 ,
 borderRadius: 20,
 width: 160,
 backgroundColor:"#742699"
 }
 
  
});

export default Home;