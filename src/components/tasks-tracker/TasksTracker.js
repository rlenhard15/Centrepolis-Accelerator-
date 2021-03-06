import React, { useEffect, useState } from 'react';
import toastr from 'toastr';

import TaskItem from './TaskItem';
import TaskPopup from './TaskPopup';
import { CustomButton } from '../common/Button';
import Pagination from '../common/Pagination';
import Loader from '../loader/Loader';
import { useAuthContext } from '../../utils/context';

import useHttp from '../../hooks/useHttp.hook';

import './TasksTracker.scss';

function TasksTracker(props) {
  const { request } = useHttp();
  const { isMember } = useAuthContext();

  const [state, setState] = useState({
    tasks: [],
    taskForUpdate: null,
    showPopup: false,
    loading: true,
    page: 0,
  });

  const handleChangePage = async (_event, newPage) => {
    await getAllTasksRequest(newPage + 1);
    setState(oldState => ({
      ...oldState,
      page: newPage,
    }));
  };

  const addTask = async () => {
    await getAllTasksRequest(state.page + 1);
    setState(oldState => ({
      ...oldState,
      showPopup: false,
    }));
    toastr.success('Task has been created', 'Success');
  };

  const changeTask = async () => {
    await getAllTasksRequest(state.page + 1);
    setState(oldState => ({
      ...oldState,
      showPopup: false,
    }));
    toastr.success('Task has been updated', 'Success');
  };

  const deleteTask = async taskId => {
    await request(`/api/tasks/${taskId}`, 'DELETE');
    if (state.tasks.length === 1 && state.totalPages > 1) {
      await getAllTasksRequest(state.page);
    } else {
      await getAllTasksRequest(state.page + 1);
    }
    toastr.success('Task has been removed', 'Success');
  };

  const getAllTasksRequest = async (page = 1) => {
    const {
      total_pages: totalPages,
      tasks,
    } = await request(`/api/tasks?startup_id=${props.startupId}&page=${page}`);
    setState(oldState => ({
      ...oldState,
      tasks,
      totalPages,
      loading: false,
    }));
  };

  const handleShowPopupForEdit = taskId => {
    const taskForUpdate = state.tasks.find(task => task.id === taskId);
    setState({
      ...state,
      taskForUpdate,
      showPopup: true,
    });
  };

  const showPopupForNewTask = () => setState({
    ...state,
    showPopup: true,
    taskForUpdate: null,
  });

  useEffect(() => {
    getAllTasksRequest();
  }, []);

  if (state.loading) return <Loader />;

  return (
    <div className="tasks-tracker mt-8">
      <div className="tasks-tracker-header">
        <h3>Tasks Dashboard</h3>
        {!isMember
          ? (
            <CustomButton
              label="Assign New Task"
              handleClick={showPopupForNewTask}
            />
          ) : null}
      </div>
      <div className="tasks-tracker-content space-y-4">
        {
          state.tasks.length
            ? state.tasks.map(task => (
              <TaskItem
                key={task.id}
                {...task}
                userType={props.userType}
                handleDeleteTask={deleteTask}
                handleShowPopup={handleShowPopupForEdit}
              />
            ))
            : <p className="no-tasks">No tasks yet</p>
        }
        {
          state.totalPages > 1
            ? (
              <Pagination
                page={state.page}
                totalPages={state.totalPages}
                handleChangePage={handleChangePage}
                itemsName="Task"
                outlined
              />
            ) : null
        }

      </div>
      {
        state.showPopup
        && (
          <TaskPopup
            assessments={props.assessments}
            handleClosePopup={() => setState({
              ...state,
              showPopup: false,
            })}
            handleAddTask={addTask}
            handleChangeTask={changeTask}
            taskForEdit={state.taskForUpdate}
            startupId={props.startupId}
          />
        )
      }
    </div>
  );
}

export default TasksTracker;
