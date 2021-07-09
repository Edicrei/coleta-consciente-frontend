import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import DrawerNavigator from "./navigation/DrawerNavigator";

console.disableYellowBox = true;

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;