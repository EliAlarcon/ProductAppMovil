//acciones http

import { tesloApi } from "../config/api/tesloApi";
import { Product } from "../domain/entities/product";
import { ProductResponse } from "../infraestructure/interface/product.response";
import { ProductMapper } from "../infraestructure/mappers/product.mappers";

//acción lista productos - paginación
export const getProductsByPage = async (page: number, limit: number = 20): Promise<Product[]> => {
  console.log(page, limit);
  try {
    const { data } = await tesloApi.get<ProductResponse[]>(
      `/products?limit=${limit}&offset=${page * 10}`
    );
    const products = data.map((product) =>ProductMapper.productToEntity(product));
    //console.log(products[0]);
    return products;

  } catch (ex) {
    console.log(ex);
    throw new Error(`Error getting products`);
  }
};
