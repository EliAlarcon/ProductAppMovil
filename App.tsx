import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StackNavigator } from "./src/presentation/navigation/StackNavigator";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { useColorScheme } from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AuthProvider } from "./src/presentation/providers/AuthProvider";

const App = () => {
  /*Para indicarle a mi aplicativo que se debe adaptar al tema del dispositivo sea light o dark
  Implementamos el hook useColorScheme: para que tome el tema del dispositivo*/
  const colorScheme = useColorScheme();
  const theme = colorScheme == "dark" ? eva.dark : eva.light;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
