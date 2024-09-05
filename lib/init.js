const mysql = require('mysql2/promise');

// Σύνδεση με τη βάση δεδομένων
const connection = await mysql.createConnection({
  host: 'sql7.freemysqlhosting.net',
  user: 'sql7727909',
  password: '3yeU9NvNJg',
  database: 'sql7727909',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    // Δημιουργία του πίνακα αν δεν υπάρχει ήδη
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS menu_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(5,2) NOT NULL,
        special BOOLEAN NOT NULL DEFAULT 0
      )
    `;
    await connection.query(createTableQuery);
    console.log('Table created or already exists.');

    // Δεδομένα από το πρώτο array
    const menuItemsData = [
      ["Darjeeling", "A refined and light Black tea from the region the Tibetans call 'country of storms' after the thick mist that rests on the plantations", 4.5, false],
      ["Blue Earl Grey", "A delicate blend of blueberry flower and sunflower petals with Earl Grey aromas", 4.5, false],
      ["Organic Mango and Papaya", "A mix of Indian Black tea, Ceylan, Assam and Chinese Green tea, along with dried mango and papaya for a sweet exotic flavour", 5.0, false],
      ["White Magic", "White tea sprinkled with rose buttons and marigold, with aromas of passion fruit, peach and apricot", 5.0, false],
      ["Wise Flower", "An unusual blend of rose, Sencha Green tea, dates and gooseberry petals. Refreshing and seasonal.", 5.0, false],
      ["Night at the Palace", "Earl Grey aromas, kiwi, yellow peach, orange blossom and violet make this one of our most exquisite blends", 5.5, false]
    ];

    // Δεδομένα από το δεύτερο array
    const specialMenuItemsData = [
      ["Sticky Almond", "Organic Sencha Green tea from China, mixed with apple, cinnamon, ginger and vanilla", 5.5, true],
      ["Green Sun", "Blood orange and orange bark make this a fruity and delightfully sour tea", 5.5, true],
      ["Christmas Special", "Organic Assam Black tea with cinnamon, caradamon and pineapple", 6.0, true]
    ];

    // Συνδυασμός των δύο arrays
    const combinedMenuItemsData = [...menuItemsData, ...specialMenuItemsData];

    // Προετοιμασία της παραμετροποιημένης SQL εντολής
    const insertMenuItemsQuery = `
      INSERT INTO menu_items (name, description, price, special) VALUES (?, ?, ?, ?)
    `;

    // Εκτέλεση της εντολής για κάθε στοιχείο του μενού
    for (const item of combinedMenuItemsData) {
      await connection.query(insertMenuItemsQuery, item);
    }

    console.log('Menu items inserted successfully.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Κλείσιμο της σύνδεσης
    await connection.end();
  }
})();
