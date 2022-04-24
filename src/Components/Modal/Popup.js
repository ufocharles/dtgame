import React from 'react'
import './Popup.css'

export function Popup(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className="popup-inner">
                <button onClick={() => { props.setTrigger(false)}} className='close-btn'>close</button>
                {props.children}
            </div>
        </div>
    ) : null
}

export default Popup
