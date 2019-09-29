import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import ToDoItems from './ToDoItems.js'
import CompletedItems from './CompletedItems.js';
import Header from './Header'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            status: [],
            currentItem: ''
        }    
    }

    addToDo(e){
        e.preventDefault()
        if (!this.state.currentItem) return 
        this.setState({
            items: [...this.state.items, this.state.currentItem],
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

    deleteCompleted(e) {
        if (e === undefined) {      
            console.log(e)    
        }
        const newCompleted = this.state.status
        newCompleted.splice(e.currentTarget.value, 1)
        this.setState({
            status: newCompleted
        })
    }


    completeToDo(e) {
        if (e === undefined) {      
            console.log(e)    
        }
        const completed = document.getElementsByClassName("singleItem")
        const itemToBeCompleted = completed[e.currentTarget.value].innerText

        const newToDos = this.state.items
        newToDos.splice(e.currentTarget.value, 1)

        this.setState ({
            items: newToDos,
            status: [...this.state.status, itemToBeCompleted]
        })
    }

    revertCompleted(e) {
        e.preventDefault()
        if (e === undefined) {      
            console.log(e)    
        }
        const completed = document.getElementsByClassName("completedItem")
        const itemToBeCompleted = completed[e.currentTarget.value].innerText

        const newCompleted = this.state.status
        newCompleted.splice(e.currentTarget.value, 1)
        this.setState({
            items: [...this.state.items, itemToBeCompleted],
            status: newCompleted
        })        
    }

    render(){
        if ((this.state.items.length === 0) && (this.state.status.length === 0)) {
            return(
                <div className="w3-animate-opacity">
                    <Header add={this.addToDo.bind(this)} handle={this.handleInput.bind(this)}/>
                    <div id="list">
                        <h2 id="header" className="ui header">Your List is Currently Empty!</h2>
                    </div>
                    <div id="completeList" className="w3-animate-opacity">
                        <CompletedItems wholeList={this.state.status} onDelete={this.deleteCompleted.bind(this)} onRevert={this.revertCompleted.bind(this)} /> 
                    </div>       
                    <footer>
                        <div className="ui container">
                            <a href="https://github.com/ParsaHonarmand/todo-list"><i className="ui big github icon"></i></a>
                            <a href="https://www.linkedin.com/in/parsa-honarmand-08479b171/"><i className="ui big linkedin icon"></i></a>
                        </div>
                    </footer>     
                </div>
            )
        }
        else if ((this.state.items.length > 0) && (this.state.status.length === 0)){
            return(
                <div>
                    <Header add={this.addToDo.bind(this)} handle={this.handleInput.bind(this)}/>
                    <div id="list" className="w3-animate-opacity">
                        <h4 id="listHeader" className="ui header">Your ToDo's</h4>
                        <ToDoItems wholeList={this.state.items} onDelete={this.deleteToDo.bind(this)} onComplete={this.completeToDo.bind(this)} />                    
                    </div>
                    <div id="completeList" className="w3-animate-opacity">
                        <CompletedItems wholeList={this.state.status} onDelete={this.deleteCompleted.bind(this)} onRevert={this.revertCompleted.bind(this)} /> 
                    </div>
                    <footer>
                        <div className="ui container">
                            <a href="https://github.com/ParsaHonarmand/todo-list"><i className="ui big github icon"></i></a>
                            <a href="https://www.linkedin.com/in/parsa-honarmand-08479b171/"><i className="ui big linkedin icon"></i></a>
                        </div>
                    </footer>     
                </div>
            )
        }
        else if ((this.state.items.length > 0) && (this.state.status.length > 0)){
            return(
                <div>
                    <Header add={this.addToDo.bind(this)} handle={this.handleInput.bind(this)}/>
                    <div id="list" className="w3-animate-opacity">
                        <h4 id="listHeader" className="ui header">Your ToDo's</h4>
                        <ToDoItems wholeList={this.state.items} onDelete={this.deleteToDo.bind(this)} onComplete={this.completeToDo.bind(this)} />                    
                    </div>
                    <div id="completeList" className="w3-animate-opacity">
                        <h4 id="listHeader" className="ui header">Completed ToDo's</h4>
                        <CompletedItems wholeList={this.state.status} onDelete={this.deleteCompleted.bind(this)} onRevert={this.revertCompleted.bind(this)} /> 
                    </div>
                    <footer>
                        <div className="ui container">
                            <a href="https://github.com/ParsaHonarmand/todo-list"><i className="ui big github icon"></i></a>
                            <a href="https://www.linkedin.com/in/parsa-honarmand-08479b171/"><i className="ui big linkedin icon"></i></a>
                        </div>
                    </footer>     
                </div>
            )            
        }
        else {
            return(
                <div>
                    <Header add={this.addToDo.bind(this)} handle={this.handleInput.bind(this)}/>
                    <div id="list" className="w3-animate-opacity">
                        <h2 id="header" className="ui header">Your List is Currently Empty!</h2>
                        <ToDoItems wholeList={this.state.items} onDelete={this.deleteToDo.bind(this)} onComplete={this.completeToDo.bind(this)} />                    
                    </div>
                    <div id="completeList" className="w3-animate-opacity">
                        <h4 id="listHeader" className="ui header">Completed ToDo's</h4>
                        <CompletedItems wholeList={this.state.status} onDelete={this.deleteCompleted.bind(this)} onRevert={this.revertCompleted.bind(this)} /> 
                    </div>
                    <footer>
                        <div className="ui container">
                            <a href="https://github.com/ParsaHonarmand/todo-list"><i className="ui big github icon"></i></a>
                            <a href="https://www.linkedin.com/in/parsa-honarmand-08479b171/"><i className="ui big linkedin icon"></i></a>
                        </div>
                    </footer>     
                </div>
            )                     
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
