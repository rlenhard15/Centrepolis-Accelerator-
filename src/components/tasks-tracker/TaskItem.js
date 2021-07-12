import React, { useState, memo } from 'react'

import { ReactComponent as EditIcon } from '../../images/icons/edit-icon.svg'
import DeleteIcon from '../../images/icons/delete-icon.svg'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded'
import { useAuthContext } from '../../CheckAuthorization'

import useHttp from '../../hooks/useHttp.hook'

import './TaskItem.scss'

const TaskItem = memo(props => {
  const { request } = useHttp()
  const { authData: { user }, isMember, isTeamLead } = useAuthContext()

  const [state, setState] = useState({
    open: false,
    status: props.status,
  })

  const handleCompleteTask = async () => {
    if (state.status === 'started') {
      await request(`/api/tasks/${props.id}/mark_task_as_completed`, 'PUT')
      setState({ ...state, open: !state.open, status: 'completed' })
    }
  }

  const formatDate = date => date.split('T')[0].split('-').reverse().join('/').replace(/\/20/g, '/')

  const isAbleToUpdateTask = () => {
    if (isTeamLead || isMember) return true

    return props.users_for_task.some(u => u.id === user.id)
  }

  const renderUtilityButtons = () => {
    if (isMember || !isAbleToUpdateTask()) return null

    return (
      <div className="actions">
        <IconButton
          onClick={() => props.handleShowPopup(props.id)}
          className="actions-edit"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => props.handleDeleteTask(props.id)}
        >
          <img src={DeleteIcon} alt="Delete" />
        </IconButton>
      </div>
    )
  }

  const assignedUsers = () => {
    const users = isTeamLead || isMember ? props.members_for_task : props.users_for_task

    return users
      .filter(u => u.user_type !== 'Admin' || u.user_type !== 'SuperAdmin')
      .map(u => `${u.first_name} ${u.last_name}`)
      .join(', ') || '--'
  }

  return (
    <div className="task">
      <div className="task-main">
        <p className={`task-main-title ${props.priority}-priority`}>{props.title}</p>
        <div className="task-main-info">
          <p>
            <span className="task-main-info-title">Assigned to</span>
            <span className="task-main-info-text">{assignedUsers()}</span>
          </p>
          <p>
            <span className="task-main-info-title">Assessment</span>
            <span className="task-main-info-text">{props.master_assessment.split(' ')[0]}</span>
          </p>
          <p>
            <span className="task-main-info-title">Risk Category</span>
            <span className="task-main-info-text">{props.category}</span>
          </p>
          <p>
            <span className="task-main-info-title">Stage</span>
            <span className="task-main-info-text">{props.stage_title}</span>
          </p>
        </div>
      </div>
      <div className="task-actions">
        <div className="complete">
          {
            state.status === 'completed' ?
              <span className="completed">
                Completed
              </span>
              : isAbleToUpdateTask()
                ? (
                  <>
                    <IconButton
                      className="complete-open-btn"
                      onClick={() => setState({ ...state, open: !state.open })}
                    >
                      Incomplete
                      <KeyboardArrowDownRoundedIcon />
                    </IconButton>
                    {
                      state.open ?
                        <div className="complete-options">
                          <span className="complete-option disable">Incomplete</span>
                          <IconButton
                            className="complete-option"
                            onClick={handleCompleteTask}
                          >
                            Complete
                          </IconButton>
                        </div> : null
                    }
                  </>
                ) : (
                  <span>
                    Incomplete
                  </span>
                )
          }
        </div>
        <p className="due-date">
          <span className="title">Due Date</span>
          <span className="date">{formatDate(props.due_date)}</span>
        </p>
        {renderUtilityButtons()}
      </div>
    </div>
  )
})

export default TaskItem
