import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProductScreen } from '../screens/product/ProductScreen';

//type: para definir la lista y parámetros de Screens de navegación

export type RootStackParamList = {
    LoadingScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    HomeScreen: undefined;
    ProductScreen: {productId: string}
}

const Stack = createStackNavigator<RootStackParamList>();

//Efecto de navegación
const fadeAnimation: StackCardStyleInterpolator = ({current}) =>{
  return{
    cardStyle:{
      opacity: current.progress
    }
  }
}

export const StackNavigator =() => {
  return (
    <Stack.Navigator 
    initialRouteName='LoadingScreen'
    screenOptions={{headerShown: false,
      cardStyleInterpolator: fadeAnimation
    }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
}