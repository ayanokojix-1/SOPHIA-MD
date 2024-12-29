const { Pool } = require('pg');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const config = require('../config');

// PostgreSQL (Primary Database)
const pgPoolPrimary = new Pool({
  connectionString: 'postgresql://kojixsophia_owner:W3dBgVl2MctE@ep-young-sky-a50bbx9x.us-east-2.aws.neon.tech/kojixsophia?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

let pgPoolSecondary;
if (config.DATABASE_URL) {
  // Only initialize the secondary PostgreSQL connection if the URL is provided
  pgPoolSecondary = new Pool({
    connectionString: config.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

let mongoClient;
let db;

// MongoDB (Optional)
if (config.MONGODB_URI) {
  try {
    const mongoURI = config.MONGODB_URI;
    mongoClient = new MongoClient(mongoURI);
    db = mongoClient.db('sessions');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

const localStorageDir = './local_storage'; // Directory for local storage

// Ensure the local storage directory exists
if (!fs.existsSync(localStorageDir)) {
  fs.mkdirSync(localStorageDir);
}

// Initialize PostgreSQL tables
async function initializePostgreSQL(pool, label) {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS sessions (
      session_id TEXT PRIMARY KEY,
      base64_creds TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Add created_at column
      );
    `;
    await pool.query(query);
  } catch (error) {
    console.error(`Error initializing ${label} database:`, error);
  }
}

// Check databases on startup
(async () => {
  await initializePostgreSQL(pgPoolPrimary, 'Primary PostgreSQL');

  if (pgPoolSecondary) {
    try {
      // Test secondary database connection
      await pgPoolSecondary.query('SELECT 1');
      await initializePostgreSQL(pgPoolSecondary, 'Secondary PostgreSQL');
    } catch (error) {
      console.error('Failed to connect to Secondary PostgreSQL Database:', error.message);
    }
  }
})();

// Session data retrieval functions
async function getSessionData(sessionId) {
  try {
    const query = 'SELECT base64_creds FROM sessions WHERE session_id = $1';
    const result = await pgPoolPrimary.query(query, [sessionId]);

    if (result.rows.length === 0) {
      const secondaryData = pgPoolSecondary ? await getSessionDataFromSecondaryDB(sessionId) : null;
      if (secondaryData) return secondaryData;

      const mongoData = mongoClient ? await getSessionDataFromMongoDB(sessionId) : null;
      if (mongoData) return mongoData;

      return getSessionDataFromLocal(sessionId);
    }

    return result.rows[0]?.base64_creds || null;
  } catch (error) {
    console.error('Error retrieving session data:', error);
    return null;
  }
}

async function getSessionDataFromSecondaryDB(sessionId) {
  try {
    if (!pgPoolSecondary) {
      return null;
    }
    const query = 'SELECT base64_creds FROM sessions WHERE session_id = $1';
    const result = await pgPoolSecondary.query(query, [sessionId]);
    return result.rows[0]?.base64_creds || null;
  } catch (error) {
    console.error('Error retrieving session data from secondary DB:', error);
    return null;
  }
}

async function getSessionDataFromMongoDB(sessionId) {
  try {
    if (!db) return null;
    const data = await db.collection('sessions').findOne({ session_id: sessionId });
    return data?.base64_creds || null;
  } catch (error) {
    console.error('Error retrieving session data from MongoDB:', error);
    return null;
  }
}

async function getSessionDataFromLocal(sessionId) {
  try {
    const filePath = path.join(localStorageDir, `${sessionId}.json`);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data).base64_creds || null;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving session data from local storage:', error);
    return null;
  }
}

// Store session data functions
async function storeInPostgreSQL(sessionId, base64Creds) {
  try {
    const query = 'INSERT INTO sessions (session_id, base64_creds) VALUES ($1, $2)';
    await pgPoolPrimary.query(query, [sessionId, base64Creds]);
  } catch (error) {
    console.error('Error storing session data in Primary PostgreSQL:', error);
  }
}

async function storeInSecondaryPostgreSQL(sessionId, base64Creds) {
  if (pgPoolSecondary) {
    try {
      const query = 'INSERT INTO sessions (session_id, base64_creds) VALUES ($1, $2)';
      await pgPoolSecondary.query(query, [sessionId, base64Creds]);
    } catch (error) {
      console.error('Error storing session data in Secondary PostgreSQL:', error);
    }
  }
}

async function storeInMongoDB(sessionId, base64Creds) {
  if (!db) return;
  try {
    await db.collection('sessions').insertOne({
      session_id: sessionId,
      base64_creds: base64Creds,
    });
  } catch (error) {
    console.error('Error storing session data in MongoDB:', error);
  }
}

async function storeInLocalStorage(sessionId, base64Creds) {
  const filePath = path.join(localStorageDir, `${sessionId}.json`);
  const data = JSON.stringify({ session_id: sessionId, base64_creds: base64Creds });
  fs.writeFileSync(filePath, data);
}

async function deleteSessionData(sessionId) {
  try {
    const query = 'DELETE FROM sessions WHERE session_id = $1';
    await pgPoolPrimary.query(query, [sessionId]); 
  } catch (error) {
    console.error('Error deleting session data from Primary PostgreSQL:', error);
  }
}

// Add the new moveToSecondaryDatabase function (Completed)
async function moveToSecondaryDatabase(sessionId, base64Creds) {
  if (!pgPoolSecondary) {
    return;
  }

  try {
    // First, insert the session data into the secondary database
    const query = 'INSERT INTO sessions (session_id, base64_creds) VALUES ($1, $2) ON CONFLICT (session_id) DO UPDATE SET base64_creds = EXCLUDED.base64_creds';
    await pgPoolSecondary.query(query, [sessionId, base64Creds]);
  } catch (error) {
    console.error(`Error moving session data to Secondary PostgreSQL for SESSION_ID: ${sessionId}`, error);
  }
}

module.exports = {
  getSessionData,
  moveToSecondaryDatabase,
  storeInMongoDB,
  storeInLocalStorage,
  deleteSessionData,
};
