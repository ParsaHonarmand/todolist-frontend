import React from 'react';

function ToDoItems(props){
    return (
        props.wholeList.map((char, index) => 
            <div id="todoList" role="list" className="ui divided middle aligned list">
                <div role="listitem" className="item">
                    <label className="w3-animate-opacity" id="lines"><span className="singleItem">{char}</span></label>
                    <div className="right floated content">
                        <button className="ui circular icon button" value={index} onClick={props.onComplete}><i aria-hidden="true" className="checkmark icon"></i></button>
                        <button className="ui circular icon button" value={index} onClick={props.onDelete}><i aria-hidden="true" className="trash icon"></i></button>
                    </div>
                </div>
            </div>
            )
        )
}

export default ToDoItems;