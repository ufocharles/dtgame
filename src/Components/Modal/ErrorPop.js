import React from 'react'
import Popup from './Popup'

export function ErrorPop(props) {
    const { trigger, setTrigger, errorMessage } = props
    return (
        <div>
            <Popup trigger={trigger} setTrigger={setTrigger}>
                <div className='errorPop'>
                    <p className='poptext'>{errorMessage}</p>
                    <p>Play again</p>
                </div>
            </Popup>
        </div>
    )
}

export default ErrorPop
