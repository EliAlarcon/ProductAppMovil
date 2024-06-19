import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { getProductsByPage } from "../../../actions/get-products-by-page";
import { useQuery } from "@tanstack/react-query";

export const HomeScreen = () => {
  //Llamar la acción para lista de productos
  //getProductsByPage(0);

  //TankStack Query: taer la lista de productos - API
  const { isLoading, data: products = [] } = useQuery({
    queryKey: ["products", "infinito"],
    staleTime: 1000 * 60 * 60, //Se va a ir actualizando cada hora
    queryFn: ()=> getProductsByPage(0)
  });

  const { logout } = useAuthStore();

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{JSON.stringify(products, null, 2)}</Text>
      <Button accessoryLeft={<Icon name="log-out-outline" />} onPress={logout}>
        Cerrar Sesión
      </Button>
    </Layout>
  );
};
