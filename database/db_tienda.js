// db_tienda.js

// Crear colecciones y datos en tienda_Ropa2025
db = db.getSiblingDB('db_ropa');

// ----- COLECCIÓN: usuarios -----

// Insertar un usuario
db.usuarios.insertOne({
  nombre: "Ana Catalina Brenes",
  correo: "ana.brenes@example.com",
  telefono: "8888-1111",
  direccion: "San José, Costa Rica"
});

// Insertar varios usuarios
db.usuarios.insertMany([
  {
    nombre: "Luis Fernando Solís",
    correo: "luis.solis@example.com",
    telefono: "8888-2222",
    direccion: "Cartago, Costa Rica"
  },
  {
    nombre: "María José Vargas",
    correo: "maria.vargas@example.com",
    telefono: "8888-3333",
    direccion: "Heredia, Costa Rica"
  },
  {
    nombre: "Carlos Jiménez",
    correo: "carlos.jimenez@example.com",
    telefono: "8888-4444",
    direccion: "Alajuela, Costa Rica"
  }
]);

// Actualizar usuario
db.usuarios.updateOne(
  { nombre: "Carlos Jiménez" },
  { $set: { telefono: "8999-1234" } }
);

// Eliminar usuario
db.usuarios.deleteOne({ nombre: "Luis Fernando Solís" });


// ----- COLECCIÓN: marcas -----

db.marcas.insertOne({
  nombre: "UrbanStyle",
  pais: "Costa Rica"
});

db.marcas.insertMany([
  { nombre: "EcoModa", pais: "Colombia" },
  { nombre: "FashionWear", pais: "Estados Unidos" },
  { nombre: "TrendyLine", pais: "España" }
]);

db.marcas.updateOne(
  { nombre: "EcoModa" },
  { $set: { pais: "México" } }
);

db.marcas.deleteOne({ nombre: "TrendyLine" });


// ----- COLECCIÓN: prendas -----

db.prendas.insertOne({
  nombre: "Camiseta básica",
  talla: "M",
  color: "Blanca",
  precio: 8500,
  marca: "UrbanStyle"
});

db.prendas.insertMany([
  {
    nombre: "Jeans ajustados",
    talla: "L",
    color: "Azul",
    precio: 14500,
    marca: "FashionWear"
  },
  {
    nombre: "Vestido floreado",
    talla: "S",
    color: "Rojo",
    precio: 18900,
    marca: "EcoModa"
  },
  {
    nombre: "Chaqueta de cuero",
    talla: "M",
    color: "Negra",
    precio: 32000,
    marca: "UrbanStyle"
  }
]);

db.prendas.updateOne(
  { nombre: "Jeans ajustados" },
  { $set: { precio: 13900 } }
);

db.prendas.deleteOne({ nombre: "Vestido floreado" });


// ----- COLECCIÓN: ventas -----

db.ventas.insertOne({
  usuario: "Ana Catalina Brenes",
  fecha: new Date("2025-06-08"),
  prendas: [
    { nombre: "Camiseta básica", cantidad: 2 },
    { nombre: "Jeans ajustados", cantidad: 1 }
  ],
  total: 30500
});

db.ventas.insertMany([
  {
    usuario: "María José Vargas",
    fecha: new Date("2025-06-09"),
    prendas: [
      { nombre: "Chaqueta de cuero", cantidad: 1 }
    ],
    total: 32000
  },
  {
    usuario: "Carlos Jiménez",
    fecha: new Date("2025-06-07"),
    prendas: [
      { nombre: "Camiseta básica", cantidad: 1 },
      { nombre: "Chaqueta de cuero", cantidad: 1 }
    ],
    total: 40500
  }
]);

db.ventas.updateOne(
  { usuario: "Carlos Jiménez" },
  { $set: { total: 39500 } }
);

db.ventas.deleteOne({ usuario: "María José Vargas" });

