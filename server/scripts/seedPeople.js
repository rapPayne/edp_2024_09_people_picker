import { MongoClient } from 'mongodb';
import peopleData from '../people.json'; 

const peopleData = require('../people.json');

const { MongoClient } = require('mongodb');
const peopleData = require('../people.json'); // Ensure this path is correct

const url = 'mongodb://localhost:27017';
const dbName = 'peoplePickerDB';

async function seedDatabase() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Clear existing data
    await db.collection('people').deleteMany({});

    // Insert JSON data into MongoDB
    await db.collection('people').insertMany(peopleData);

    console.log('Data successfully seeded');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await client.close();
  }
}

seedDatabase();



