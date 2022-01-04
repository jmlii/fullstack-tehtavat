import React from "react"

const PersonItem = ({ person, removePerson }) => {
  return (
    <>
      {person.name} {person.number} <button onClick={removePerson}> remove </button>
      <br/>
    </>
  )
}

export default PersonItem