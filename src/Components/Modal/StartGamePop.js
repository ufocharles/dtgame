import React from 'react'
import Popup from './Popup'

function StartGamePop(props) {
    const { trigger } = props
    return (
        <div>
            <Popup trigger={trigger}>
                <h3>Who Playes first</h3>
                <div className='startGame'>
                    <button>Me</button>
                    <button>Computer</button>
                </div>
            </Popup>
        </div>
    )
}

export default StartGamePop
