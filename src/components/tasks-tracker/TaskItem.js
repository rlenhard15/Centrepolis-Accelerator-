import React, { memo, useState } from 'react';

import { ReactComponent as EditIcon } from '../../images/icons/edit-icon.svg';
import DeleteIcon from '../../images/icons/delete-icon.svg';
import IconButton from '@material-ui/core/IconButton';
import { useAuthContext } from '../../CheckAuthorization';

import useHttp from '../../hooks/useHttp.hook';

import './TaskItem.scss';
import { fullNameOrEmail } from '../../utils/helpers';
import { ListItemIcon, ListItemText, Menu, MenuItem, } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import toastr from 'toastr';

const TaskItem = memo(props => {
  const { request } = useHttp();
  const {
    authData: { user },
    isMember,
    isTeamLead
  } = useAuthContext();

  const [state, setState] = useState({
    open: false,
    status: props.status,
  });

  const handleCompleteTask = async () => {
    if (state.status === 'started') {
      await request(`/api/tasks/${props.id}/mark_task_as_completed`, 'PUT');
      setState({
        ...state,
        open: !state.open,
        status: 'completed'
      });
    }
  };

  const formatDate = date => date.split('T')[0].split('-')
    .reverse()
    .join('/')
    .replace(/\/20/g, '/');

  const isAbleToUpdateTask = () => {
    if (isTeamLead || isMember) return true;

    return props.users_for_task.some(u => u.id === user.id);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderUtilityButtons = () => {
    if (isMember || !isAbleToUpdateTask()) return null;

    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: '20ch',
            },
          }}
        >
          <MenuItem
            key={'edit'} onClick={() => {
            props.handleShowPopup(props.id);
            handleClose();
          }}
          >
            <ListItemIcon><EditIcon /></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem
            key={'edit'} onClick={() => {
            props.handleDeleteTask(props.id);
            handleClose();
          }}
          >
            <ListItemIcon><img src={DeleteIcon} alt="Delete" /></ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          {isAbleToUpdateTask() && state.status !== 'completed' && [
            <MenuItem
              key={'edit'} onClick={() => {
              handleCompleteTask();
              handleClose();
            }}
            >
              <ListItemText>Mark Completed</ListItemText>
            </MenuItem>,
            <MenuItem
              key={'send-reminder'}
              onClick={async () => {
                await request(`api/tasks/${props.id}/send_task_reminder`)
                toastr.success('Reminder has been sent!', 'Success')
                handleClose();
              }}>
              <ListItemText>Send Reminders</ListItemText>
            </MenuItem>
          ]}
        </Menu>
      </div>
    );
  };

  const assignedUsers = () => {
    const users = isTeamLead || isMember ? props.members_for_task : props.users_for_task;

    return users
      .map(u => fullNameOrEmail(u))
      .join(', ') || '--';
  };

  return (
    <div className="task">
      <div className="w-full">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <p className={`task-main-title ${props.priority}-priority`}>{props.title}</p>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <div>
              {
                state.status === 'completed' ? (
                  <span>
                Completed
              </span>
                ) : (
                  <span>
                Incomplete
              </span>
                )
              }
            </div>
            <div className="w-auto">
              <p>
                <span className="">Due Date: </span>
                <span className="date">{formatDate(props.due_date)}</span>
              </p>
            </div>
            {renderUtilityButtons()}
          </div>
        </div>
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
    </div>
  );
});

export default TaskItem;
