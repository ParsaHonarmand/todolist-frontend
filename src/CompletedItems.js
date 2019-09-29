import React from 'react';

function CompletedItems(props){
    return (
        props.wholeList.map((char, index) => 
            <div id="todoList" role="list" className="ui divided middle aligned list">
                <div role="listitem" className="item">
                    <div className="right floated content">
                        <button className="ui mini secondary button" value={index}  onClick={props.onRevert}>Revert</button>
                        <button className="ui mini secondary icon button" value={index}  onClick={props.onDelete}><i className="trash icon"></i></button>                               
                    </div>
                    <div className="content">
                        <label key={index} className="w3-animate-opacity" id="lines"><span className="completedItem"> {char} </span></label>                          
                    </div>            
                </div>
            </div>
        )
    )
}

export default CompletedItems;