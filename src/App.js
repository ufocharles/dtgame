import React, { useState, useEffect } from 'react'
import './App.css';
import { GameBoard } from './Components/GameBoard'
import { ChoiceRow } from './Components/ChoiceRow'
import _ from 'lodash';
import { getComputerPlay } from './Data/datahelpers'
import { UpdateBoardClick, CheckForWinner, getGridArray } from './Components/Shared'

function App(props) {
  const gridSize = 4

  const [boardArray, setBoardArray] = useState([])
  const [moveArray, setMoveArray] = useState([])
  const [allowPlayerClick, setAllowPlayerClick] = useState(true)
  const [nextPlayer, setNextPlayer] = useState('')

  useEffect(() => {
    const ret = getGridArray(gridSize)
    setBoardArray(ret)
  }, [])

  async function userClick(btnId, player) {
    const cloneMoveArray = _.clone(moveArray)
    let updatedBoardArray = UpdateBoardClick(btnId, player, boardArray)
    cloneMoveArray.push(btnId)
    setMoveArray(cloneMoveArray)
    let foundWinner = CheckForWinner(updatedBoardArray)
    if (!foundWinner && cloneMoveArray.length !== (gridSize * gridSize)) {
      getComputerPlay(cloneMoveArray)
        .then(data => {
          const compPlay = data.Data[data.Data.length - 1]
          updatedBoardArray = UpdateBoardClick(compPlay, 'Computer', boardArray)
          setMoveArray(data.Data)
          foundWinner = CheckForWinner(updatedBoardArray)
          console.log({ compPlay })

        }).catch((err) => {
          console.log({ err })
        })
    }

    setBoardArray(updatedBoardArray)
  }
  return (
    <>
      <div><h2>Are you Ready To Play?</h2></div>
      <div className='backgroundContainer'>
        <ChoiceRow gridSize={gridSize} userClick={userClick} allowPlayerClick={allowPlayerClick} />
        <GameBoard GridData={boardArray} gridSize={gridSize} />
      </div>

    </>
  );
}

export default App;