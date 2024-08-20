const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
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
