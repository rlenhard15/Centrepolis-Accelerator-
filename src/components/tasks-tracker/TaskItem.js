import React, { useState, memo } from 'react';

import EditIcon from '../../images/icons/edit-icon.svg';
import DeleteIcon from '../../images/icons/delete-icon.svg';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

import useHttp from '../../hooks/useHttp.hook';

import './TaskItem.scss';

const TaskItem = memo(props => {
  const { request } = useHttp();
  const [state, setState] = useState({
    open: false,
    status: props.status,
  })

  const handleCompleteTask = async () => {
    if (state.status === 'started') {
      await request(`/api/tasks/${props.id}/mark_task_as_completed`, 'PUT');
      setState({ ...state, open: !state.open, status: 'completed' });
    }
  }

  const formatDate = date => date.split('T')[0].split('-').reverse().join('/').replace(/\/20/g, '/');

  return (
    <div className="task">
      <div className="task-main">
        <p className={`task-main-title ${props.priority}-priority`}>{props.title}</p>
        <div className="task-main-info">
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
              : (
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
                        <span className="disable">Incomplete</span>
                        <IconButton
                          onClick={handleCompleteTask}
                        >
                          Complete
                        </IconButton>
                      </div> : null
                  }
                </>
              )
          }
        </div>
        <p className="due-date">
          <span className="title">Due Date</span>
          <span className="date">{formatDate(props.due_date)}</span>
        </p>
        {
          props.userType === "Admin" ?
            <div className="actions">
              <IconButton
                onClick={() => props.handleShowPopup(props.id)}
              >
                <img src={EditIcon} alt="Edit" />
              </IconButton>
              <IconButton
                onClick={() => props.handleDeleteTask(props.id)}
              >
                <img src={DeleteIcon} alt="Delete" />
              </IconButton>
            </div> : null
        }
      </div>
    </div>
  )
})

export default TaskItem