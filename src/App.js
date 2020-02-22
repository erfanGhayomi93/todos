import React, { Component } from 'react';
import Todos from "./component/todos"

export default class App extends Component {
  render() {
    return (
      <div>
          <Todos test = "test"/>
                    <p> this is added p tag in develop branch</p>
                    <h1>header conflict develop</h1>
      </div>
    )
  }
}
