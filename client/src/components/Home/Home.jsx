import React from 'react'


function Home() {
  var info = () =>{
    return fetch(`http://localhost:3001/products`)
                .then(data => data.json());
  } 
  console.log(info());
  return (
    <div>
      </div>
  )
}

export default Home