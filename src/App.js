import React, { Component } from 'react';
import Todos from "./component/todos";

export default class App extends Component {
  render() {
    return (
      <div>
          <Todos test = "test"/>
      </div>
    )
  }
}
