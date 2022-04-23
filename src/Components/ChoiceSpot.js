import React from "react"
// import clsx from 'clsx'

export function ChoiceSpot (props) {
    const { id, userClick, allowPlayerClick } = props

    return <div className='selector' onClick={allowPlayerClick ? () => { userClick(id, 'PlayerOne') } : null}></div>
}