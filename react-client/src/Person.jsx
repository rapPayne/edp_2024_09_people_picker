/* eslint-disable react/prop-types */
import "./Person.css"

export const Person = ({ person }) => {
  return (
    <div id="person-wrapper">
      <div id="card-style"></div>
      <img id="img-style" src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" />
      <h1 className="person-name">{person?.name?.first} {person?.name?.last}</h1>
      <p id="person-email">{person?.email}</p>
    </div>
  )
}



/* font smaller, size image, shadow, no border, width 300px */