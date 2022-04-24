import { Spot } from './Spot'
import _ from 'lodash'

export function Column(props) {
    const { columnData } = props
    const eachColumn = _.map(columnData.Spots, (a, i) => {
        return <Spot key={i} SpotData={a} id={i} />
    })
    return (
        <div className='backgroundBrown'>
            {eachColumn}
        </div>
    )
}