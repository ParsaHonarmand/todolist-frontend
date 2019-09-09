import React from 'react';

function ToDoItems(props){
    return (
        props.wholeList.map((char, index) => 
            <div id="todoList" role="list" className="ui divided middle aligned list">
                <div role="listitem" className="item">
                    <span id="lines">{char}</span>
                    <div className="right floated content">
                        <button className="ui mini button" value={index} key={index} index={index} onClick={props.onComplete}><i aria-hidden="true" class="checkmark icon"></i></button>
                        <button className="ui mini button" value={index} key={index} index={index} onClick={props.onDelete}>X</button>
                    </div>
                </div>
            </div>
            )
        )
}

export default ToDoItems;