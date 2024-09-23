let people = [];
const theSection = document.querySelector("#unchosenPeople");
const chosenPersonDiv = document.querySelector("#chosenPerson");
let chosenPerson;
let unchosenPeople = [];
let chosenPeople = [];

window.addEventListener('DOMContentLoaded', () => {

  // const response = await fetch('http://localhost:3001/api/people');
  // people = await response.json();

  fetch('/api/people')
    .then(response => response.json())
    .then(response => unchosenPeople = response)
    .then(() => drawPeople())

  console.log(people);
})

function drawPeople() {
  let html = "";
  for (let person of unchosenPeople) {
    html += `<div>
    <p>${person.name.first} ${person.name.last}</p>
    </div>`
  }
  theSection.innerHTML = html;

  chosenPersonDiv.innerHTML = chosenPerson?.name.first;
}

function chooseRandomPerson() {
  chosenPerson = unchosenPeople[Math.floor(Math.random() * unchosenPeople.length)];
  unchosenPeople = unchosenPeople.filter(p => p !== chosenPerson)
  drawPeople()
}