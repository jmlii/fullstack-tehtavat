import React from "react"

const FilterForm = (props) => {
  return (
    <form> 
      <div>
        Filter phonebook
        <input
          value={props.value} 
          onChange={props.onChange}/>
      </div>
    </form>
  )
}

export default FilterForm