import React from 'react';

function ToDoItems(props){
    return (
        props.wholeList.map((char, index) => 
            <div id="todoList" role="list" className="ui divided bottom aligned list">
                <div role="listitem" className="item">
                    <div className="right floated content">
                        <button className="ui mini secondary button" value={index} onClick={props.onComplete}><i className="checkmark icon"></i></button>
                        <button className="ui mini secondary icon button" value={index} onClick={props.onDelete}><i className="trash icon"></i></button>
                    </div>         
                    <label key={index} className="w3-animate-opacity" id="lines"><span className="singleItem">{char.todo_name}</span></label>          
                </div>
            </div>
            )
        )
}

export default ToDoItems;