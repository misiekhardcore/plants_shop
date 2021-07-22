import data from "./MOCK_DATA.json";
import { Product } from "./models/product.model";

export const importData = async () => {
  await data.forEach(async (product) => {
    await Product.create(product);
  });
};
