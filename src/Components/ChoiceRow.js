import _ from 'lodash'
import { ChoiceSpot } from './ChoiceSpot'

export function ChoiceRow (props) {
    const { gridSize, userClick, allowPlayerClick } = props
    const gridarray = new Array(gridSize)

    const choiceColumns = _.map(gridarray, (a, i) => {
        return <ChoiceSpot key={i} id={i} userClick={userClick} allowPlayerClick={allowPlayerClick} />
    })
    const gridStyle = {}
    gridStyle.display = 'grid'
    gridStyle.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    return (
        <div className='selectorContainer' style={gridStyle}>
            {choiceColumns}
        </div>
    )
}