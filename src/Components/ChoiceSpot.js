import React from "react"

export function ChoiceSpot(props) {
    const { id, userClick, nextPlayer } = props
    return <div className='selector' onClick={nextPlayer === 'PlayerOne' ? () => { userClick(id, 'PlayerOne') } : null}>
        <h2 className="dotClick">{id}</h2>
    </div>
}