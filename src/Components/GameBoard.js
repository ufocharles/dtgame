import _ from 'lodash'
import { Column } from './Column'
import clsx from 'clsx'

export function GameBoard(props) {
    const { GridData, gridSize } = props
    const boardColumns = _.map(GridData, (a, i) => {
        return <Column key={i} columnData={a} id={i} />
    })
    const gridStyle = {}
    gridStyle.display = 'grid'
    gridStyle.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    return (
        <div className='gridContainer' style={gridStyle}>
            {boardColumns}
        </div>
    )
}