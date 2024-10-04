/* eslint-disable react/prop-types */
import "./Person.css"
import { useProfileImage } from './hooks/useProfileImage';

export const Person = ({ person }) => {
  const { imageSource } = useProfileImage(person?.picture?.large, "/assets/images/people/Placeholder.png")
  return (
    <div id="person-wrapper">
      <div id="card-style"></div>
      <img id="img-style" src={imageSource} />
      <h1 className="person-name">{person?.name?.first} {person?.name?.last}</h1>
      <p id="person-email">{person?.email}</p>
    </div>
  )
}