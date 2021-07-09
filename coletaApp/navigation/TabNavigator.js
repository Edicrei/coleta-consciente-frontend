import React from 'react';
import {  StyleSheet, Image} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainStackNavigator, ContactStackNavigator, RegisterStackNavigator } from './StackNavigator'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
     
    
    tabBarOptions= {
      {
       activeTintColor: '#fff',
       inactiveTintColor: 'lightgray',
       activeBackgroundColor: '#3AED76',
       inactiveBackgroundColor: '#FFFDC0',
           style: {
                 backgroundColor: '#FFFDC0',
                 paddingBottom: 3
           }
      }
        
    }

    
    
    >
      <Tab.Screen 
         name="Home" 
         component={MainStackNavigator} 
         options={()=>({
           tabBarIcon:()=>
           <Image  style={styles.sizeIcon}  source={require('../assets/location.png')} />,
           title: ()=>{
            return null
           }
         })}
         
         />
      <Tab.Screen name="Contact" 
      component={ContactStackNavigator} 
      options={()=>({
        tabBarIcon:()=>
        <Image  style={styles.sizeIcon}  source={require('../assets/center.png')} />,
        title: ()=>{
         return null
        }
      })}
      />

   <Tab.Screen name="Register" 
      component={RegisterStackNavigator} 
      options={()=>({
        tabBarIcon:()=>
        <Image  style={styles.sizeIcon} source={require('../assets/conner.png')} />,
        title: ()=>{
         return null
        }
      })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  sizeIcon: {
    width: 35, 
    height: 35 
  },
});

export default BottomTabNavigator