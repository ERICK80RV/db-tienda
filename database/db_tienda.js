// db_ropa.js

// Cambiar a base de datos
db = db.getSiblingDB('proyectos-uca');

// ========== COLECCIÓN: usuarios ==========

// Inserción única
db.usuarios.insertOne({
  nombre: "Rebecca Chambers",
  correo: "rebecca.chambers@starselite.com",
  telefono: "7005-8899",
  direccion: "Raccoon City"
});

// Inserción múltiple
db.usuarios.insertMany([
  {
    nombre: "Claire Redfield",
    correo: "claire.redfield@umbrella.com",
    telefono: "7001-1122",
    direccion: "Raccoon City"
  },
  {
    nombre: "Leon S. Kennedy",
    correo: "leon.kennedy@rpd.com",
    telefono: "7002-3344",
    direccion: "Raccoon City"
  },
  {
    nombre: "Jill Valentine",
    correo: "jill.valentine@bsaa.com",
    telefono: "7003-5566",
    direccion: "Raccoon City"
  },
  {
    nombre: "Chris Redfield",
    correo: "chris.redfield@bsaa.com",
    telefono: "7004-7788",
    direccion: "Raccoon City"
  }
]);

// ========== COLECCIÓN: marcas ==========

// Inserción única
db.marcas.insertOne({
  nombre: "Stars Elite",
  pais: "Canadá"
});

// Inserción múltiple
db.marcas.insertMany([
  { nombre: "Umbrella Fashion", pais: "Japón" },
  { nombre: "RPD Gear", pais: "Estados Unidos" },
  { nombre: "BSAA Outfitters", pais: "Reino Unido" },
  { nombre: "Nemesis Wear", pais: "Rusia" }
]);

// ========== COLECCIÓN: prendas ==========

// Inserción única
db.prendas.insertOne({
  nombre: "Gorra Stars Elite",
  talla: "Única",
  color: "Azul Oscuro",
  precio: 9500,
  stock: 20,
  marca: "Stars Elite"
});

// Inserción múltiple
db.prendas.insertMany([
  {
    nombre: "Chaqueta táctica RPD",
    talla: "L",
    color: "Azul",
    precio: 21000,
    stock: 10,
    marca: "RPD Gear"
  },
  {
    nombre: "Parka de campo BSAA",
    talla: "M",
    color: "Verde",
    precio: 26500,
    stock: 8,
    marca: "BSAA Outfitters"
  },
  {
    nombre: "Abrigo Nemesis XL",
    talla: "XL",
    color: "Negro",
    precio: 35000,
    stock: 5,
    marca: "Nemesis Wear"
  },
  {
    nombre: "Uniforme Umbrella clásico",
    talla: "S",
    color: "Rojo",
    precio: 18500,
    stock: 15,
    marca: "Umbrella Fashion"
  }
]);

// ========== COLECCIÓN: ventas ==========

// Inserción única
db.ventas.insertOne({
  usuario: "Rebecca Chambers",
  fecha: new Date("2025-06-05T10:30:00Z"),
  prendas: [
    { nombre: "Gorra Stars Elite", cantidad: 1 }
  ],
  total: 9500
});

// Inserción múltiple
db.ventas.insertMany([
  {
    usuario: "Claire Redfield",
    fecha: new Date("2025-06-10T15:00:00Z"),
    prendas: [
      { nombre: "Uniforme Umbrella clásico", cantidad: 2 },
      { nombre: "Chaqueta táctica RPD", cantidad: 1 }
    ],
    total: 58000
  },
  {
    usuario: "Leon S. Kennedy",
    fecha: new Date("2025-06-11T12:30:00Z"),
    prendas: [
      { nombre: "Parka de campo BSAA", cantidad: 1 }
    ],
    total: 26500
  },
  {
    usuario: "Jill Valentine",
    fecha: new Date("2025-06-12T09:15:00Z"),
    prendas: [
      { nombre: "Abrigo Nemesis XL", cantidad: 1 },
      { nombre: "Chaqueta táctica RPD", cantidad: 1 }
    ],
    total: 56000
  }
]);
