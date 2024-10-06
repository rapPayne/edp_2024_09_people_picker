import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

console.log(process.env?.NODE_ENV);
let repository;
switch (process.env?.NODE_ENV) {
  case "development":
    repository = await import('./repository.js');
    break;
  case "production":
    repository = await import('./repository-ddb.js');
    break;
  default:
    repository = await import('./repository-ddb.js');
}
let { createPerson, deletePerson, getAllPeople, getPerson } = repository;

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection settings
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'peoplePickerDB';
let db;

// Connect to MongoDB
const connectToDatabase = async () => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Read all the people
app.get('/api/people', async (req, res) => {
  try {
    const people = await getAllPeople();
    res.send(people);
  } catch (e) {
    res.status(501).send({ err: e.message });
  }
});

// Read one person by id
app.get('/api/people/:id', async (req, res) => {
  const personId = req.params.id;
  const thePerson = await getPerson(+personId);
  res.send(thePerson);
});

// Add a new person
// createPerson({ name: { first: "Starr", last: "Ekdahl" }, cell: "808-555-2234" });

// Update a person
// updatePersonCell(12, "(212) 867-5309" );

// Delete a person
app.delete('/api/people/:id', async (req, res) => {
  const personId = req.params.id;
  try {
    await deletePerson(+personId);
    console.log(`person ${personId} was deleted.`);
    res.send(`person ${personId} was deleted.`);
  } catch (ex) {
    res.status(500).send(`Error deleting person ${personId}`);
  }
});

// API endpoint to get people data from MongoDB
app.get('/api/people/mongodb', async (req, res) => {
  try {
    const people = await db.collection('people').find({}).toArray();
    res.json(people);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.use('/assets', express.static('assets'));
app.use(express.static('client'));

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  connectToDatabase();
});
