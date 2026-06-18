const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'aslab_db',
});

// Fungsi untuk melakukan query database
const query = (text, params) => pool.query(text, params);

// Inisialisasi tabel secara otomatis saat aplikasi dijalankan
const initDatabase = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await query(createTableQuery);
    console.log('Database and "todos" table initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
  }
};

module.exports = {
  query,
  initDatabase,
};
