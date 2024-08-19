"use server";
import mysql from 'mysql2/promise';

// Δημιουργία σύνδεσης με τη βάση δεδομένων MySQL στο AWS RDS

const pool = mysql.createPool({
  host: "tinyleaf.cvayiyw0kmm9.eu-north-1.rds.amazonaws.com", // Endpoint της RDS
  user: "admin", // Όνομα χρήστη
  password: "Manos.1993", // Κωδικός πρόσβασης
  database: "tinyLeaf", // Όνομα βάσης δεδομένων
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default async function getReservations(formattedDate) {
  const connection = await pool.getConnection();
  
  try {
    // Εκτέλεση του ερωτήματος για λήψη δεδομένων με βάση την ημερομηνία
    const [rows] = await connection.query(
      `SELECT * FROM reservations WHERE date = ?`,
      [formattedDate]
    );
    
    return rows;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  } finally {
    // Απελευθέρωση της σύνδεσης
    connection.release();
  }
}













// "use server";
// import sql from "better-sqlite3";
// const db = sql("reservations.db");
 


// export default async function getReservations(formattedDate) {
  
//   let data = db.prepare(`SELECT * FROM reservations WHERE date = ?`).all(formattedDate);
 
//   return data;
// }
