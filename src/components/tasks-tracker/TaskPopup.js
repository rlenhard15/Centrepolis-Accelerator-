import React, { useEffect, useState } from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CustomSelect from '../common/Select';
import Calendar from '../common/Calendar';
import TaskSelectGroup from './TaskSelectGroup';
import { CustomButton } from '../common/Button';
import Loader from '../loader/Loader';

import { ReactComponent as CloseIcon } from '../../images/icons/close-icon.svg';

import useHttp from '../../hooks/useHttp.hook';
import { useAuthContext } from '../../utils/context';

import './TaskPopup.scss';

const priority = [
  {
    value: 'low',
    label: 'Low',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'high',
    label: 'High',
  },
];

function TaskPopup(props) {
  const { isTeamLead } = useAuthContext();

  const {
    loading,
    request,
  } = useHttp();
  const [state, setState] = useState({
    currentAssessment: props.assessments[0],
    selectedUsers: [],
    currentAssessmentInfo: null,
    isChangeAssessment: false,
    riskCategories: [],
    userOptions: [],
    selectedCategory: '',
    selectedSubcategory: '',
    selectedStage: '',
    taskPriority: '',
    dueDate: setDate(),
    taskText: props.taskForEdit ? props.taskForEdit.title : '',
    error: false,
  });

  function setDate() {
    if (props.taskForEdit) {
      return new Date(props.taskForEdit.due_date);
    }
    return '';
  }

  const handleChangeAssessment = e => {
    const currentAssessment = props.assessments.find(assessment => assessment.risk_name === e.target.value);
    if (currentAssessment.risk_name !== state.currentAssessment.risk_name) {
      setState({
        ...state,
        currentAssessment,
        riskCategories: '',
        currentAssessmentInfo: '',
        selectedCategory: '',
        selectedSubcategory: '',
        selectedStage: '',
        isChangeAssessment: true,
      });
    }
    getAssessmentCategoriesInfo(currentAssessment.id);
  };

  const handleChangeSelect = (e, name) => {
    if (name === 'selectedCategory') {
      setState(state => ({
        ...state,
        [name]: e,
        selectedSubcategory: '',
        selectedStage: '',
      }));
    } else if (name === 'selectedSubcategory') {
      setState(state => ({
        ...state,
        [name]: e,
        selectedStage: '',
      }));
    } else {
      setState(state => ({
        ...state,
        [name]: e,
      }));
    }
  };

  const handleDateChange = newDate => {
    setState({
      ...state,
      dueDate: newDate,
    });
  };

  // For checking form on empty fields
  // Field will have error if some of form fields is empty and this field will not have a value
  const checkFields = () => {
    if (
      !state.selectedUsers.length
      || !state.selectedStage
      || !state.taskPriority
      || !state.dueDate
      || !state.taskText) {
      setState({
        ...state,
        error: true,
      });
      return false;
    }
    return true;
  };

  const setSubCategoryAndStage = (selectedSubcategory, selectedStage) => setState({
    ...state,
    selectedSubcategory,
    selectedStage,
  });

  const getAssessmentCategoriesInfo = async assessmentId => {
    if (assessmentId) {
      const assessment = await request(`/api/assessments/${assessmentId}`);
      const userOptions = await getUsersOptions();
      const riskCategories = assessment.description_with_child_models.map(category => ({
        value: category.id,
        label: category.title,
      }));
      setState(state => ({
        ...state,
        currentAssessmentInfo: assessment,
        riskCategories,
        userOptions,
      }));
    }
  };

  const formSubmit = async e => {
    e.preventDefault();

    if (checkFields()) {
      let task;
      const data = {
        stage_id: state.selectedStage.value,
        startup_id: props.startupId,
        title: state.taskText,
        priority: state.taskPriority.value,
        due_date: state.dueDate.toDateString(),
        task_users_attributes: state.selectedUsers.map(({ value }) => ({ user_id: value })),
      };

      props.taskForEdit
        ? task = await request(`/api/tasks/${props.taskForEdit.id}`, 'PUT', { task: { ...data } })
        : task = await request('/api/tasks', 'POST', { task: { ...data } });

      const taskForAdd = {
        ...task,
        category: state.selectedCategory.label,
        sub_category: state.selectedSubcategory.label,
        master_assessment: state.currentAssessment.name,
        stage_title: state.selectedStage.label,
      };

      if (props.infoForCreateTaskFromStage) {
        props.handleClosePopup();
      } else {
        props.taskForEdit
          ? props.handleChangeTask(taskForAdd)
          : props.handleAddTask(taskForAdd);
      }
    }
  };

  const getAssessments = name => {
    const currentAssessmentForTask = props.assessments.find(assessment => assessment.risk_name === name);
    return request(`/api/assessments/${currentAssessmentForTask.id}`);
  };

  const getCategoriesAndSelectedCategory = (assessment, categoryName) => {
    const riskCategories = assessment.description_with_child_models.map(category => ({
      value: category.id,
      label: category.title,
    }));
    const selectedCategory = riskCategories.find(category => category.label === categoryName);
    return {
      riskCategories,
      selectedCategory,
    };
  };

  const setOptionsForEditTask = async () => {
    const taskInfo = props.taskForEdit;
    const assessmentNameForTask = taskInfo.master_assessment.split(' ')[0];
    const userOptions = await getUsersOptions();
    const assessment = await getAssessments(assessmentNameForTask);
    const {
      riskCategories,
      selectedCategory,
    } = getCategoriesAndSelectedCategory(assessment, taskInfo.category);
    const taskPriority = priority.find(p => p.value === taskInfo.priority);

    const assignedUsers = isTeamLead
      ? taskInfo.members_for_task
      : taskInfo.users_for_task;

    const selectedUsers = assignedUsers.map(u => ({
      value: u.id,
      label: `${u.first_name} ${u.last_name}`,
    }));

    setState({
      ...state,
      currentAssessment: {
        name: taskInfo.master_assessment,
        risk_name: assessmentNameForTask,
      },
      userOptions,
      selectedUsers,
      currentAssessmentInfo: assessment,
      riskCategories,
      selectedCategory,
      taskPriority,
    });
  };

  const getUsersOptions = async () => {
    const data = await request(`api/startups/${props.startupId}`);
    return data.members
      .map(member => ({
        value: member.id,
        label: member.first_name ? `${member.first_name} ${member.last_name}` : member.email,
      }));
  };

  const setOptionsForCreateTaskFromStage = async () => {
    const taskInfo = props.infoForCreateTaskFromStage;
    const assessmentNameForTask = props.assessmentName;
    const assessment = await getAssessments(assessmentNameForTask);
    const userOptions = await getUsersOptions();
    const {
      riskCategories,
      selectedCategory,
    } = getCategoriesAndSelectedCategory(assessment, taskInfo.category);

    setState({
      ...state,
      currentAssessment: {
        risk_name: assessmentNameForTask,
      },
      userOptions,
      currentAssessmentInfo: assessment,
      riskCategories,
      selectedCategory,
    });
  };

  useEffect(() => {
    if (props.taskForEdit) {
      setOptionsForEditTask();
    } else if (props.infoForCreateTaskFromStage) {
      setOptionsForCreateTaskFromStage();
    } else {
      getAssessmentCategoriesInfo(props.assessments[0].id);
    }
  }, []);

  return (
    <div className="popup">
      <ClickAwayListener onClickAway={props.handleClosePopup}>
        <div className="popup-content task-popup">
          <p className="popup-content-title">Assign New Task</p>
          <button
            className="popup-close-btn"
            onClick={props.handleClosePopup}
          >
            <CloseIcon />
          </button>
          <form onSubmit={formSubmit}>
            <div className="form-group assessment-types">
              <p className="form-group-title">Master Assessment</p>
              <RadioGroup
                row
                aria-label="position"
                name="assessment"
                value={state.currentAssessment.risk_name}
                onChange={handleChangeAssessment}
              >
                {
                  props.assessments.map((assessment, i) => (
                    <FormControlLabel
                      key={i}
                      className={`radio-field ${state.currentAssessment.risk_name === assessment.risk_name
                        ? 'active'
                        : ''}`}
                      value={assessment.risk_name}
                      control={<Radio color="primary" />}
                      label={assessment.risk_name}
                      labelPlacement="end"
                      disabled={!assessment.id}
                    />
                  ))
                }
              </RadioGroup>
            </div>
            <TaskSelectGroup
              currentAssessmentInfo={state.currentAssessmentInfo}
              riskCategories={state.riskCategories}
              userOptions={state.userOptions}
              selectedUsers={state.selectedUsers}
              selectedCategory={state.selectedCategory}
              selectedSubcategory={state.selectedSubcategory}
              selectedStage={state.selectedStage}
              handleChangeSelect={handleChangeSelect}
              infoForTask={props.taskForEdit || props.infoForCreateTaskFromStage}
              setSubCategoryAndStage={setSubCategoryAndStage}
              isChangeAssessment={state.isChangeAssessment}
              error={state.error}
            />
            <div className="form-row">
              <div className="form-group">
                <CustomSelect
                  isDisable
                  label="Task Priority"
                  placeholder="Select priority"
                  options={priority}
                  value={state.taskPriority}
                  onChange={e => handleChangeSelect(e, 'taskPriority')}
                  error={state.error && !state.taskPriority}
                />
              </div>
              <div className="form-group calendar">
                <p className="form-group-title">Due Date</p>
                <Calendar
                  error={state.error}
                  date={state.dueDate}
                  handleDateChange={handleDateChange}
                />
              </div>
            </div>
            <div className="form-group">
              <p className="form-group-title">Task Text</p>
              <textarea
                className={`${state.error && !state.taskText ? 'error' : ''}`}
                value={state.taskText}
                onChange={e => setState({
                  ...state,
                  taskText: e.target.value,
                })}
              />
            </div>
            <CustomButton
              type="submit"
              label={`${props.taskForEdit ? 'Update Task' : 'Submit Task'}`}
            />
          </form>
          {
            loading && <Loader />
          }
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default TaskPopup;
