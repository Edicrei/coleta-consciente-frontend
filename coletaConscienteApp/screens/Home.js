import React, {Component }from "react";
import {View,Platform,Image,StyleSheet, TouchableOpacity,  PermissionsAndroid, Dimensions,} from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';


import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "react-native-elements/dist/buttons/Button";


class Home extends Component {
  watchId = null;


  constructor(props){
    super(props);


    this.state = {
      loading: false,
      updatesEnabled: false,
      location: {},
      locations:[],
      
    };
  
 
   
   
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
  console.log("longitude: " +global.long)
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

getpoint = async () =>{
    
  

  //console.log(global.token)

  const headers = {
    'Authorization':'Bearer ' + global.token,
   }
   const locations = [];
   await axios.get(`http://134.209.115.59:38708/location`, {headers}) 
   .then(function (response) {
     
   const data =  response.data.name;

   
    
   let wholeArray = Object.keys(data).map(key => data[key]);

      
   const  media = wholeArray;
  console.log(media)
   for (var {id: n, address: p/*, longitude: q*/} of media) {
      

  
   
    locations.push(p)


   
 
   
    
  }

   return global.accesstoken =  0
 

   })
   .catch(function (error) {
     //console.log("erro: " + error);
     return global.accesstoken =  1
   });
 
 

   this.setState({
    locations: locations
  })

  //console.log(this.state.locations)
}

componentDidMount = async ()=>{

  await this.hasLocationPermission();
  await  this.getpoint();
  await this.getLocation();
  

}

componentDidUpdate (){
  this.getpoint();
}
mapMarkers = () => {

  const { navigation } = this.props;
  
  return this.state.locations.map((report) => 
  <Marker
    //key={report.id}
                draggable
                coordinate={{ 
                              latitude:  report.coordinates.latitude, 
                              longitude: report.coordinates.longitude 
                            }}
                onDragEnd={
                  (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                }
                onPress={() => {

                  
    

                  global.latitude = report.coordinates.latitude ;
                  global.longitude =  report.coordinates.longitude;
                  global.location1 = report.location;
                  global.street = 'Rua: ' + report.street +  ' Nº'  + ' ' +  report.number;
                  global.complement = report.complement
              
                 navigation.navigate("Information")
                }}
                image={require('../assets/location.png')}
                title={ report.complement }
                description={'Rua: ' + report.street +  ' Nº'  + ' ' +  report.number}
                style={{backgroundColor: 'red'}}
                title={report.location}
                description={report.comments}
              >
              </Marker >)
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
            latitude: -23.55,
            longitude: -46.63,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          
          
          >

            
  
           
            

           {this.mapMarkers()}
                
           
           </MapView> 


      

   
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