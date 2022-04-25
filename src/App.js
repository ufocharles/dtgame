import React, { useState, useEffect } from 'react'
import './App.css';
import { GameBoard } from './Components/GameBoard'
import { ChoiceRow } from './Components/ChoiceRow'
import { StartGamePop, WinnerPop, DrawPop, ErrorPop } from './Components/Modal/index';
import _ from 'lodash';
import { getComputerPlay } from './Data/datahelpers'
import { UpdateBoardClick, CheckForWinner, getGridArray } from './Components/Shared'

function App() {
  const gridSize = 4

  const [boardArray, setBoardArray] = useState([])
  const [moveArray, setMoveArray] = useState([])
  const [allowPlayerClick, setAllowPlayerClick] = useState(false)
  const [gameOn, setGameOn] = useState(false)
  const [openStartGame, setOpenStartGame] = useState(false)
  const [nextPlayer, setNextPlayer] = useState('')
  const [winner, setWinner] = useState(undefined)
  const [winnerFound, setWinnerFound] = useState(false)
  const [drawGame, setDrawGame] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorExist, setErrorExist] = useState(false)

  useEffect(() => {
    const ret = getGridArray(gridSize)
    setBoardArray(ret)
  }, [])

  useEffect(() => {
    switch (nextPlayer) {
      case 'PlayerOne':
        setAllowPlayerClick(true)
        break;
      case 'Computer':
        getComputerMove()
        break
      default:
        break;
    }
    // eslint-disable-next-line
  }, [nextPlayer])

  useEffect(() => {
    if (winner) {
      setGameOn(false)
      setNextPlayer('')
    }
    if (moveArray.length === (gridSize * gridSize) && !winner) {
      setDrawGame(true)
      setGameOn(false)
      setNextPlayer('')
    }
  }, [winner, moveArray])

  function userClick(btnId, player) {
    const cloneMoveArray = _.clone(moveArray)
    let updatedBoardArray = UpdateBoardClick(btnId, player, boardArray)
    cloneMoveArray.push(btnId)
    setMoveArray(cloneMoveArray)
    const foundWinner = CheckForWinner(updatedBoardArray)
    if (foundWinner) {
      setWinner(foundWinner)
      setWinnerFound(true)
    }
    setBoardArray(updatedBoardArray)
    setNextPlayer('Computer')
  }

  function getComputerMove() {
    if (!winner && moveArray.length !== (gridSize * gridSize)) {
      getComputerPlay(moveArray)
        .then(data => {
          const compPlay = data.Data[data.Data.length - 1]
          const updatedBoardArray = UpdateBoardClick(compPlay, 'Computer', boardArray)
          setMoveArray(data.Data)
          setBoardArray(updatedBoardArray)
          const foundWinner = CheckForWinner(updatedBoardArray)
          if (foundWinner) {
            setWinner(foundWinner)
            setWinnerFound(true)
          }
        }).catch((err) => {
          console.log({ err })
          const cloneMovearray = _.clone(moveArray)
          cloneMovearray.pop()
          setMoveArray(cloneMovearray)
          // set the number of the column +1
          const messageArray = err.Data.split(' ')
          if (messageArray.length === 4) {
            const errorColumn = parseInt(messageArray[1]) + 1
            setErrorMessage(`Column ${errorColumn} is full. Select a differenct column`)
          } else {
            setErrorMessage(err.Data)
          }
          setErrorExist(true)
        })
    }
    setNextPlayer('PlayerOne')

  }
  function startGame() {
    // open modal for who starts the game
    const ret = getGridArray(gridSize)
    setBoardArray(ret)
    setMoveArray([])
    setWinner('')
    setOpenStartGame(true)
    setWinnerFound(false)
  }

  return (
    <>
      <main>
        <div className='startGame'>
          {gameOn === false ?
            <button className='startGame-btn' onClick={() => { startGame() }}>Start Game</button>
            : null
          }
        </div>
        <div className='backgroundContainer'>
          {gameOn ?
            <ChoiceRow gridSize={gridSize} userClick={userClick} allowPlayerClick={allowPlayerClick} />
            : null
          }
          <GameBoard GridData={boardArray} gridSize={gridSize} />
        </div>
      </main>
      <StartGamePop trigger={openStartGame} setTrigger={setOpenStartGame} setFirstPlayer={setNextPlayer} setGameOn={setGameOn} />
      <WinnerPop trigger={winnerFound} setTrigger={setWinnerFound} winner={winner} />
      <DrawPop trigger={drawGame} setTrigger={setDrawGame}/>
      <ErrorPop trigger={errorExist} setTrigger={setErrorExist} errorMessage={errorMessage} />
    </>
  );
}

export default App;
