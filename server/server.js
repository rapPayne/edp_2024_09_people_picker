import express from 'express';
import { createPerson, getAllPeople, getPerson } from './repository.js';

const app = express();
const port = 3001;

// Read all the people
app.get('/api/people', (req, res) => {
  try {
    const people = getAllPeople();
    res.send(people);
  } catch (e) {
    res.status(501).send({ err: e.message });
  }
})

// Read one person by id
//console.log(getPerson(5));

// Add a new person
//createPerson({ name: { first: "Starr", last: "Ekdahl" }, cell: "808-555-2234" })

// Update a person
// updatePersonCell(12, "(212) 867-5309" );

// Delete a person
// deletePerson(100)

app.use(express.static('client'));

app.listen(port, () => console.log(`Server started on port ${port}`));