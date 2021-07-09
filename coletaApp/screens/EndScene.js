import React, { Component } from "react";
import { View,  Image, Text, StyleSheet, TouchableOpacity} from "react-native";

class Home extends Component {

render(){

  const { navigation } = this.props;

  return (
    <View style={{alignItems:'center'}}>
          <View style={styles.Vlogo}>
              <TouchableOpacity
              
              onPress={()=> navigation.navigate("Contact")}
              >
                <Image style={styles.BArrow} source={require('../assets/arrowleft.png')}/>   
                </TouchableOpacity>
                  <Image style={styles.Ilogo} source={require('../assets/logo.png')}/>               

                <View style={styles.Vdrawer}>
                <TouchableOpacity onPress={()=> navigation.openDrawer()}>

                <Image style={styles.Idrawer} source={require('../assets/drawer.png')}/>
                </TouchableOpacity>
                </View>      

        </View>

        <Text style={styles.Tcongrats}>OBRIGADO!</Text>
         
        <Image style={styles.Cimage} source={require('../assets/bateria2.png')}/> 
        <Text style={styles.T1}>Você já está contribuindo para um mundo melhor ;)</Text>
        <Text style={styles.T2}>Em breve você receberá um E-mail com os próximos passos.</Text>
        
        <Text style={styles.T3}>Enquanto isso, conheça nosso trabalho nas redes sociais:</Text>


        <View style={styles.VSocial}>
        <Image style={styles.socialIcon} source={require('../assets/social.png')}/>
        </View>

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
    marginTop: - 35,
    marginLeft: 35 
  },
  BArrow: {
    width: 30, 
    height: 30, 
    marginTop: 10, 
    marginLeft: 5
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
    width: 300,
    height: 75,
    marginTop: 5
  },
  VSocial:{
    flex: 1, 
    flexDirection: 'row',
    marginTop: 25
  },
  Cimage:{
    width:300,
    height: 220
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
  fontSize: 28, 
  marginTop: 100, 
  color: '#1DA64B', 
  justifyContent: 'center'
 },
 
  
});

export default Home;