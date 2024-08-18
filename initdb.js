const sql = require("better-sqlite3");
const db = sql("menu.db");
const { v4: uuidv4 } = require("uuid");

let menuItems = [
  {
    name: "Darjeeling",
    description:
      "A refined and light Black tea from the region the Tibetans call “country of storms” after the thick mist that rests on the plantations",
    price: 4.5,
  },
  {
    name: "Blue Earl Grey",
    description:
      "A delicate blend of blueberry flower and sunflower petals with Earl Grey aromas",
    price: 4.5,
  },
  {
    name: "Organic Mango and Papaya",
    description:
      "A mix of Indian Black tea, Ceylan, Assam and Chinese Green tea, along with dried mango and papaya for a sweet exotic flavour",
    price: 5,
  },
  {
    name: "White Magic",
    description:
      "White tea sprinkled with rose buttons and marigold, with aromas of passion fruit, peach and apricot",
    price: 5,
  },
  {
    name: "Wise Flower",
    description:
      "An unusual blend of rose, Sencha Green tea, dates and gooseberry petals. Refreshing and seasonal.",
    price: 5,
  },
  {
    name: "Night at the Palace",
    description:
      "Earl Grey aromas, kiwi, yellow peach, orange blossom and violet make this one of our most exquisite blends",
    price: 5.5,
  },
];
let specialMenuItems = [
  {
    name: "Sticky Almond",
    description:
      "Organic Sencha Green tea from China, mixed with apple, cinnamon, ginger and vanilla",
    price: 5.5,
  },
  {
    name: "Green Sun",
    description:
      "Blood orange and orange bark make this a fruity and delightfully sour tea",
    price: 5.5,
  },
  {
    name: "Christmas Special ",
    description:
      "Organic Assam Black tea with cinnamon, caradamon and pineapple ",
    price: 6,
  },
];

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS menu (
        id TEXT PRIMARY KEY ,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL
    )
`
).run();

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS specialMenu (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL
    )
`
).run();

// db.prepare(
//   `
//     CREATE TABLE IF NOT EXISTS reservations (
//         id TEXT PRIMARY KEY,
//         date TEXT NOT NULL,
//         time TEXT NOT NULL,
//         size INTEGER NOT NULL,
//         name TEXT NOT NULL,
//         phone TEXT NOT NULL,
//         comments TEXT
//     )
// `
// ).run();
 

function initData() {
  const m = db.prepare(`
        INSERT INTO menu (id,name, description, price) VALUES (
            @id,
            @name,
            @description,
            @price
        )
    `);

  for (const item of menuItems) {
    const id = uuidv4();
    m.run({ id, ...item });
  }
  const sm = db.prepare(`
        INSERT INTO specialMenu (id,name, description, price) VALUES (
            @id,
            @name,
            @description,
            @price
        )
    `);

  for (const item of specialMenuItems) {
    const id = uuidv4();
    sm.run({ id, ...item });
  }
}

initData();
