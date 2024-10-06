import { MongoClient } from 'mongodb'; //importing to be able to connect to the mongo driver
import peopleData from '../people.json'; //importing the people data from our json file to be seeded to the mongodb

const peopleData = require('../people.json');

const { MongoClient } = require('mongodb');
const peopleData = require('../people.json'); 

const url = 'mongodb://localhost:27017'; //defining the mongodb url at its local host
const dbName = 'peoplePickerDB'; //setting the dbName we will use is peoplePickerDB


// creating a function called seedDatabase that will push data from the json file to our new database. 
//It also clears exisiting data if it already exists in the poeple data and inserts the new data. 
async function seedDatabase() {
  const client = new MongoClient(url); //new instance to connect

  //
  try {
    await client.connect(); //attempting to connect to the server
    console.log('Connected to MongoDB'); //confirmation of connection
    const db = client.db(dbName); //assigning the db as the name db Name

    // Clear existing data
    await db.collection('people').deleteMany({}); //clears any already exisiting data

    // Insert JSON data into MongoDB
    await db.collection('people').insertMany(peopleData); //inserts the new data

   //messages to confirm or deny success.  
    console.log('Data successfully seeded');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await client.close();
  }
}

seedDatabase(); //calling the function



