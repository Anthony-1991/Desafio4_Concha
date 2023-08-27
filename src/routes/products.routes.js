import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";

const prodRouter = Router();
const productManager = new ProductManager();

prodRouter.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.status(200).send(products);
});

prodRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const products = await productManager.getProdById(parseInt(id));

  if (products) {
    res.status(200).send(products);
  } else {
    res.status(404).send(`Producto con el id: ${id} no se ha encontrado`);
  }
});

prodRouter.post("/", async (req, res) => {
  const validate = await productManager.addProduct(req.body);

  if (validate) {
    res.status(200).send("Producto creado correctamente");
    return;
  } else {
    res.status(400).send("Error en crear producto");
  }
});

prodRouter.delete("/:id", async (req, res) => {
  const validate = await productManager.deleteProduct(parseInt(req.params.id));

  if (validate) {
    res.status(200).send("Producto eliminado correctamente");
  } else {
    res.status(400).send("Error al eliminar producto");
  }
});

prodRouter.put("/:id", async (req, res) => {
  const validate = await productManager.updateProduct(
    parseInt(req.params.id),
    req.body
  );

  if (validate) {
    res.status(200).send("Producto actualizado correctamente");
  } else {
    res.status(400).send("Error en actualizacion del producto");
  }
});
export default prodRouter;
