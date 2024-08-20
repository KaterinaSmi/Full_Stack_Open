import React from 'react'
import { Stack, Button, IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';


const Display = ({persons, handleDelete}) =>{
    
    return(
        <ul>
        {persons.map((person,index) => ( <div key={index}>  {person.name} {person.number} <IconButton
      sx={{ color: 'red', marginLeft: '10px' }} 
      onClick={() => handleDelete(person.id)}   
    >{<DeleteIcon/>}</IconButton></div>))}
      </ul>
    )
}
export default Display