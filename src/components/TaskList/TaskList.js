import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

function TaskList({ todos, changeCheck, editItem, deleteItem }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task key={todo.id} changeCheck={changeCheck} editItem={editItem} deleteItem={deleteItem} todo={todo} />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  todos: PropTypes.any,
  changeCheck: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
  todos: {},
}

export default TaskList
