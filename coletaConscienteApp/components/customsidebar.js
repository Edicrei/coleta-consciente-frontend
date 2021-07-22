// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

class customsidebar extends Component {

    render(){
        const { navigation } = this.props;

        return (

            <SafeAreaView style={{flex: 1}}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.sideMenuProfileIcon}
                />
                
                <View style={styles.bodydrawer}>
                <TouchableOpacity onPress={() => {                  

                    navigation.navigate("Home")
                    }}  style={styles.button}>

                    <Text style={styles.text}>Pontos</Text>

                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.button}
                 onPress={() => {                  

                    navigation.navigate("RegisterPoints")
                    }}>
                <Text style={styles.text}>Cadastrar Pontos</Text>
                    </TouchableOpacity>

                <TouchableOpacity  
                style={styles.button}
                 onPress={() => {                  

                  navigation.navigate("Contact")
                  }}>
                    <Text style={styles.text}>Fale Conosco</Text>
                </TouchableOpacity>
               {global.accesstoken == 1  ? 

                 <View>
                <TouchableOpacity
                style={styles.button}
                 onPress={() => {                  

                  navigation.navigate("Login")
                  }}
                >
                <Text style={styles.text}>Login</Text>
                </TouchableOpacity>


                <TouchableOpacity
                style={styles.button}
                 onPress={() => {                  

                  navigation.navigate("Register")
                  }}
                >
                <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
               </View>
                :

                null  }
                      <TouchableOpacity
                style={styles.button}
                 onPress={() => {  

                  AsyncStorage.setItem('token', '');
                  navigation.navigate("Login")
                  }}
                >
                <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
               
                </View>

          
            </SafeAreaView>
        )

    }

}
/*const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';


  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image *//*}
      <Image
        source={require('../assets/logo.png')}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
       
     
      </DrawerContentScrollView>
  
    </SafeAreaView>
  );
};
*/


const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodydrawer:{
    marginLeft: 40, 
    height: 40, 
    marginTop: 40, 
  },
  button: {
    marginLeft: 40, 
    height: 40, 
    marginTop: 40, 
    color: "#1DA64B"
  },
  text: {color: "#0E1973"}
});

export default customsidebar;