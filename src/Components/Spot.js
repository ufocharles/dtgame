import React from "react"
import clsx from 'clsx'

export function Spot(props) {
    const { SpotData, id } = props
    let playerOne = false
    let computer = false
    let noPlay = false
    switch (SpotData.PlayerType) {
        case 'PlayerOne':
            playerOne = true
            break;
        case 'Computer':
            computer = true
            break;
        case '':
            noPlay = true
            break;
        default:
            break
    }
    // console.log({ divColor })
    return <div key={`${id}`} className={clsx('WhiteCircle', {
        'blueBG': playerOne,
        'redBG': computer,
        'whiteBG': noPlay
    })}></div>
}