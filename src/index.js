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
        if(!this.state.currentItem) return 
        this.setState({
            items: [...this.state.items, this.state.currentItem]
        })
        e.currentTarget.reset()
    }

    handleInput(e){
        e.preventDefault()
        this.setState({
            currentItem: e.target.value
        })
    }


    deleteToDo(e){
        if (e === undefined) {      
            console.log(e)    
        }
        const newToDos = this.state.items
        newToDos.splice(e.currentTarget.value, 1)
        this.setState({
            items: newToDos
        })
    }


    completeToDo(e) {
        e.preventDefault()
        if (e === undefined) {      
            console.log(e)    
        }
        var completed = document.getElementsByClassName("singleItem")
        console.log(completed)
        completed[e.currentTarget.value].style.setProperty("text-decoration", "line-through")
    }

    render(){
        var date = new Date().getDate()
        var month = new Date().getMonth()
        var year = new Date().getFullYear()

        if (this.state.items.length === 0) {
            return(
                <div className="w3-animate-opacity">
                    <div id="header">
                        <h2>Welcome to your ToDo list</h2>
                        <p>TODAY'S DATE: {date}/{month}/{year}</p> 
                        <form className="ui medium form" id="myForm" name="myForm" onSubmit={this.addToDo.bind(this)}>
                            <input placeholder="What do you need to do?" type='text' onChange={this.handleInput.bind(this)}/>
                            <button id="addBut" className="ui button">ADD</button>
                        </form>
                    </div>
                    <div id="list">
                        <h2 id="header">Your list is currently empty!</h2>
                    </div>            
                </div>
            )
        }
        else {
            return(
                <div>
                    <div id="header">
                        <h2>Welcome to your ToDo list</h2>
                        <p>TODAY'S DATE: {date}/{month}/{year}</p> 
                        <form className="ui medium form" onSubmit={this.addToDo.bind(this)}>
                            <input placeholder="What do you need to do?" type='text' onChange={this.handleInput.bind(this)}/>
                            <button className="ui button">ADD</button>
                        </form>
                    </div>
                    <div id="list" className="w3-animate-opacity">
                        <ToDoItems wholeList={this.state.items} onDelete={this.deleteToDo.bind(this)} onComplete={this.completeToDo.bind(this)} />
                    </div>
                </div>
            )
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
