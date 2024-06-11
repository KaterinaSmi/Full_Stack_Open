import React from 'react'

const Filter = ({filter, handleFilterChange}) =>{
    return(
        <div>Filter names: <input value={filter} onChange={handleFilterChange}/></div>
    )
}
export default Filter