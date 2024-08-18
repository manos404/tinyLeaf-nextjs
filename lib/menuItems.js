import sql from "better-sqlite3";

const db = sql("menu.db");

export function getMenuItems() {
  let data = db.prepare("SELECT * FROM menu").all();
  // console.log(data);
  return data;
}
export function getSpecialMenuItems() {
  let data = db.prepare("SELECT * FROM specialMenu").all();
  // console.log(data);
  return data;
}
