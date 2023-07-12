// useEffect: persistent state
// 💯 effect dependencies
// http://localhost:3000/isolated/final/02.extra-2.js

import * as React from 'react'

function Greeting({initialName = '2'}) {
  console.log('render')
  const [name, setName] = React.useState(
    () => window.localStorage.getItem('name2') ?? initialName,
  )

  React.useEffect(() => {
    console.log('useEffect')
    window.localStorage.setItem('name2', name)
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return (
    <>
      <Greeting />
    </>
  )
}

export default App
