// useEffect: persistent state
// 💯 flexible localStorage hook
// http://localhost:3000/isolated/final/02.extra-4.js

import * as React from 'react'
function useLocalStorageState(
  key,
  defaultValue = '',
  {serilize = JSON.stringify, deserilize = JSON.parse} = {},
  // the = {} fixes the error we would get from destructuring when no argument was passed
  // Check https://jacobparis.com/blog/destructure-arguments for a detailed explanation
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserilize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  // Check the example at src/examples/local-state-key-change.js to visualize a key change
  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serilize(state))
  }, [key, state, serilize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [key, setKey] = React.useState('name4')
  const [name, setName] = useLocalStorageState(key, initialName)

  function handleClick() {
    if (key === 'name4') {
      setKey('firstName4')
    } else if (key === 'firstName4') {
      setKey('Name4')
    } else {
      setKey('name4')
    }
  }

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Change key!
      </button>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello flexible {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
