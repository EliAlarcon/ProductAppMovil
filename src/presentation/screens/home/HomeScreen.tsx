import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { getProductsByPage } from "../../../actions/get-products-by-page";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { MainLayout } from "../../layouts/MainLayout";
import { LoadingScreen } from "../loading/LoadingScreen";
import { ProductList } from "../../components/products/ProductList";

export const HomeScreen = () => {
  //Llamar la acción para lista de productos
  //getProductsByPage(0);

  //TankStack Query: taer la lista de productos - API
  /*const { isLoading, data: products = [] } = useQuery({
    queryKey: ["products", "infinito"],
    staleTime: 1000 * 60 * 60, //Se va a ir actualizando cada hora
    queryFn: () => getProductsByPage(0),
  });*/

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products", "infinito"],
    staleTime: 1000 * 60 * 60, //Se va a ir actualizando cada hora
    initialPageParam: 0,
    queryFn: async (params) => {
      console.log(params);
      return await getProductsByPage(params.pageParam);
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  //Acceder a las propiedades del Store
  const { logout } = useAuthStore();

  return (
    <Layout>
      <MainLayout
        title="TesloShop - Products"
        subtitle="Aplicación Administrativa"
      >
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <ProductList
            products={data?.pages.flat() ?? []}
            fetchNextPage={fetchNextPage}
          />
        )}
      </MainLayout>
    </Layout>
  );
};
