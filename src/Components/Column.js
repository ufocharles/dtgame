import { Spot } from './Spot'
import _ from 'lodash'

export function Column(props) {
    const { columnData } = props
    const eachColumn = _.map(columnData.Spots, (a, i) => {
        return <Spot key={i} SpotData={a} id={i} />
    })
    const gridStyle = {}
    gridStyle.display = 'grid'
    gridStyle.gridTemplateColumns = `repeat(${columnData.length}, 1fr)`

    return (
        <div className='backgroundBrown' style={gridStyle}>
            {eachColumn}
        </div>
    )
}