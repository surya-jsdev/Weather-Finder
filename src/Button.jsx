import React, { useState } from 'react'

function Button() {
  const [name, setName] = useState("");
  const handleName=(e)=>{
    setName(e.target.value)
  }
  // const handleClick = (e) => console.log(e)
  return (
    <div>
      <input onChange={handleName} value={name} type="text" />
      <p>{name}</p>
      {/* <button onClick={handleClick}>Click Me! 🤩</button> */}
    </div>
  )
}

export default Button