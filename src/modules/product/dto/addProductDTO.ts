export type ProductDetail = {
  createdAt: Date;
  name: string;
  image: string;
  categoryName: string;
  categoryId: number;
  sku: number;
  description: string;
  price: string;
  id: string;
};

export type AddProductResponse = ProductDetail;
export type AddProductRequest = Omit<
  ProductDetail,
  'id' | 'categoryName' | 'createdAt'
>;
