import React from "react"

export function ChoiceSpot(props) {
    const { id, userClick, nextPlayer } = props
    return <div className='selector' onClick={nextPlayer === 'PlayerOne' ? () => { userClick(id, 'PlayerOne') } : null}></div>
}