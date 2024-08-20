"use server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.NEXT_PUBLIC_HOST,
  user: process.env.NEXT_PUBLIC_USER  ,
  password:process.env.NEXT_PUBLIC_PASSWORD,
  database: process.env.NEXT_PUBLIC_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default async function getReservations(formattedDate) {
  const connection = await pool.getConnection();

  try {
    const [
      rows,
    ] = await connection.query(`SELECT * FROM reservations WHERE date = ?`, [
      formattedDate,
    ]);

    return rows;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  } finally {
    connection.release();
  }
}
