import React from 'react';
import ReactDOM from 'react-dom';

function ToDoItems(props){
    return (
        props.wholeList.map((char, index) => 
            <li>
                {char}
                <button key={index} className="ui animated button" onClick={props.onDelete} >
                    <div className="visible content">DELETE</div>
                    <div className="hidden content">
                        <i aria-hidden="true" className="trash icon"></i>
                    </div>
                </button>
            </li>
            )
        )
}

export default ToDoItems;