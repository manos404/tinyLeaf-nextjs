"use server";
import sql from "better-sqlite3";
import checkAvailability from "./checkAvailability";
const { v4: uuidv4 } = require("uuid");

const db = sql("reservations.db");

// function isInvalidText(text) {
//   return !text || text.trim() === "";
// }

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
  // console.log("save");
  // console.log(data.date);

  // await new Promise((resolve) => {
  //   setTimeout(resolve, 3000);
  // });
  // console.log(data);

  // const data = {
  //   date: formData.get("date"),
  //   time: formData.get("time"),
  //   size: formData.get("size"),
  //   name: formData.get("name"),
  //   phone: formData.get("phone"),
  //   comments: formData.get("comments"),
  // };

  // console.log("reservationsave");
  // console.log(data);

  const id = uuidv4();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS reservations (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        size INTEGER NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        comments TEXT
    )
`
  ).run();

  const [day, month, year] = data.date.split("/");
  const dateObj = new Date(year, month - 1, day);
  const checkDate = await checkAvailability(dateObj);

  if (checkDate.includes(data.time)) {
    const result = db
      .prepare(
        `
          INSERT INTO reservations (id,date,time,size,name,phone,comments) VALUES (
              @id,
              @date,
              @time,
              @size,
              @name,
              @phone,
              @comments
          )
      `
      )
      .run({ id, ...data });
    // console.log(result);
    if (result.changes < 0) {
      throw new Error("errror");
    } else {
      return true;
    }
  } else {
    console.log("error cant inserst data");
    throw new Error("errror");
  }
}
