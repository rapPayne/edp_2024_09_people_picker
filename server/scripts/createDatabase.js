import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'peoplePickerDB';

// Create the database
async function createDatabase() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Create the collection if it doesn't exist
    const collection = db.collection('people');

    console.log('Database and collection created');
  } catch (err) {
    console.error('Failed to create database', err);
  } finally {
    await client.close();
  }
}

createDatabase();
