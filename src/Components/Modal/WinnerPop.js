import React from 'react'
import Popup from "./Popup";

export function WinnerPop(props) {
    const { trigger, setTrigger, winner } = props
    return (
        <div>
            <Popup trigger={trigger} setTrigger={setTrigger}>
                <div className='startGame'>
                <p className='poptext'><span className='winner-name'>{winner === 'PlayerOne' ? 'You win' : `${winner} wins`}</span> the game</p>
                </div>
            </Popup>
        </div>
    )
}

export default WinnerPop
