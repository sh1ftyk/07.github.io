import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import { enGB } from 'date-fns/locale/en-GB'

export default class Task extends Component {
  constructor() {
    super()
    this.state = {
      editing: false,
      value: '',
    }
  }

  handleSubmit(event) {
    const { value } = this.state
    event.preventDefault()
    const {
      editItem,
      todo: { id },
    } = this.props
    editItem(id, value)
    this.setState({ value: '' })
    this.setState({ editing: false })
  }

  render() {
    const { value, editing } = this.state
    const { changeCheck, todo, deleteItem } = this.props
    const { body, id, checked, date } = todo
    return (
      <li className={checked ? 'completed' : editing ? 'editing' : null}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            onChange={(event) => changeCheck(id, event.target.checked)}
            checked={checked}
          />
          <label htmlFor={id}>
            <span className="description">{body}</span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                locale: enGB,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button
            type="button"
            onClick={() =>
              this.setState(({ editing }) => ({
                editing: !editing,
                value: todo.body,
              }))
            }
            className="icon icon-edit"
          />
          <button type="button" onClick={() => deleteItem(id)} className="icon icon-destroy" />
        </div>
        {editing && (
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              onChange={(event) => this.setState({ value: event.target.value })}
              type="text"
              className="edit"
              value={value}
            />
          </form>
        )}
      </li>
    )
  }
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string,
    checked: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  deleteItem: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
}

Task.defaultProps = {
  todo: {},
}
