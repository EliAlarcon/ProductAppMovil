//No es una pantalla es solo un componente
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { PropsWithChildren, useEffect } from "react";
import { RootStackParamList } from "../navigation/StackNavigator";
import { useAuthStore } from "../store/auth/useAuthStore";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { checkStatus, status } = useAuthStore();

  //Hook de navegación
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  //Hook useEffect
  useEffect(() => {
    //Verificar el estado de autenticación del usuario
    checkStatus();
  }, []);

  //Hook que va a trabajar con el estatus
  useEffect(() => {
    if (status != "checking") {
      if (status == "authenticated") {
        //Navegación al Home
        navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
      }
    }
  }, [status]);

  return <>{children}</>;
};
