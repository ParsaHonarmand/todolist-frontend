import React from 'react';

function ToDoItems(props){
    return (
        props.wholeList.map((char, index) => 
            <div role="list" className="ui divided middle aligned list">
                <div role="listitem" className="item">
                    {char}
                    <div className="right floated content">
                        <button className="ui mini button" key={index} index={index} onClick={props.onDelete}>X</button>
                    </div>
                </div>
            </div>
            )
        )
}

export default ToDoItems;