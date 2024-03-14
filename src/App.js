import React, { Component } from 'react'

import './App.css'
import Footer from './components/Footer'
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      filter: 'All',
    }
  }

  addItem(value) {
    const { todos } = this.state
    const data = {
      id: todos.length + 1,
      body: value,
      checked: false,
      date: new Date(),
    }

    this.setState(({ todos }) => ({ todos: [...todos, data] }))
  }

  deleteItem(ident) {
    this.setState(({ todos }) => ({
      todos: todos.filter(({ id }) => id !== ident),
    }))
  }

  changeCheck(ident, data) {
    this.setState(({ todos }) => ({
      todos: todos.map((element) => {
        if (ident === element.id) element.checked = data
        return element
      }),
    }))
  }

  editItem(ident, text) {
    this.setState(({ todos }) => ({
      todos: todos.map((element) => {
        if (element.id === ident) element.body = text
        return element
      }),
    }))
  }

  filteredItems() {
    const { todos, filter } = this.state
    return todos.filter(({ checked }) => {
      const all = filter === 'All'
      const completed = filter === 'Completed'
      return all ? true : completed ? checked === true : checked === false
    })
  }

  clearCompleted() {
    this.setState(({ todos }) => ({
      todos: todos.filter((element) => !element.checked),
    }))
  }

  changeFilter(data) {
    this.setState({ filter: data })
  }

  render() {
    const { todos, filter } = this.state
    return (
      <div className="todoapp">
        <NewTaskForm title="Todos" placeholder="What needs to be done?" addItem={this.addItem.bind(this)} />
        <TaskList
          changeCheck={this.changeCheck.bind(this)}
          editItem={this.editItem.bind(this)}
          deleteItem={this.deleteItem.bind(this)}
          todos={this.filteredItems()}
        />
        <Footer
          changeFilter={this.changeFilter.bind(this)}
          clearCompleted={this.clearCompleted.bind(this)}
          lefts={todos.filter(({ checked }) => !checked).length}
          filter={filter}
        />
      </div>
    )
  }
}

export default App
