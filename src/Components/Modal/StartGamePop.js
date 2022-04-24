import React from 'react'
import Popup from './Popup'

export function StartGamePop(props) {
    const { trigger, setTrigger, setFirstPlayer, setGameOn } = props

    function StartGame (player) {
        setGameOn(true)
        setFirstPlayer(player)
        setTrigger(false)
    }
    return (
        <div>
            <Popup trigger={trigger} setTrigger={setTrigger}>
                <h3>Who Playes first</h3>
                <div className='startGame'>
                    <button onClick={() => { StartGame('PlayerOne') }} className='btn-Me'>Me</button>
                    <button onClick={() => { StartGame('Computer')}} className='btn-Comp'>Computer</button>
                </div>
            </Popup>
        </div>
    )
}

export default StartGamePop
