/* eslint-disable react/prop-types */


export const Person = ({ person }) => {
  return (
    <div style={wrapperStyle}>
      <h1>{person?.name?.first} {person?.name?.last}</h1>
      {/* <img style={imgStyle} src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F180867%2Fprofile-circle&psig=AOvVaw3D0N8CGmCF_IRXT2bGOpzB&ust=1727378912187000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiimqDq3ogDFQAAAAAdAAAAABAE" /> */}
      <p>{person?.email}</p>
    </div>
  )
}

const wrapperStyle = {
  boxShadow: "5px 5px 10px var(--dark1)",
  flexBasis: "300px",
  flexShrink: 1,
  flexGrow: 1,
  backgroundColor: "var(--lite2)",
};

const imgStyle = {
  width: "250px",
  height: "250px",
};

/* font smaller, size image, shadow, no border, width 300px */