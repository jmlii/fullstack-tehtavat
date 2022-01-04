import React from "react"

const AddPersonForm = (props) => {
  return (
    <div>
      <h2>Add a new contact</h2>
      <form onSubmit={props.onSubmitValue}>
        <div>
          Name: 
          <input 
            value={props.nameValue} 
            onChange={props.nameOnChange}
          />
        </div>
        <div>
          Number: 
          <input 
            value={props.numberValue} 
            onChange={props.numberOnChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddPersonForm
