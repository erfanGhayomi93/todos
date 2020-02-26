import React, { Component } from 'react'

export default class Todo extends Component {

    handleChekced = () => {
    }

    render() {
        const { todo } = this.props;
        let checked = todo.done ? "checked" : "";
        return (
            <tr>
                <td>{todo.id}</td>
                <td>{todo.text}</td>
                <td><input onClick={this.props.doneProps.bind(null, todo.id)} onChange={this.handleChekced} checked={checked} type="checkbox" style = {{width : 25,height : 25}} /></td>
                <td>
                    {`
                     ${todo.deadLine.year} / ${todo.deadLine.month} / ${todo.deadLine.day}
                     `}
                </td>
                <td><button  
                onClick={this.props.trashProp.bind(null, todo.id)}
                disabled = {!todo.done ? true : false}
                >trash</button></td>
            </tr>
        )
    }
}