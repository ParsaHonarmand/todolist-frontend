import React from 'react'
import Clock from './Clock.js'
function Header(props){
    return(
        <div id="header">
            <h2 className="ui header">Welcome to your ToDo List</h2>
            <Clock /> 
            <form className="ui medium form" onSubmit={props.add}>
                <input placeholder="What do you need to do?" type='text' onChange={props.handle}/>
                <button id="addBut" className="ui secondary button">ADD</button>
            </form>
        </div>
    )
}

export default Header