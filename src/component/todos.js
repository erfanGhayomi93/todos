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
            deadLine: null,
            type: "ALL"

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

        this.nameInput.focus();
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
        let { todos, type } = this.state;
        let todosNum = type === "ALL" ? todos.length : type === "DONE" ? todos.filter(todo => todo.done).length : type === "UNDONE" ? todos.filter(todo => !todo.done).length : -1

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

                    <div>
                        <Datepicker
                            getDateProps={this.handleDate}
                        />
                    </div>

                    <div>
                        <button className="btn-success">submit</button>
                    </div>
                </form>

                <div className="mt-4 d-flex selectedType">
                    <button className="btn-primary btn-block mt-2" onClick={() => this.setState({ type: "ALL" })}>all</button>
                    <button className="btn-success btn-block" onClick={() => this.setState({ type: "DONE" })}>Done</button>
                    <button className="btn-danger btn-block" onClick={() => this.setState({ type: "UNDONE" })}>unDone</button>
                </div>

                <div className="mt-5 text-center">
                    <table className="table border table-hover">
                        <thead>
                            <tr className="bg-dark text-white">
                                <th colSpan="5">{type}
                                    ({todosNum}):
                                </th>
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
                                type === "ALL" ?
                                    todos
                                        // .filter(todo => !todo.done)
                                        .map(todo => <Todo
                                            todo={todo}
                                            key={todo.id}
                                            doneProps={this.handleDone}
                                            trashProp={this.handleTrash}

                                        />)
                                    : type === "DONE" ?
                                        todos
                                            .filter(todo => todo.done)
                                            .map(todo => <Todo
                                                todo={todo}
                                                key={todo.id}
                                                doneProps={this.handleDone}
                                                trashProp={this.handleTrash}
                                            />)
                                        : type === "UNDONE" ?
                                            todos
                                                .filter(todo => !todo.done)
                                                .map(todo => <Todo
                                                    todo={todo}
                                                    key={todo.id}
                                                    doneProps={this.handleDone}
                                                    trashProp={this.handleTrash}

                                                />)
                                            : null
                            }
                        </tbody>
                    </table>
                </div>


            </div>
        )
    }
}