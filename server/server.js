import express from 'express';
import cors from 'cors';
// import { createPerson, deletePerson, getAllPeople, getPerson } from './repository-ddb.js';

console.log(process.env?.NODE_ENV)
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


// Read all the people
app.get('/api/people', async (req, res) => {
  try {
    const people = await getAllPeople();
    res.send(people);
  } catch (e) {
    res.status(501).send({ err: e.message });
  }
})

// Read one person by id
app.get('/api/people/:id', async (req, res) => {
  const personId = req.params.id;
  const thePerson = await getPerson(+personId);
  res.send(thePerson);
})
//console.log(getPerson(5));

// Add a new person
//createPerson({ name: { first: "Starr", last: "Ekdahl" }, cell: "808-555-2234" })

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

app.use(express.static('client'));

app.listen(port, () => console.log(`Server started on port ${port}`));