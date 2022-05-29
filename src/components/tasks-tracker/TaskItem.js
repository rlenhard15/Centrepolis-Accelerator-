import React, { memo, useState } from 'react';
import toastr from 'toastr';
import { ReactComponent as EditIcon } from '../../images/icons/edit-icon.svg';
import DeleteIcon from '../../images/icons/delete-icon.svg';
import { useAuthContext } from '../../utils/context';

import useHttp from '../../hooks/useHttp.hook';

import './TaskItem.scss';
import { fullNameOrEmail } from '../../utils/helpers';
import ThreeDotMenu from '../common/ThreeDotMenu';

const TaskItem = props => {
  const { request } = useHttp();
  const {
    authData: { user },
    isMember,
    isTeamLead,
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
        status: 'completed',
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

  const renderUtilityButtons = () => {
    if (isMember || !isAbleToUpdateTask()) return null;
    const menuItems = [
      {
        text: 'Edit',
        icon: <EditIcon />,
        onClick: () => props.handleShowPopup(props.id),
      },
      {
        text: 'Delete',
        icon: <img src={DeleteIcon} alt="Delete" />,
        onClick: () => props.handleDeleteTask(props.id),
      },
    ];
    if (isAbleToUpdateTask() && state.status !== 'completed') {
      menuItems.push(
        {
          text: 'Mark Completed',
          onClick: () => handleCompleteTask(),
        },
        {
          text: 'Send Reminder',
          onClick: async () => {
            await request(`api/tasks/${props.id}/send_task_reminder`);
            toastr.success('Reminder has been sent!', 'Success');
          },
        },
      );
    }
    return <ThreeDotMenu menuItems={menuItems} />;
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
};

export default memo(TaskItem);
