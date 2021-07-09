import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator } from "./StackNavigator";
import { RegisterStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator.js";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
     drawerPosition='right'
     drawerStyle={{backgroundColor: '#3AED76'}}
     drawerContentOptions={{
      activeTintColor: '#FFFDC0',
      //inactiveBackgroundColor: "#3AED76",
      itemStyle: { marginVertical: 30 },
    }}
    
    
    >
      <Drawer.Screen 
         name="Mapa" component={TabNavigator} />
      <Drawer.Screen name="Cadastro" component={ContactStackNavigator} />
      <Drawer.Screen name="Fale Conosco" component={RegisterStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;