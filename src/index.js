import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import ToDoItems from './ToDoItems.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            currentItem: ''
        }    
    }

    addToDo(e){
        e.preventDefault()
        this.setState({
            items: [...this.state.items, this.state.currentItem]
        })
    }

    handleInput(e){
        e.preventDefault()
        this.setState({
            currentItem: e.target.value
        })
    }

    deleteToDo(itemIndex){
        console.log("Delete item")
        if (itemIndex === 'undefined') {      
            console.log(itemIndex)    
        }

        const newToDos = this.state.items
        newToDos.splice(itemIndex, 1)
        this.setState({
            items: newToDos
        })
    }

    render(){
        return(
            <div className="main" id="mainDash">
                <h2 id='centralizedContent'>Welcome to your ToDo list</h2>
                
                <form id='centralizedContent' className="ui medium form" onSubmit={this.addToDo.bind(this)}>
                    <input placeholder="What do you need to do?" type='text' onChange={this.handleInput.bind(this)}/>
                    <button className="ui button">ADD</button>
                </form>

                <ul>
                    <div>
                        <ToDoItems listItem={this.state.currentItem} wholeList={this.state.items} onDelete={this.deleteToDo.bind(this)} />
                    </div>
                </ul>

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
