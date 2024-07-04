// const mysql = require('mysql2');

// // Configura la conexión a la base de datos
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'test'  // Reemplaza con el nombre de tu base de datos
// });

// // Función para obtener los productos y usuarios relacionados
// function getProductsAndUsers(callback) {
//   const query = `
//     SELECT p.name_productos, u.name_usuarios
//     FROM productos p
//     JOIN negocio n ON p.negocioid_productos = n.id_negocio
//     JOIN usuarios u ON n.userid_negocio = u.id_usuarios
//     WHERE p.negocioid_productos = 2;
//   `;
  
//   connection.query(query, (err, results) => {
//     if (err) {
//       callback(err, null);
//       return;
//     }
//     callback(null, results);
//   });
// }

// module.exports = { getProductsAndUsers };
