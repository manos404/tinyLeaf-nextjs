"use server";
const mysql = require("mysql2/promise");
import checkAvailability from "./checkAvailability";

const { v4: uuidv4 } = require("uuid");

const pool = mysql.createPool({
  host: "tinyleaf.cvayiyw0kmm9.eu-north-1.rds.amazonaws.com", // Endpoint της RDS
  user: "admin", // Όνομα χρήστη
  password: "Manos.1993", // Κωδικός πρόσβασης
  database: "tinyLeaf", // Όνομα βάσης δεδομένων
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function saveReservation(formData) {
  console.log(formData);
  const data = {
    date: formData.get("date"),
    time: formData.get("time"),
    size: formData.get("size"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    comments: formData.get("comments"),
  };

  const id = uuidv4();
 
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id VARCHAR(36) PRIMARY KEY,
        date VARCHAR(10) NOT NULL,
        time VARCHAR(10) NOT NULL,
        size INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        comments TEXT
      )
    `);

    // Μετατροπή της ημερομηνίας από 'dd/mm/yyyy' σε μορφή 'yyyy-mm-dd'
    const [day, month, year] = data.date.split("/");
    const dateObj = new Date(`${year}-${month}-${day}`);
     console.log(dateObj);

    const checkDate = await checkAvailability(dateObj);
    // const checkDate = await checkAvailability(dateObj);

    // Έλεγχος αν η επιλεγμένη ώρα είναι διαθέσιμη
    if (checkDate.includes(data.time)) {
      const result = await connection.query(
        `
        INSERT INTO reservations (id, date, time, size, name, phone, comments) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          id,
          data.date,
          data.time,
          data.size,
          data.name,
          data.phone,
          data.comments,
        ]
      );

      // Έλεγχος για την επιτυχία της εισαγωγής
      if (result[0].affectedRows > 0) {
        return true;
      } else {
        throw new Error("Error inserting data");
      }
    } else {
      console.log("Error: Time slot not available");
      throw new Error("Error: Time slot not available");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } finally {
    connection.release();
  }
}
