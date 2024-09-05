import { db } from "@vercel/postgres"; // Εξαγωγή από το @vercel/postgres

// Ανάκτηση των στοιχείων του μενού
export async function getMenuItems() {
  try {
    const result = await db.query("SELECT * FROM menu");
    return result.rows; // Επιστροφή των δεδομένων ως πίνακας
  } catch (error) {
    console.error("Error fetching menu items:", error.message);
    throw error;
  }
}

// Ανάκτηση των στοιχείων του ειδικού μενού
export async function getSpecialMenuItems() {
  try {
    const result = await db.query("SELECT * FROM specialMenu");
    return result.rows; // Επιστροφή των δεδομένων ως πίνακας
  } catch (error) {
    console.error("Error fetching special menu items:", error.message);
    throw error;
  }
}
 