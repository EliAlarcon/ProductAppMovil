import { useNavigation } from "@react-navigation/native";
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyIcon } from "../components/ui/MyIcon";

//Interfaz propiedades MainLayout
interface Props {
  title: string;
  subtitle: string;
  rightAction?: () => void;
  rightActionIcon?: string;

  //Componente hijo
  children: React.ReactNode; //JSX ELEMENTO REACT
}
export const MainLayout = ({
  title,
  subtitle,
  rightAction,
  rightActionIcon,
  children,
}: Props) => {
  //Tomar las propiedades del Safe Area
  const { top } = useSafeAreaInsets();

  //Hook navegación
  const { canGoBack, goBack } = useNavigation();

  //Definir la acción de regreso a los screen
  const renderBackAction = () => (
    <TopNavigationAction
      icon={<MyIcon name="arrow-back-outline" />}
      onPress={goBack}
    />
  );

  //Definir la acción para icono derecha
  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) return null;
    return (
      <TopNavigationAction
        icon={<MyIcon name={rightActionIcon} />}
        onPress={rightAction}
      />
    );
  };

  return (
    <Layout style={{ paddingTop: top }}>
      <TopNavigation
        title={title}
        subtitle={subtitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
      <Layout style={{ height: "100%" }}>{children}</Layout>
    </Layout>
  );
};
