import React, { Component } from 'react';

class TodoList extends Component {
  state = {
    todos: [],
    newTaskInput: ''
  };

  componentDidMount() {
    this.fetchTodoList();
  }

  fetchTodoList() {
    fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/tcm68')
      .then(resp => resp.json())
      .then(data => {
        this.setState({ todos: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addTask = () => {
    const { todos, newTaskInput } = this.state;
    const newTask = { label: newTaskInput, done: false };
    const updatedTodos = [...todos, newTask];
  
    fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/tcm68', {
      method: 'PUT',
      body: JSON.stringify(updatedTodos),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(() => {
        this.setState({ todos: updatedTodos, newTaskInput: '' });
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  

  deleteTask = (index) => {
    const { todos } = this.state;
    const updatedTodos = todos.filter((_, i) => i !== index);

    fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/tcm68', {
      method: 'PUT',
      body: JSON.stringify(updatedTodos),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ todos: updatedTodos });
      })
      .catch(error => {
        console.log(error);
      });
  };

  cleanAllTasks = () => {
    const updatedTodos = [];

    fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/tcm68', {
      method: 'PUT',
      body: JSON.stringify(updatedTodos),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ todos: updatedTodos });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { todos, newTaskInput } = this.state;

    return (
      <div className="todo-list-container fixed-top container">
        <h1 className="todo-list-title">Todo List</h1>
        
        <div className="todo-input-container">
          <input
            type="text"
            value={newTaskInput}
            onChange={(e) => this.setState({ newTaskInput: e.target.value })}
            placeholder="Enter a new task"
            className="todo-input"
          />
          <button onClick={this.addTask} className="todo-button">Add Task</button>
        </div>
        {todos.length === 0 ? (
          <p>No tasks to display.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li key={index} className="todo-item">
                {todo.label}
                <button onClick={() => this.deleteTask(index)}>Delete</button>
                {index < todos.length - 1 && <hr className="task-separator" />}
              </li>
            ))}
          </ul>
        )}
        <button onClick={this.cleanAllTasks} className="clean-all-button">Clean All Tasks</button>
      </div>
    );
  }
}

export default TodoList;
