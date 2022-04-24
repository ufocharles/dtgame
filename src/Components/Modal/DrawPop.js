import React from 'react'
import Popup from "./Popup";

export function DrawPop(props) {
    const { trigger, setTrigger } = props
    return (
        <div>
            <Popup trigger={trigger} setTrigger={setTrigger}>
                <div className='startGame'>
                <p className='poptext'>Games ends in DRAW</p>
                </div>
            </Popup>
        </div>
    )
}

export default DrawPop
