import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components/ui/MyIcon';
import { styles } from '../../theme/styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/StackNavigator';

//Navegación typescript
interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'> {};

export const RegisterScreen = ({navigation}: Props) => {
  //Hook dimensión: toma la dimensión del dispositivo
  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">Crear Cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>
        <Layout style={{ marginTop: 20 }}>
        <Input
            placeholder="Nombre Completo"
            accessoryLeft={<MyIcon name="person"/>}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 20 }}
          />
          <Input
            placeholder="Correo electrónico"
            accessoryLeft={<MyIcon name="email-outline"/>}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 20 }}
          />
          <Input
            placeholder="Contraseña"
            accessoryLeft={<MyIcon name="unlock-outline"/>}
            autoCapitalize="none"
            secureTextEntry
            style={{ marginBottom: 20 }}
          />
        </Layout>
        <Layout style={{ marginTop: 10 }}>
          <Button
            accessoryRight={
              <MyIcon name="arrow-forward-outline"/>
            }
            onPress={() => {}}
          >
            Ingresar
          </Button>
        </Layout>
        <Layout style={styles.textRedirection}>
          <Text>Ya tienes una cuenta?</Text>
          <Text status="primary" category="s2" onPress={() => navigation.navigate('LoginScreen')}>
            {" "}
            Ingresa
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
}
