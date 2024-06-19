import React, { useState } from "react";
import { Product } from "../../../domain/entities/product";
import { Layout, List, Text } from "@ui-kitten/components";
import { ProductCard } from "./ProductCard";
import { RefreshControl } from "react-native-gesture-handler";

//Interaz Props
interface Props {
  products: Product[];
  //TODO: Fecth nextPage
  fetchNextPage: () => void;
}

export const ProductList = ({ products, fetchNextPage }: Props) => {
  //Hook para indicar cuando deseo que se cargue el componente
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  //PullRefresh nos pemirte mantener la data actualizada
  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    //Sleep 1 segundo y medio
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id} - ${index}`}
      renderItem={({ item }) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
