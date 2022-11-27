export type Category = {
  name: string;
  image: string;
  sku: number;
  description: string;
  price: string;
  id: string;
};

export type CategoriesResponse = Category[];
