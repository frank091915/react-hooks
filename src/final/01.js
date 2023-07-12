// useState: greeting
// http://localhost:3000/isolated/final/01.js

import * as React from 'react'

function Greeting() {
  // when I use useState hook, I tell React to maintain this state and
  // re-render this component whenever I call the setter function to update the state
  const [name, setName] = React.useState('')
  function handleChange(event) {
    const {value} = event.target
    setName(value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
