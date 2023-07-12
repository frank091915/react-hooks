// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// returns a state which can synchronize with localstorage and a setter function
// function useLocalStorageState(
//   key,
//   initialState,
//   {deserilize = JSON.parse, serilize = JSON.stringify} = {},
// ) {
//   const [state, setState] = React.useState(() => {
//     const defaultValue = window.localStorage.getItem(key)
//     if (defaultValue) {
//       try {
//         return deserilize(defaultValue)
//       } catch (error) {
//         window.localStorage.removeItem(key)
//       }
//     } else {
//       // the second argument can be a function or any other type of data
//       return typeof initialState === 'function' ? initialState() : initialState
//     }
//   })
//   const prevKey = React.useRef(key)
//   React.useEffect(() => {
//     if (prevKey !== key) {
//       window.localStorage.removeItem(prevKey.current)
//       prevKey.current = key
//     }
//     window.localStorage.setItem(key, serilize(state))
//   }, [key, state, deserilize, serilize])

//   return [state, setState]
// }

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  const [name, setName] = React.useState('')

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

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
  return <Greeting />
}

export default App
