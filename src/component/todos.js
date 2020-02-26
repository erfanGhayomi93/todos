import React, { Component } from 'react';
import Todo from './todo';
import Datepicker from './dataPicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

export default class Todos extends Component {
    constructor(props) {
        super(props)

        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelChange = this.handelChange.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handleTrash = this.handleTrash.bind(this);
        this.handleDate = this.handleDate.bind(this)

        this.state = {
            todos: [],
            currentItem: { text: "", done: false, trash: false },
            deadLine: null

        }
    }

    componentDidMount() {
        this.nameInput.focus();
    }

    handleDate(date) {
        if (this.state.deadLine === date) return

        this.setState({
            deadLine: date
        })
    }

    getDate() {
        const currentTime = new Date().toLocaleTimeString();

        return currentTime
    }

    handelSubmit(e) {
        e.preventDefault();
        const { currentItem, deadLine } = this.state;
        let currentTodo = {};

        if (currentItem.text.length === 0) {
            alert("empty title task");
            return
        }

        const currentTime = this.getDate();

        if (deadLine === null) {
            alert("select date")
            return
        }

        Object.assign(currentTodo, {
            id: currentTime,
            deadLine
        }, currentItem)

        this.setState((prevState) => ({
            todos: [currentTodo, ...prevState.todos],
            currentItem: { text: "" }
        }))
    }

    handelChange(e) {
        const target = e.target;
        const value = target.value;

        if (!value) {
            this.setState({
                currentItem: {
                    text: ""
                }
            })
            return
        }

        this.setState({
            currentItem: {
                text: value,
                done: false,
                trash: false,
            }
        })

    }

    handleDone(id) {
        const index = this.state.todos.findIndex(todo => todo.id === id);
        const todos = [...this.state.todos];
        const todo = { ...this.state.todos[index] };
        todo.done = !todo.done;
        todos[index] = todo;

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
        let numDone = this.state.todos.filter(todo => todo.done);
        let numTodos = this.state.todos.filter(todo => !todo.done);
        // console.log(this.state)

        return (
            <div className="mt-3 text-center w-75 mx-auto">
                <form className="d-flex justify-content-center" onSubmit={this.handelSubmit}>
                    <div className="flex-grow-1">
                        <input
                            className="pl-2 w-100"
                            placeholder="task"
                            ref={(input) => this.nameInput = input}
                            onChange={this.handelChange}
                            value={this.state.currentItem.text}
                        />
                    </div>

                    <div className="">
                        <Datepicker
                            getDateProps={this.handleDate}
                        />
                    </div>

                    <div>
                        <button className="btn-success">submit</button>
                    </div>
                </form>

                <div className="mt-5 text-center">
                    <table className="table border table-hover">
                        <thead>
                            <tr className="bg-dark text-white">
                                <th colSpan="4">todos({numTodos.length}):</th>
                            </tr>
                            <tr>
                                <th>id</th>
                                <th>title</th>
                                <th>done</th>
                                <th>deadline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos
                                    .filter(todo => !todo.done)
                                    .map(todo => <Todo
                                        todo={todo}
                                        key={todo.id}
                                        doneProps={this.handleDone}
                                    />)
                            }
                        </tbody>
                    </table>
                </div>

                <div className="text-center mt-5">
                    <table className="table border table-hover">
                        <thead>
                            <tr className="bg-dark text-white">
                                <th colSpan="5">Done({numDone.length}):</th>
                            </tr>
                            <tr>
                                <th>id</th>
                                <th>title</th>
                                <th>done</th>
                                <th>deadline</th>
                                <th>trash</th>
                            </tr>
                        </thead>
                        <tbody>
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
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}