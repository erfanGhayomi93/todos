import React, { Component } from 'react';
import Todo from './todo'

export default class Todos extends Component {
    constructor(props) {
        super(props)

        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelChange = this.handelChange.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handleTrash = this.handleTrash.bind(this)

        this.state = {
            todos: [],
            currentItem: {},
            generateId: 0
        }
    }

    handelSubmit(e) {
        e.preventDefault();
        const { todos, currentItem } = this.state;
        let currentTodo = {}

        Object.assign(currentTodo, {
            id: ++this.state.generateId
        }, currentItem)

        this.setState({
            todos: [currentTodo, ...todos]
        })

    }

    handelChange(e) {
        const target = e.target;
        const value = target.value;

        let todo = {
            done: false,
            trash: false,
            text: value
        }

        this.setState({
            currentItem: todo
        })

    }

    handleDone(id) {
        console.log(this.state.todos)

        const index = this.state.todos.findIndex(todo => todo.id === id);
        const todos = [...this.state.todos];
        const todo = { ...this.state.todos[index] };
        todo.done = !todo.done;
        todos[index] = todo;

        console.log(todos)

        this.setState({
            todos
        })


    }

    handleTrash(id) {
        const index = this.state.todos.findIndex(todo => todo.id === id);
        let todos = [...this.state.todos]
        todos.splice(index, 1)

        // this.state.todos.map((todo,ind)=>{
        //     if(todo.id === id)
        //        this.state.todos.splice(ind,1)
        // })  
        this.setState({
            todos
        })
    }

    render() {
        console.log(this.state.todos)

        let numDone = this.state.todos.filter(todo => todo.done);
        let numTodos = this.state.todos.filter(todo => !todo.done);
        // console.log(this.state.todos)


        return (
            <div>
                <form onSubmit={this.handelSubmit}>
                    <input onChange={this.handelChange} value={this.state.todos.text} />
                    <button>submit</button>
                </form>

                <h1>todos({numTodos.length}):</h1>
                {
                    this.state.todos
                        .filter(todo => !todo.done)
                        .map(todo => <Todo
                            todo={todo}
                            key={todo.id}
                            doneProps={this.handleDone}
                        />)
                }

                <h1>Done({numDone.length}):</h1>
                {
                    this.state.todos
                        .filter(todo => todo.done)
                        .map(todo => <Todo
                            todo={todo}
                            key={todo.id}
                            doneProps={this.handleDone}
                            trashProp={this.handleTrash}
                        />)
                }

            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextProps, nextState);
        return {

        }
    }

    getSnapshotBeforeUpdate() {
        // console.log(this.state)
        return {}
    }

    componentDidUpdate() {
        // console.log(this.state.todos)
    }
}
