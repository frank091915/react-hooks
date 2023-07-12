// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

function useLocalStorageState (key, initialValue, { deserilize = JSON.parse, serilize = JSON.stringify } = {}){
  let value = window.localStorage.getItem(key)
  const [state, setState] = React.useState(()=>{
    if(value){
      try{
        const localStorageState = deserilize(window.localStorage.getItem(key))
        return localStorageState
      }catch(err){
        window.localStorage.removeItem(key)
      }
    }else{
      const isFunction = typeof initialValue === 'function';
      window.localStorage.setItem(key, serilize(value))
      return isFunction ? initialValue() : initialValue;
    }
  })

  React.useEffect(()=>{
    window.localStorage.setItem(key, serilize(state))
  },
  [key, state, serilize])

  return [state, setState]
}

function Board() {
  // 🐨 squares is the state for this component. Add useState for squares

  const [history, setHistory] = useLocalStorageState('tic toc toe:history',[Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0);
  const currentSquares = history[currentStep];
  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables
  const winner = calculateWinner(currentSquares);
  const nextValue = calculateNextValue(currentSquares)
  const gameStatus = calculateStatus(winner, currentSquares, nextValue)
  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    //
    if(winner || currentSquares[square]) return
    const newstate = [...currentSquares];
    newstate[square] = nextValue; 
    const newHistory = history.slice(0, currentStep + 1);
    setHistory([...newHistory, newstate]);
    setCurrentStep((val) => ++val);
    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    //
    // 🐨 make a copy of the squares array
    // 💰 `[...squares]` will do it!)
    //
    // 🐨 set the value of the square that was selected
    // 💰 `squaresCopy[square] = nextValue`
    //
    // 🐨 set the squares to your copy
  }

  function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={ () => selectSquare(i) }>
        {currentSquares[i]}
      </button>
    )
  }
  function handleMove(newStep){
    console.log(newStep,'newStep');
    setCurrentStep(()=>{
      // const newHistory = history.slice(0, newStep + 1)
      // setHistory(newHistory);
      return newStep
    });
  }

  function moves(history) {
    return (
      <>
        {history.map((step, index) => 
          <div key={index} onClick={ () => handleMove(index)}> 
            <span>{`stpe: ${index+1}`}</span>
            <button disabled={index === currentStep}>{`go to step ${index+1} ` + (index === currentStep ? '(current)' : '')}</button>
          </div>)}
      </>
    )
  }

  return (
    <div>
      {gameStatus /* 🐨 put the status in the div below */}
      <div className="status">STATUS</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
      {moves(history)}
    </div>
  )
}


function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  console.log(squares,'squares')
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
