import _ from 'lodash'

export const getGridArray = (gridSize) => {
    let ret = []
    for (var i = 0; i < gridSize; i++) {
        let columnObject = {}
        columnObject.Name = `Col${i}`
        // get array obj for column spots
        const spotArray = []
        for (var j = 0; j < gridSize; j++) {
            const spotObj = {}
            spotObj.PlayerType = ''
            spotObj.Position = j
            spotArray.push(spotObj)
        }
        columnObject.Spots = spotArray
        ret.push(columnObject)
    }
    return ret
}
export function UpdateBoardClick(btnId, player, boardArray) {
    const cloneBoardarray = _.clone(boardArray)
    _.forEach(cloneBoardarray, (a) => {
        if (a.Name === `Col${btnId}`) {
            for (var b = a.Spots.length - 1; b > -1; b--) {
                if (a.Spots[b].PlayerType === '') {
                    a.Spots[b].PlayerType = player
                    break
                }
            }
        }
    })
    return cloneBoardarray
}

export const CheckForWinner = (boardArray, gridSize) => {
    // test each column for equality
    let foundWinner
    for (var column of boardArray) {
        if (column.Spots[0].PlayerType !== '') {
            if (column.Spots.every((val, i, arr) => val.PlayerType === arr[0].PlayerType)) {
                foundWinner = column.Spots[0].PlayerType
                break
            }
        }
    }
    // if winner not found then continue
    if (!foundWinner) {
        // test for the row equality
        // loop number of gridsize times and check every corresp index for each column array
        for (var b = boardArray.length - 1; b > -1; b--) {
            const player = []
            for (var c of boardArray) {
                if (c.Spots[b].PlayerType !== '') {
                    player.push(c.Spots[b].PlayerType)
                }
            }
            if (player.length === boardArray.length && player.every((val, i, arr) => val === arr[0])) {
                foundWinner = player[0]
                break
            }
        }
    }
    // if winner still not found
    // check diagonal from top left for equality
    if (!foundWinner) {
        const player = []
        for (var d = 0; d < boardArray.length; d++) {
            if (boardArray[d].Spots[d].PlayerType !== '') {
                player.push(boardArray[d].Spots[d].PlayerType)
            }
        }
        if (player.length === boardArray.length && player.every((val, i, arr) => val === arr[0])) {
            foundWinner = player[0]
        }
    }

    // if winner still not found
    // check diagonal from top right for equality
    if (!foundWinner) {
        const player = []
        for (var f = 0; f < boardArray.length; f++) {
            if (boardArray[f].Spots[boardArray.length - 1 - f].PlayerType !== '') {
                player.push(boardArray[f].Spots[boardArray.length - 1 - f].PlayerType)
            }
        }
        if (player.length === boardArray.length && player.every((val, i, arr) => val === arr[0])) {
            foundWinner = player[0]
        }
}
    return foundWinner
}
