const socket = io();
const form = document.getElementById("idForm");
const table = document.querySelector("#prodTable tbody");

socket.on("prodsData", (products) => {
  let tableInfo = "";
  if (products) {
    products.forEach((prod) => {
      tableInfo += `
          <tr>
          <td>${prod.id}</td>
          <td>${prod.title}</td>
          <td>${prod.description}</td>
          <td>${prod.price}</td>
          <td>${prod.thumbnail}</td>
          <td>${prod.code}</td>
          <td>${prod.stock}</td>
          </tr>
          `;
    });
  } else {
    console.error("Error al cargar los productos");
  }
  table.innerHTML = tableInfo;
});

socket.emit("getProducts");
