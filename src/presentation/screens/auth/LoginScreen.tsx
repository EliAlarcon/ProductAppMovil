import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Alert, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../theme/styles";
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { API_URL, API_URL_ANDROID, STAGE } from "@env";
import { useAuthStore } from "../../store/auth/useAuthStore";

//Interfaz formulario inicio de sesión
interface FormLogin {
  email: string;
  password: string;
}

//Navegación typescript
//StackScreenProps tiene todos los Props de navegación
interface Props extends StackScreenProps<RootStackParamList, "LoginScreen"> {}

export const LoginScreen = ({ navigation }: Props) => {
  //Hook dimensión: toma la dimensión del dispositivo
  const { height } = useWindowDimensions();

  //console.log(API_URL, STAGE, API_URL_ANDROID);

  //Hook para manipular el formulario de inicio de sesisión
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: "",
    password: "",
  });

  //Hook ejecutar acción Login
  const { login } = useAuthStore();

  //Hook useState para verificar si se hizo un posting
  const [isPosting, setIsPosting] = useState<boolean>(false);

  //Función para cambiar los valores del formulario
  const handleSetValues = (key: string, value: string): void => {
    setFormLogin({ ...formLogin, [key]: value });
  };
  //Función acción inicio de sesión
  const handleOnLogin = async () => {
    //console.log(formLogin);
    setIsPosting(true);
    if (!formLogin.email || !formLogin.password) {
      return;
    }

    //Disparamos la acción del inicio de sesión
    const wasSuccessful = await login(formLogin.email, formLogin.password);

    //Se inicio sesión exitosamente
    if (wasSuccessful) return;
    setIsPosting(false);

    //No se inicio sesión
    Alert.alert("Error, usuario o contraseña incorrectos");
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingresa para continuar</Text>
        </Layout>
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Correo electrónico"
            accessoryLeft={<MyIcon name="email-outline" />}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formLogin.email}
            onChangeText={(value) => {
              handleSetValues("email", value);
            }}
            style={{ marginBottom: 20 }}
          />
          <Input
            placeholder="Contraseña"
            accessoryLeft={<MyIcon name="unlock-outline" />}
            autoCapitalize="none"
            secureTextEntry
            value={formLogin.password}
            onChangeText={(value) => {
              handleSetValues("password", value);
            }}
            style={{ marginBottom: 20 }}
          />
        </Layout>
        <Layout style={{ marginTop: 10 }}>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" />}
            onPress={() => {
              handleOnLogin();
            }}
            disabled={isPosting}
          >
            Ingresar
          </Button>
        </Layout>
        <Layout style={styles.textRedirection}>
          <Text>No tienes una cuenta?</Text>
          <Text
            status="primary"
            category="s2"
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            {" "}
            Crea una
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
