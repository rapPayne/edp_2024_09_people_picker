
import fs from 'fs';

const peopleFile = './server/people.json';
let people = JSON.parse(fs.readFileSync(peopleFile))

export function getAllPeople() {
  return people;
}

/**
 * Finds the person pointed to by its id
 * @param {number} id 
 * @returns the found person
 */
export const getPerson = id => people.find(p => p.id === id);

/**
 * Makes and saves a new person to the database.
 * @param {Person} person 
 * @returns Person
 */
export function createPerson(person) {
  const maxId = Math.max(...people.map(p => p.id))
  const newPerson = { id: maxId + 1, ...person, }
  people.unshift(newPerson);
  savePeople();
  return newPerson;
}

/**
 * Removes a person entirely
 * @param {number} id of the person to delete
 */
export function deletePerson(id) {
  people = people.filter(person => person.id !== id)
  savePeople();
}

export function updatePerson(id, person) {
  const thePerson = allPeople.find(p => p.id === id)
  throw "not implemented yet"
}

function savePeople() {
  fs.writeFileSync(peopleFile, JSON.stringify(people));
}