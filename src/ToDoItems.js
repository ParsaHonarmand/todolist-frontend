import React from 'react';

function ToDoItems(props){
    return (
        props.wholeList.map((char, index) => 
            <div className="ui list" key={index}>
                <li key={index} id="listItem">
                    {char}
                    <button key={index} className="ui animated button" onClick={props.onDelete} >
                        <div className="visible content">DELETE</div>
                        <div className="hidden content">
                            <i aria-hidden="true" className="trash icon"></i>
                        </div>
                    </button>
                </li>
            </div>

            )
        )
}

export default ToDoItems;