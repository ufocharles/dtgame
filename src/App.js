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
    if (nextPlayer === 'Computer') {
      getComputerMove()
    }
    // eslint-disable-next-line
  }, [nextPlayer])

  function userClick(btnId, player) {
    const cloneMoveArray = _.clone(moveArray)
    let updatedBoardArray = UpdateBoardClick(btnId, player, boardArray)
    cloneMoveArray.push(btnId)
    setMoveArray(cloneMoveArray)
    const foundWinner = CheckForWinner(updatedBoardArray)
    if (foundWinner) {
      setWinner(foundWinner)
      setWinnerFound(true)
      setGameOn(false)
      setNextPlayer('')
      setBoardArray(updatedBoardArray)
    } else {
      setNextPlayer('Computer')
    }
  }

  function getComputerMove() {
    if (!winner) {
      getComputerPlay(moveArray)
        .then(data => {
          const compPlay = data.Data[data.Data.length - 1]
          const updatedBoardArray = UpdateBoardClick(compPlay, 'Computer', boardArray)
          setMoveArray(data.Data)
          setBoardArray(updatedBoardArray)
          const foundWinner = CheckForWinner(updatedBoardArray)
          // check for winner
          // if comp plays last and no winner then draw
          if (foundWinner) {
            setWinner(foundWinner)
            setWinnerFound(true)
            setGameOn(false)
            setNextPlayer('')
          } else if (!foundWinner && data.Data.length === (gridSize * gridSize)) {
            setDrawGame(true)
            setGameOn(false)
            setNextPlayer('')
          } else {
            setNextPlayer('PlayerOne')
          }
        }).catch((err) => {
          console.log({ err })
          // if no moves left then this ends in draw
          // else pop the last value and player one plays again
          if (err.Data === 'No moves left') {
            setDrawGame(true)
            setGameOn(false)
            setNextPlayer('')
          } else {
            const cloneMovearray = _.clone(moveArray)
            cloneMovearray.pop()
            setMoveArray(cloneMovearray)
            setErrorMessage(err.Data)
            setErrorExist(true)
            setNextPlayer('PlayerOne')
          }
        })
    }
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
            <ChoiceRow gridSize={gridSize} userClick={userClick} nextPlayer={nextPlayer} />
            : null
          }
          <GameBoard GridData={boardArray} gridSize={gridSize} />
        </div>
      </main>
      <StartGamePop trigger={openStartGame} setTrigger={setOpenStartGame} setFirstPlayer={setNextPlayer} setGameOn={setGameOn} />
      <WinnerPop trigger={winnerFound} setTrigger={setWinnerFound} winner={winner} />
      <DrawPop trigger={drawGame} setTrigger={setDrawGame} />
      <ErrorPop trigger={errorExist} setTrigger={setErrorExist} errorMessage={errorMessage} />
    </>
  );
}

export default App;
