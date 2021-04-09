import React, { useState, useEffect } from 'react';

import TaskItem from './TaskItem';
import TaskPopup from './TaskPopup';
import { CustomButton } from '../common/Button';
import Pagination from '../common/Pagination';
import Loader from '../loader/Loader';

import useHttp from '../../hooks/useHttp.hook';

import './TasksTracker.scss';

const rowsPerPage = 4;

const TasksTracker = props => {
  const { request } = useHttp();
  const [state, setState] = useState({
    tasks: [],
    taskForUpdate: null,
    showPopup: false,
    loading: true,
    page: 0,
  });

  const handleChangePage = (_event, newPage) => setState({ ...state, page: newPage });

  const currentTasksPage = state.tasks.slice(state.page * rowsPerPage, state.page * rowsPerPage + rowsPerPage);

  const addTask = (newTask) => {
    const updatedTasks = [newTask, ...state.tasks];
    setState({ ...state, tasks: updatedTasks, showPopup: false });
  }

  const changeTask = (updatedTask) => {
    const updatedTasks = [...state.tasks];
    const updatedTaskIndex = updatedTasks.findIndex(task => task.id === updatedTask.id);
    updatedTasks[updatedTaskIndex] = updatedTask;
    setState({ ...state, tasks: updatedTasks, showPopup: false });
  }

  const deleteTask = async (taskId) => {
    await request(`/api/tasks/${taskId}`, 'DELETE');
    const updatedTasks = state.tasks.filter(task => task.id !== taskId);
    setState({ ...state, tasks: updatedTasks });
  }

  const getAllTasksRequest = async () => {
    const tasks = await request(`/api/tasks?customer_id=${props.currentCustomerId}`);
    setState({ ...state, tasks, loading: false });
  }

  const handleShowPopupForEdit = (taskId) => {
    const taskForUpdate = state.tasks.find(task => task.id === taskId);
    setState({
      ...state,
      taskForUpdate,
      showPopup: true
    })
  }

  const showPopupForNewTask = () => setState({
    ...state,
    showPopup: true,
    taskForUpdate: null
  })

  useEffect(() => {
    getAllTasksRequest();
  }, [])

  if (state.loading) return <Loader />

  return (
    <div className="tasks-tracker">
      <div className="tasks-tracker-header">
        <h3>Tasks Dashboard</h3>
        {
          props.userType === 'Admin' ?
            <CustomButton
              label="Assign New Task"
              handleClick={showPopupForNewTask}
            /> : null
        }
      </div>
      <div className="tasks-tracker-content">
        {
          state.tasks.length ?
            currentTasksPage.map(task =>
              <TaskItem
                key={task.id}
                {...task}
                userType={props.userType}
                handleDeleteTask={deleteTask}
                handleShowPopup={handleShowPopupForEdit}
              />) :
            <p className="no-tasks">No tasks yet</p>
        }
        {
          state.tasks.length ?
            <Pagination
              rowsCount={state.tasks.length}
              currentRows={currentTasksPage}
              page={state.page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              itemsName='Task'
              outlined={true}
            /> : null
        }

      </div>
      {
        state.showPopup &&
        <TaskPopup
          assessments={props.assessments}
          currentCustomerId={props.currentCustomerId}
          handleClosePopup={() => setState({ ...state, showPopup: false })}
          handleAddTask={addTask}
          handleChangeTask={changeTask}
          taskForEdit={state.taskForUpdate}
        />
      }
    </div>
  )
}

export default TasksTracker