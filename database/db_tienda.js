// db_tienda.js

// Conectarse a la base de datos 'proyecto-uca'
db = db.getSiblingDB('proyecto-uca');

// ---------------------- COLECCIÓN: usuarios ----------------------

// Insertar un usuario
db.usuarios.insertOne({
  nombre: "Valeria Montero",
  correo: "valeria.montero@empresa.com",
  telefono: "7000-1111",
  direccion: "Limón, Costa Rica",
  entidad: "Distribuidora Omega"
});

// Insertar varios usuarios
db.usuarios.insertMany([
  {
    nombre: "Kevin Mora",
    correo: "kevin.mora@empresa.com",
    telefono: "7100-2222",
    direccion: "Puntarenas, Costa Rica",
    entidad: "Fashion Express"
  },
  {
    nombre: "Natalia Rojas",
    correo: "natalia.rojas@empresa.com",
    telefono: "7200-3333",
    direccion: "Guanacaste, Costa Rica",
    entidad: "Comercial Nova"
  },
  {
    nombre: "Daniela Quirós",
    correo: "daniela.quiros@empresa.com",
    telefono: "7300-4444",
    direccion: "Cartago, Costa Rica",
    entidad: "Ropa Latina"
  }
]);

// Actualizar teléfono de un usuario
db.usuarios.updateOne(
  { nombre: "Kevin Mora" },
  { $set: { telefono: "7100-0000" } }
);

// Eliminar un usuario
db.usuarios.deleteOne({ nombre: "Daniela Quirós" });


// ---------------------- COLECCIÓN: marcas ----------------------

// Insertar una marca
db.marcas.insertOne({
  nombre: "UrbanStyle",
  pais: "Costa Rica"
});

// Insertar varias marcas
db.marcas.insertMany([
  { nombre: "EcoModa", pais: "Colombia" },
  { nombre: "FashionWear", pais: "Estados Unidos" },
  { nombre: "TrendyLine", pais: "España" },
  { nombre: "Ropa Latina", pais: "México" }
]);

// Actualizar país de una marca
db.marcas.updateOne(
  { nombre: "EcoModa" },
  { $set: { pais: "Perú" } }
);

// Eliminar una marca
db.marcas.deleteOne({ nombre: "TrendyLine" });


// ---------------------- COLECCIÓN: prendas ----------------------

// Insertar una prenda
db.prendas.insertOne({
  nombre: "Camiseta básica",
  talla: "M",
  color: "Blanco",
  precio: 8500,
  stock: 10,
  marca: "UrbanStyle"
});

// Insertar varias prendas
db.prendas.insertMany([
  {
    nombre: "Jeans ajustados",
    talla: "L",
    color: "Azul",
    precio: 14500,
    stock: 8,
    marca: "FashionWear"
  },
  {
    nombre: "Chaqueta de cuero",
    talla: "M",
    color: "Negro",
    precio: 32000,
    stock: 5,
    marca: "UrbanStyle"
  },
  {
    nombre: "Camiseta estampada",
    talla: "S",
    color: "Gris",
    precio: 7000,
    stock: 12,
    marca: "Ropa Latina"
  }
]);

// Actualizar stock
db.prendas.updateOne(
  { nombre: "Camiseta básica" },
  { $set: { stock: 9 } }
);

// Eliminar prenda
db.prendas.deleteOne({ nombre: "Camiseta estampada" });


// ---------------------- COLECCIÓN: ventas ----------------------

// Insertar una venta
db.ventas.insertOne({
  usuario: "Valeria Montero",
  fecha: new Date("2025-06-08"),
  prendas: [
    { nombre: "Camiseta básica", cantidad: 2 },
    { nombre: "Jeans ajustados", cantidad: 1 }
  ],
  total: 30500
});

// Insertar varias ventas
db.ventas.insertMany([
  {
    usuario: "Kevin Mora",
    fecha: new Date("2025-06-07"),
    prendas: [
      { nombre: "Camiseta básica", cantidad: 1 },
      { nombre: "Chaqueta de cuero", cantidad: 1 }
    ],
    total: 40500
  },
  {
    usuario: "Natalia Rojas",
    fecha: new Date("2025-06-06"),
    prendas: [
      { nombre: "Jeans ajustados", cantidad: 2 }
    ],
    total: 29000
  },
  {
    usuario: "Carlos Jiménez",
    fecha: new Date("2025-06-09"),
    prendas: [
      { nombre: "Chaqueta de cuero", cantidad: 1 }
    ],
    total: 32000
  }
]);

// Actualizar total de una venta
db.ventas.updateOne(
  { usuario: "Kevin Mora" },
  { $set: { total: 39500 } }
);

// Eliminar venta
db.ventas.deleteOne({ usuario: "Carlos Jiménez" });


// ---------------------- CONSULTAS ----------------------

// i. Obtener la cantidad vendida de prendas por fecha específica (2025-06-08)
/* Esta consulta obtiene todas las prendas vendidas el 8 de junio del 2025 */
db.ventas.aggregate([
  { $match: { fecha: new Date("2025-06-08") } },
  { $unwind: "$prendas" },
  { $group: { _id: "$fecha", totalVendidas: { $sum: "$prendas.cantidad" } } }
]);

// ii. Obtener marcas con al menos una venta
/* Esta consulta obtiene todas las marcas que tienen prendas asociadas a una venta */
db.ventas.aggregate([
  { $unwind: "$prendas" },
  {
    $lookup: {
      from: "prendas",
      localField: "prendas.nombre",
      foreignField: "nombre",
      as: "detalle_prenda"
    }
  },
  { $unwind: "$detalle_prenda" },
  { $group: { _id: "$detalle_prenda.marca" } }
]);

// iii. Obtener prendas vendidas y su stock restante
/* Esta consulta obtiene cuántas unidades se vendieron por prenda y el stock restante */
db.ventas.aggregate([
  { $unwind: "$prendas" },
  {
    $group: {
      _id: "$prendas.nombre",
      totalVendidas: { $sum: "$prendas.cantidad" }
    }
  },
  {
    $lookup: {
      from: "prendas",
      localField: "_id",
      foreignField: "nombre",
      as: "prenda_info"
    }
  },
  { $unwind: "$prenda_info" },
  {
    $project: {
      prenda: "$_id",
      totalVendidas: 1,
      stockRestante: "$prenda_info.stock"
    }
  }
]);

// iv. Top 5 marcas más vendidas
/* Esta consulta obtiene las 5 marcas con más ventas totales */
db.ventas.aggregate([
  { $unwind: "$prendas" },
  {
    $lookup: {
      from: "prendas",
      localField: "prendas.nombre",
      foreignField: "nombre",
      as: "info_prenda"
    }
  },
  { $unwind: "$info_prenda" },
  {
    $group: {
      _id: "$info_prenda.marca",
      cantidadVendida: { $sum: "$prendas.cantidad" }
    }
  },
  { $sort: { cantidadVendida: -1 } },
  { $limit: 5 }
]);
