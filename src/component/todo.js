import React, { Component } from 'react'

export default class Todo extends Component {

    handleChekced = () => {
    }

    render() {
        const { todo } = this.props;
        let checked = todo.done ? "checked" : "";
        return (
            <div>
                <ul>
                    <li>
                        {todo.text}
                        <input onClick={this.props.doneProps.bind(null, todo.id)} onChange={this.handleChekced} checked={checked} type="checkbox" />
                        {
                            todo.done ?
                                <button onClick={this.props.trashProp.bind(null,todo.id)}>trash</button>
                                : ""
                        }
                    </li>
                </ul>
            </div>

        )
    }
}