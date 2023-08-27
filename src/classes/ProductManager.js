import { promises as fs } from "fs";
import { join } from "path";
import { __dirname } from "../path.js";

const PATH = join(__dirname, "data", "products.json");
const jsonReadfile = JSON.parse(await fs.readFile(PATH, "utf-8"));

export default class ProductManager {
  constructor() {
    this.products = [];
  }

  async addProduct(product) {
    const products = jsonReadfile;
    const prodByCode = products.find((prod) => prod.code === product.code);

    if (prodByCode) {
      console.log(`Producto ya existente`);
      return false;
    } else {
      product.id = this.NextId(products);
      products.push(product);
      await fs.writeFile(PATH, JSON.stringify(products));
      return true;
    }
  }

  NextId(products) {
    let nextId = products.reduce((maxId, product) => {
      return product.id > maxId ? product.id : maxId;
    }, 0);
    return nextId + 1;
  }

  async updateProduct(id, product) {
    const products = jsonReadfile;
    const prodIndex = products.findIndex((prod) => prod.id === parseInt(id));

    if (prodIndex !== -1) {
      products[prodIndex].title = product.title;
      products[prodIndex].description = product.description;
      products[prodIndex].price = product.price;
      products[prodIndex].code = product.code;
      products[prodIndex].stock = product.stock;

      await fs.writeFile(PATH, JSON.stringify(products));
      return true;
    } else {
      products.push(product);
      return false;
    }
  }

  async deleteProduct(id) {
    try {
      const products = JSON.parse(await fs.readFile(PATH, "utf-8"));
      const prodById = products.find((prod) => prod.id === id);

      if (prodById) {
        const updatedProducts = products.filter((prod) => prod.id !== id);
        await fs.writeFile(PATH, JSON.stringify(updatedProducts, null, 2));
        console.log(`El producto fue eliminado correctamente`);
        return true;
      } else {
        console.log("Producto no encontrado");
        return false;
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return false;
    }
  }

  async getProducts(limit) {
    const products = jsonReadfile;

    if (limit) {
      return products.slice(0, limit);
    }
    return products;
  }

  async getProdById(id) {
    const products = jsonReadfile;
    const prodById = products.find((prod) => prod.id === parseInt(id));

    return prodById;
  }
}
