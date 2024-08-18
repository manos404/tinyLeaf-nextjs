const sql = require("better-sqlite3");
const db = sql("slots.db");
const { v4: uuidv4 } = require("uuid");

db.prepare(`
    CREATE TABLE IF NOT EXISTS tables2 (
      date TEXT NOT NULL PRIMARY KEY,
      "11:00" INTEGER CHECK("11:00" BETWEEN 0 AND 10) NOT NULL, 
      "11:30" INTEGER CHECK("11:30" BETWEEN 0 AND 10) NOT NULL, 
      "12:00" INTEGER CHECK("12:00" BETWEEN 0 AND 10) NOT NULL, 
      "12:30" INTEGER CHECK("12:30" BETWEEN 0 AND 10) NOT NULL, 
      "13:00" INTEGER CHECK("13:00" BETWEEN 0 AND 10) NOT NULL, 
      "13:30" INTEGER CHECK("13:30" BETWEEN 0 AND 10) NOT NULL, 
      "14:00" INTEGER CHECK("14:00" BETWEEN 0 AND 10) NOT NULL, 
      "14:30" INTEGER CHECK("14:30" BETWEEN 0 AND 10) NOT NULL, 
      "15:00" INTEGER CHECK("15:00" BETWEEN 0 AND 10) NOT NULL, 
      "15:30" INTEGER CHECK("15:30" BETWEEN 0 AND 10) NOT NULL, 
      "16:00" INTEGER CHECK("16:00" BETWEEN 0 AND 10) NOT NULL, 
      "16:30" INTEGER CHECK("16:30" BETWEEN 0 AND 10) NOT NULL, 
      "17:00" INTEGER CHECK("17:00" BETWEEN 0 AND 10) NOT NULL, 
      "17:30" INTEGER CHECK("17:30" BETWEEN 0 AND 10) NOT NULL, 
      "18:00" INTEGER CHECK("18:00" BETWEEN 0 AND 10) NOT NULL, 
      "18:30" INTEGER CHECK("18:30" BETWEEN 0 AND 10) NOT NULL, 
      "19:00" INTEGER CHECK("19:00" BETWEEN 0 AND 10) NOT NULL, 
      "19:30" INTEGER CHECK("19:30" BETWEEN 0 AND 10) NOT NULL, 
      "20:00" INTEGER CHECK("20:00" BETWEEN 0 AND 10) NOT NULL, 
      "20:30" INTEGER CHECK("20:30" BETWEEN 0 AND 10) NOT NULL, 
      "21:00" INTEGER CHECK("21:00" BETWEEN 0 AND 10) NOT NULL
    )
  `).run();



db.prepare(`
    INSERT INTO tables2 (date, "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00") 
    VALUES ('2024-08-08', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10)
  `).run();


// db.prepare(`
//     UPDATE tables2 (date, "11:00", "11:30") VALUES (
//       '2024-08-08', 10, 5
//     )
//   `).run();

// db.prepare(`
//     UPDATE tables2
//     SET "11:00" = ?
//     WHERE date = ?
//   `).run(5, '2024-08-08');


// const updateResult = db.prepare(`
//     UPDATE tables2
//     SET "11:00" = CASE
//       WHEN "11:00" = 0 THEN "11:00" + 1
//       ELSE "11:00"
//     END
//     WHERE date = ?
//   `).run('2024-08-08');
  