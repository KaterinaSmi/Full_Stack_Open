import React from 'react'

const Display = ({persons}) =>{

    return(
        <ul>
        {persons.map((person,index) => ( <div key={index}>  {person.name} {person.number}</div>))}
      </ul>
    )
}
export default Display