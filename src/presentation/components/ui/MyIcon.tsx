import { Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { styles } from "../../theme/styles";

//Interfaz props icon
interface Props {
  name: string;
  color?: string;
  isWhite?: boolean;
}
//Componente reutilizable para iconos
export const MyIcon = ({ name, color, isWhite }: Props) => {
  //Hook que me va a permitir reconocer el tema tomado por el aplicativo
  const theme = useTheme();
  //console.log(theme['color-primary-400']);
  //Validación de color
  if (isWhite) {
    color = theme["color-info-100"];
  } else if (!color) { //Si no se asigna un color
    color = theme["text-basic-color"];
  } else {
    color = theme[color];
  }

  return (
    <Layout>
      <Icon style={styles.icon} fill={color} name={name} />
    </Layout>
  );
};
