import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import ToDoItems from './ToDoItems.js'
import CompletedItems from './CompletedItems.js';
import Header from './Header'
import Login from './Login';
import SignUp from './Signup'

const axios = require('axios');
let status = false
let user
let prevCompleted = []
let stillToDo = []

class App extends React.Component {
    constructor(props) {
        super(props)
        if (props.registered===true) {
            status = true
            user = props.user
            let wholeList = props.todos
            for (var i=0; i<props.todos.length; i++){
                if(props.todos[i].todo_check===false){
                    stillToDo = [...stillToDo, props.todos[i]]
                }
                else{
                    prevCompleted = [...prevCompleted, props.todos[i]]
                }
            }
            //this.callAPI = this.callAPI.bind(this)
            this.retrieveItems = this.retrieveItems.bind(this) 
            this.getCompletedItem = this.getCompletedItem.bind(this)
            //this.callAPI();
        //    this.retrieveItems();
        //    this.getCompletedItem();   
        }
        this.state = {
            items: stillToDo,
            status: prevCompleted,
            currentItem: ''
        }    
    }
    // callAPI() {
    //     axios.get('http://localhost:3001')
    //     .then(x => console.log(x))
    //     .catch(err => console.log(err))
    // }

    retrieveItems() {
        axios.post(process.env.REACT_APP_BACK_END_URL + 'retrieveItem', {username: user})
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    
    getCompletedItem() {
        axios.post(process.env.REACT_APP_BACK_END_URL + 'completedList', {username: user})
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    // componentDidMount() {
    //     axios.get(process.env.REACT_APP_BACK_END_URL + 'item')
    //         .then(res => {
    //             this.setState({items: [...res.data.todo_name]})
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    addToDo(e){
        e.preventDefault()
        if (!this.state.currentItem) return 
        
        const userObj = {
            username: user,
            todo: this.state.currentItem
        }

        this.setState({
            items: [...this.state.items, this.state.currentItem],
        })



        axios.post(process.env.REACT_APP_BACK_END_URL + "item", userObj) 
            .then(x => console.log('added to todolist:', x.data))
            .catch(err => console.log(err))

        e.target.reset()
    }

    handleInput(e){
        e.preventDefault()
        this.setState({
            currentItem: {todo_name: e.target.value, todo_check: false}
        })
    }


    deleteToDo(e){
        if (e === undefined) {      
            console.log(e)    
        }
        const newToDos = this.state.items
        const completedItems = this.state.status
        console.log(newToDos[e.currentTarget.value].todo_name)
        newToDos.splice(e.currentTarget.value, 1)
        const itemObj = {
            username: user,
            todos: newToDos.concat(completedItems)
        }
        this.setState({
            items: newToDos
        })

        axios.post(process.env.REACT_APP_BACK_END_URL + "delete", itemObj) 
            .then(x => console.log('item deleted: ', x.data))
            .catch(err => console.log(err))
    }

    deleteCompleted(e) {
        if (e === undefined) {      
            console.log(e)    
        }
        var newCompleted = this.state.status
        var prevTodos = this.state.items
        newCompleted.splice(e.currentTarget.value, 1)
        const itemObj = {
            username: user,
            todos: prevTodos.concat(newCompleted)
        }
        this.setState({
            status: newCompleted
        })

        axios.post(process.env.REACT_APP_BACK_END_URL + "delete", itemObj) 
        .then(x => console.log('item deleted: ', x.data))
        .catch(err => console.log(err))
    }


    completeToDo(e) {
        if (e === undefined) {      
            console.log(e)    
        }
        const leftToDo = document.getElementsByClassName("singleItem")
        const itemToBeCompleted = leftToDo[e.currentTarget.value].innerText

        let newToDos = this.state.items
        let prevCompleted = this.state.status

        newToDos.splice(e.currentTarget.value, 1)

        const itemObj = {
            username: user,
            todo_name: itemToBeCompleted,
            todo_check: true
        }
        this.setState ({
            items: newToDos,
            status: [...this.state.status, itemObj]
        })
        newToDos = this.state.items
        prevCompleted = this.state.status
        const userObj = {
            username: user,
            todos: newToDos.concat(prevCompleted)
        }
        axios.post(process.env.REACT_APP_BACK_END_URL + "complete", itemObj) 
            .then(x => console.log('added to completed:', x.data))
            .catch(err => console.log(err))
    }

    revertCompleted(e) {
        e.preventDefault()
        if (e === undefined) {      
            console.log(e)    
        }
        const completed = document.getElementsByClassName("completedItem")
        const itemToBeCompleted = completed[e.currentTarget.value].innerText
        const itemObj = {
            username: user,
            todo_name : itemToBeCompleted,
            todo_check: false
        }
        const newCompleted = this.state.status
        newCompleted.splice(e.currentTarget.value, 1)
        this.setState({
            items: [...this.state.items, itemObj],
            status: newCompleted
        })        

        axios.post(process.env.REACT_APP_BACK_END_URL + "revert", itemObj) 
            .then(x => console.log('reverted back to todo:', x.data))
            .catch(err => console.log(err))
    }

    signOut() {
        this.setState({
            status: false
        })
    }


    render(){
        console.log("***")
        console.log(process.env.REACT_APP_BACK_END_URL)
        if (status===false) {
            return(
                <Login />
            )
        }
        else {
        if ((this.state.items.length === 0) && (this.state.status.length === 0)) {
            return(
                <div className="w3-animate-opacity">
                    <Header add={this.addToDo.bind(this)} handle={this.handleInput.bind(this)}/>
                    <div id="list">
                        <h2 id="header" className="ui header">Your List is Currently Empty!</h2>                    
                    </div>
                    <div id="completeList" className="w3-animate-opacity">
                        <CompletedItems wholeList={this.state.status} onDelete={this.deleteCompleted.bind(this)} onRevert={this.revertCompleted.bind(this)} />
                        <button onClick={this.signOut.bind(this)}>Sign out</button> 
                    </div>       
                    <footer>
                        <div className="ui container">
                            <a href="https://github.com/ParsaHonarmand/todo-list.git"><i className="ui big github icon"></i></a>
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
                            <a href="https://github.com/ParsaHonarmand/todo-list.git"><i className="ui big github icon"></i></a>
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
                            <a href="https://github.com/ParsaHonarmand/todo-list.git"><i className="ui big github icon"></i></a>
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
                            <a href="https://github.com/ParsaHonarmand/todo-list.git"><i className="ui big github icon"></i></a>
                            <a href="https://www.linkedin.com/in/parsa-honarmand-08479b171/"><i className="ui big linkedin icon"></i></a>
                        </div>
                    </footer>     
                </div>
            )                     
        }
    }
    }
}
export default App
ReactDOM.render(<App />, document.getElementById('root'));
