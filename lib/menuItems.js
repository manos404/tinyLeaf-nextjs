const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "tinyleaf.cvayiyw0kmm9.eu-north-1.rds.amazonaws.com", // Endpoint της RDS
  user: "admin", // Όνομα χρήστη
  password: "Manos.1993", // Κωδικός πρόσβασης
  database: "tinyLeaf", // Όνομα βάσης δεδομένων
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function fetchMenuData() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM menu");
    return rows;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    throw error; // Ρίχνουμε ξανά το σφάλμα για να το διαχειριστούμε σε ανώτερο επίπεδο αν χρειάζεται
  } finally {
    if (connection) connection.release(); // Αποδεσμεύουμε τη σύνδεση, αν υπάρχει
  }
}
export async function fetchSpecialMenuData() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM specialMenu");
    return rows;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    throw error; // Ρίχνουμε ξανά το σφάλμα για να το διαχειριστούμε σε ανώτερο επίπεδο αν χρειάζεται
  } finally {
    if (connection) connection.release(); // Αποδεσμεύουμε τη σύνδεση, αν υπάρχει
  }
}

// import sql from "better-sqlite3";

// const db = sql("menu.db");

// export function getMenuItems() {
//   let data = db.prepare("SELECT * FROM menu").all();
//   // console.log(data);
//   return data;
// // }
// export function getSpecialMenuItems() {
//   let data = db.prepare("SELECT * FROM specialMenu").all();
//   // console.log(data);
//   return data;
// }
