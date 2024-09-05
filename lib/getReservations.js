"use server";
import { db } from '@vercel/postgres'; // Εξαγωγή από το @vercel/postgres

// Λήψη κρατήσεων με βάση την ημερομηνία
export default async function getReservations(formattedDate) {
  try {
    // Εκτέλεση του ερωτήματος για την απόκτηση δεδομένων
    const result = await db.query(
      'SELECT * FROM reservations WHERE date = $1',
      [formattedDate]
    );

    // Επιστροφή των δεδομένων
    return result.rows;
  } catch (error) {
    console.error('Error querying reservations:', error);
    throw error; // Επαναρίθμηση του σφάλματος
  }
}
