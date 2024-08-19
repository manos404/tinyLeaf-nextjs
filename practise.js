const mysql = require("mysql2/promise");
const { v4: uuidv4 } = require("uuid");

// Δημιουργία σύνδεσης με AWS RDS
const pool = mysql.createPool({
  host: "tinyleaf.cvayiyw0kmm9.eu-north-1.rds.amazonaws.com", // Αντικατάστησέ το με το endpoint της RDS
  user: "admin", // Αντικατάστησέ το με το όνομα χρήστη
  password: "Manos.1993", // Αντικατάστησέ το με τον κωδικό πρόσβασης
  database: "tinyLeaf", // Αντικατάστησέ το με το όνομα της βάσης δεδομένων
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Δημιουργία πινάκων
async function createTables() {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS menu (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS specialMenu (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      )
    `);
  } finally {
    connection.release();
  }
}
async function createReservation() {
  const connection = await pool.getConnection();
  try {
    // id TEXT PRIMARY KEY,
    //         date TEXT NOT NULL,
    //         time TEXT NOT NULL,
    //         size INTEGER NOT NULL,
    //         name TEXT NOT NULL,
    //         phone TEXT NOT NULL,
    //         comments TEXT
    await connection.query(`
      CREATE TABLE reservations (
    id VARCHAR(36) PRIMARY KEY,     -- UUID, χρησιμοποιούμε VARCHAR(36) για να αποθηκεύσουμε το UUID
    date DATE NOT NULL,             -- Ημερομηνία, χρησιμοποιούμε τον τύπο DATE
    time TIME NOT NULL,             -- Ώρα, χρησιμοποιούμε τον τύπο TIME
    size INT NOT NULL,              -- Μέγεθος της κράτησης, χρησιμοποιούμε τον τύπο INT
    name VARCHAR(255) NOT NULL,     -- Όνομα, χρησιμοποιούμε τον τύπο VARCHAR(255)
    phone VARCHAR(15) NOT NULL,     -- Τηλέφωνο, χρησιμοποιούμε τον τύπο VARCHAR(15)
    comments TEXT                   -- Σχόλια, χρησιμοποιούμε τον τύπο TEXT για ελεύθερο κείμενο
);
    `);
  } finally {
    connection.release();
  }
}

// Εισαγωγή δεδομένων
async function insertData() {
  const menuItems = [
    {
      name: "Darjeeling",
      description:
        "A refined and light Black tea from the region the Tibetans call 'country of storms' after the thick mist that rests on the plantations",
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

  const specialMenuItems = [
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
      name: "Christmas Special",
      description:
        "Organic Assam Black tea with cinnamon, caradamon and pineapple",
      price: 6,
    },
  ];

  const connection = await pool.getConnection();
  try {
    const insertMenuQuery = `INSERT INTO menu (id, name, description, price) VALUES (?, ?, ?, ?)`;
    const insertSpecialMenuQuery = `INSERT INTO specialMenu (id, name, description, price) VALUES (?, ?, ?, ?)`;

    for (const item of menuItems) {
      await connection.query(insertMenuQuery, [
        uuidv4(),
        item.name,
        item.description,
        item.price,
      ]);
    }

    for (const item of specialMenuItems) {
      await connection.query(insertSpecialMenuQuery, [
        uuidv4(),
        item.name,
        item.description,
        item.price,
      ]);
    }
  } finally {
    connection.release();
  }
}

async function fetchMenuData() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM menu");
    console.log("menu", rows);
  } catch (error) {}
}

// Εκτέλεση
async function setupDatabase() {
  // await createTables();
  // await insertData();
  // await fetchMenuData()
  await createReservation();
  console.log("Database setup complete.");
}

setupDatabase().catch(console.error);
