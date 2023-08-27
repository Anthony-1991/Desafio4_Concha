import { Router } from "express";
import CartManager from "../classes/CartManager.js";

const cartRouter = Router();

const cartManager = new CartManager();

// Crear carrito
cartRouter.post("/", async (req, res) => {
  const validate = await cartManager.createCart();

  if (validate) {
    res.status(200).send("Carrito creado con éxito");
  } else {
    res.status(400).send("Error al crear carrito");
  }
});

// Eliminar carrito
cartRouter.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const validate = await cartManager.deleteCart(parseInt(cid));

  if (validate) {
    res.status(200).send(`Carrito eliminado correctamente`);
  } else {
    res.status(400).send(`Error al eliminar el carrito`);
  }
});

// Solicitar Id Cartrito
cartRouter.get("/:cid", async (req, res) => {
  const cid = req.params.id;
  const cart = await cartManager.getCartById(parseInt(cid));

  if (cart) {
    res.status(200).send(cart);
  } else {
    res
      .status(404)
      .send("El carrito con el id: " + cid + " no se ha encontrado");
  }
});

// Agregar productos al carrito
cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const success = await cartManager.addProductToCart(
    parseInt(cid),
    parseInt(pid),
    quantity
  );

  if (!success) {
    res.status(404).send("Carrito no creado");
  } else {
    res
      .status(200)
      .send(`Producto con id: ${pid} agregado al carrito con id: ${cid}`);
  }
});

// Eliminar producto al carrito
cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  const success = await cartManager.removeProductFromCart(
    parseInt(cid),
    parseInt(pid)
  );

  if (!success) {
    return res.status(404).send("No se pudo eliminar el producto del carrito");
  } else {
    res
      .status(200)
      .send(`Producto con id: ${pid} eliminado del carrito con id: ${cid}`);
  }
});

// Actualizar cantidad de un carrito
cartRouter.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const success = await cartManager.updateProductQuantity(
    parseInt(cid),
    parseInt(pid),
    quantity
  );

  if (!success) {
    return res
      .status(404)
      .send("No se pudo actualizar la cantidad del producto en el carrito");
  } else {
    res
      .status(200)
      .send(
        `Cantidad del producto con id: ${pid} en el carrito con id: ${cid} actualizada`
      );
  }
});
export default cartRouter;
