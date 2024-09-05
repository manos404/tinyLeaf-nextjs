"use server";
import { db } from '@vercel/postgres'; // Εξαγωγή από το @vercel/postgres
import { v4 as uuidv4 } from 'uuid';
import checkAvailability from './checkAvailability';

// Δημιουργία του πίνακα (μόνο αν δεν υπάρχει ήδη)
async function createTableIfNotExists() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS reservations (
      id UUID PRIMARY KEY,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      size INTEGER NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      comments TEXT
    );
  `);
}

// Αποθήκευση κράτησης
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

  // Δημιουργία του πίνακα αν δεν υπάρχει ήδη
  await createTableIfNotExists();

  const [day, month, year] = data.date.split("/");
  const dateObj = new Date(year, month - 1, day);
  const checkDate = await checkAvailability(dateObj);

  // Έλεγχος διαθεσιμότητας
  if (checkDate.includes(data.time)) {
    const id = uuidv4();
    try {
      // Εισαγωγή δεδομένων στη βάση
      const result = await db.query(
        `
          INSERT INTO reservations (id, date, time, size, name, phone, comments)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [id, data.date, data.time, data.size, data.name, data.phone, data.comments]
      );

      // Έλεγχος αν η εισαγωγή ήταν επιτυχής
      if (result.rowCount < 1) {
        throw new Error("Error inserting data");
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  } else {
    console.log("Error: Cannot insert data due to time unavailability");
    throw new Error("Time slot unavailable");
  }
}




