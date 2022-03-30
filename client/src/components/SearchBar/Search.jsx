import React, { useState } from 'react'

function Search() {

    const [search, setSearch] = useState('')


    function handleChange(e) {
        
        setSearch(e.target.value)
        console.log(typeof e.target.value)
    }


  return (
    <div>
        <input type="text"  value={search}  onChange={(e) => handleChange(e)} placeholder='Search by Id or by Type'/>
        
            <button>Search</button>
        

    
    </div>
  )
}

export default Search