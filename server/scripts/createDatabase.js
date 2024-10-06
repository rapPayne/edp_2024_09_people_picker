import { MongoClient } from 'mongodb'; // importing the mongoDb driver to interact with the database

// Connection URL - 
const url = 'mongodb://localhost:27017';
const dbName = 'peoplePickerDB'; // this will be our mongo db database name

// Create the database
// creating a asynchronous function called crateDatabase
async function createDatabase() { 
  const client = new MongoClient(url);
//attempts to connect to the server
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Create the collection if it doesn't exist, this is where the actual data will be in mongodb
    const collection = db.collection('people');

    //messages to notify success or not succes of creation of databse
    console.log('Database and collection created');
  } catch (err) {
    console.error('Failed to create database', err);
  } finally {
    await client.close();
  }
}

createDatabase(); //calls to execute the function
