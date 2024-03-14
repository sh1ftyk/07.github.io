import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
    }
  }

  render() {
    const { value } = this.state
    const { placeholder, title, addItem } = this.props
    const handleSubmit = (event) => {
      event.preventDefault()
      if (value.trim()) addItem(value)
      this.setState({ value: '' })
    }
    return (
      <form onSubmit={handleSubmit} className="header" name="header">
        <h1>{title}</h1>

        <label htmlFor="new-todo">
          <input
            type="text"
            id="new-todo"
            className="new-todo"
            placeholder={placeholder}
            onChange={(event) => this.setState({ value: event.target.value })}
            value={value}
          />
        </label>
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  addItem: PropTypes.func.isRequired,
}

NewTaskForm.defaultProps = {
  placeholder: 'What needs to be done?',
  title: 'Todos',
}
