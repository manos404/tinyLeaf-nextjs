"use server";
import sql from "better-sqlite3";
const db = sql("reservations.db");

import { saveReservation } from "./insertReservation";

// export default async function reservationData(data) {

// //   await new Promise((resolve) => {
// //     setTimeout(resolve, 5000);
// //   });
//   console.log("actions");
//   console.log(data);
//   saveReservation(data);
// }

export default async function getReservations(formattedDate) {
  
  let data = db.prepare(`SELECT * FROM reservations WHERE date = ?`).all(formattedDate);
 
  return data;
}
