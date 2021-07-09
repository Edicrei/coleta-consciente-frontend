import React from "react";
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from "@react-navigation/stack";

import {fromRight} from 'react-navigation-transitions'
import Home from "../screens/Home";
import Information from "../screens/Information";
import About from "../screens/About";
import Contact from "../screens/Contact";
import End from "../screens/EndScene";
import End1 from "../screens/EndScene1";

const Stack = createStackNavigator();
const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
         /* {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },*/
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
}

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator  initialRouteName="Home"  screenOptions={screenOptionStyle}>
      <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerLeft:()=>{
              return null;
            },
            headerTitle: () =>{
              return null
            },
            header:()=>{
              return null
            },
            gestureEnabled: ()=> true,
            transitionConfig: ()=> fromRight(500),
            ...MyTransition,

          }}
          
          
          />

    <Stack.Screen 
          name="Information" 
          component={Information} 
          options={{
            headerLeft:()=>{
              return null;
            },
            headerTitle: () =>{
              return null
            },
            header:()=>{
              return null
            },

            gestureEnabled: ()=> true,
            transitionConfig: ()=> fromRight(500),
            ...MyTransition,

          }}
          
          />


  
      
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Contact" 
      component={Contact}
      options={{
        headerLeft:()=>{
          return null;
        },
        headerTitle: () =>{
          return null
        },
        header:()=>{
          return null
        },

        gestureEnabled: ()=> true,
        transitionConfig: ()=> fromRight(500),
        ...MyTransition,
        

      }}
      
      
      
      
      />

<Stack.Screen name="End" 
      component={End}
      options={{
        headerLeft:()=>{
          return null;
        },
        headerTitle: () =>{
          return null
        },
        header:()=>{
          return null
        },

        gestureEnabled: ()=> true,
        transitionConfig: ()=> fromRight(500),
        ...MyTransition,

      }}
      
      
      
      
      />
    </Stack.Navigator>
  );
};

const RegisterStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="About" 
       component={About} 
       options={{
        headerLeft:()=>{
          return null;
        },
        headerTitle: () =>{
          return null
        },
        header:()=>{
          return null
        },
        gestureEnabled: ()=> true,
        transitionConfig: ()=> fromRight(500),
        ...MyTransition,

      }}
      
       
       />

<Stack.Screen name="End1" 
      component={End1}
      options={{
        headerLeft:()=>{
          return null;
        },
        headerTitle: () =>{
          return null
        },
        header:()=>{
          return null
        },
        gestureEnabled: ()=> true,
        transitionConfig: ()=> fromRight(500),
        ...MyTransition,

      }}
      
      
      
      
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, ContactStackNavigator, RegisterStackNavigator};