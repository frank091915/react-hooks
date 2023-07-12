// useEffect: persistent state
// 💯 custom hook
// http://localhost:3000/isolated/final/02.extra-3.js

import * as React from 'react'

// function useLocalStorageState(key, defaultValue = '') {
//   const [state, setState] = React.useState(
//     () => window.localStorage.getItem(key) ?? defaultValue,
//   )

//   React.useEffect(() => {
//     window.localStorage.setItem(key, state)
//   }, [key, state])

//   return [state, setState]
// }

// First abstract reusable part of code
function useLocalStorageState(key, initialValue) {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) ?? initialValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [state, key])
  return [state, setState]
}

function Greeting({initialName = ''}) {
  // const [name, setName] = useLocalStorageState('name', initialName)
  const [name, setName] = useLocalStorageState('userName', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello dude {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
