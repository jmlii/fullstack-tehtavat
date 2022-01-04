import React from "react"
import PersonItem from "./PersonItem"

const ContactList = ({ personsToShow, removePerson }) => {
  return (
    <div>
      <h2>Contacts</h2>
      <div>
        {personsToShow.map(person => 
          <PersonItem 
            key={person.id} 
            person={person} 
            removePerson={() => removePerson(person.id)}
          />
        )}
      </div>
    </div>
  )
}

export default ContactList
