import { API_URL_BASE } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";
import { ProductResponse } from "../interface/product.response";

//Mapear la data del producto
export class ProductMapper {
  static productToEntity(product: ProductResponse): Product {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      slug: product.slug,
      stock: product.stock,
      sizes: product.sizes,
      gender: product.gender,
      tags: product.tags,
      images: product.images.map(image=>`${API_URL_BASE}/files/product/${image}`)
    };
  }
}
