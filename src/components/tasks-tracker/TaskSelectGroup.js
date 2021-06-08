import React, { useState, useEffect } from 'react'
import CustomSelect from '../common/Select'

const TaskSelectGroup = props => {

  const [state, setState] = useState({
    currentCategory: [],
    riskSubcategories: [],
    riskStages: [],
  })

  const setCategory = (selectedCategory, selectedSubCategory = null) => {
    const currentCategory = props.currentAssessmentInfo.description_with_child_models.find(category => category.title === selectedCategory)
    const riskSubcategories = currentCategory.sub_categories.map(subCategory => ({ value: subCategory.id, label: subCategory.title }))

    // Set subcategory and stage for edit task or create task from update assessment page
    if (selectedSubCategory) {
      const riskStages = getSubCategories(currentCategory, selectedSubCategory)
      const subCategoryForTask = riskSubcategories.find(category => category.label === selectedSubCategory)
      const stageForTask = riskStages.find(stage => stage.label === props.infoForTask.stage_title)
      setState(state => ({ ...state, currentCategory, riskSubcategories, riskStages }))
      props.setSubCategoryAndStage(subCategoryForTask, stageForTask)
      return
    }
    setState({ ...state, currentCategory, riskSubcategories, riskStages: [] })
  }

  const getSubCategories = (currentCategory, selectedSubCategory) => {
    const currentSubCategory = currentCategory.sub_categories.find(sub_category => sub_category.title === selectedSubCategory)
    return currentSubCategory.stages.map(stage => ({ value: stage.id, label: stage.title }))
  }

  const setSubCategory = selectedSubCategory => {
    const riskStages = getSubCategories(state.currentCategory, selectedSubCategory)
    setState({ ...state, riskStages })
  }

  const handleUserChange = e => {
    props.handleChangeSelect(e, 'selectedUser')
  }

  const handleCategoryChange = e => {
    setCategory(e.label)
    props.handleChangeSelect(e, 'selectedCategory')
  }

  const handleSubCategoryChange = e => {
    setSubCategory(e.label)
    props.handleChangeSelect(e, 'selectedSubcategory')
  }

  const handleStageChange = e => {
    props.handleChangeSelect(e, 'selectedStage')
  }

  useEffect(() => {
    if (!props.riskCategories.length) {
      setState({
        riskSubcategories: [],
        riskStages: [],
      })
    }

    if (props.infoForTask && props.currentAssessmentInfo && !props.isChangeAssessment) {
      setCategory(props.infoForTask.category, props.infoForTask.sub_category)
    }
  }, [props.riskCategories, props.currentAssessmentInfo])

  return (
    <>
      <CustomSelect
        isDisable={true}
        label="Assign to"
        placeholder='Assign to'
        options={props.userOptions}
        onChange={handleUserChange}
        value={props.selectedUser}
        isDisabled={!props.userOptions.length}
        error={props.error && !props.selectedUser}
      />
      <CustomSelect
        isDisable={true}
        label="Risk Category"
        placeholder='Select risk category'
        options={props.riskCategories}
        onChange={handleCategoryChange}
        value={props.selectedCategory}
        isDisabled={!props.riskCategories.length}
        error={props.error && !props.selectedCategory}
      />
      <CustomSelect
        isDisable={true}
        label="Risk Subсategory"
        placeholder='Select or enter risk subcategory'
        options={state.riskSubcategories}
        onChange={handleSubCategoryChange}
        value={props.selectedSubcategory}
        isDisabled={!state.riskSubcategories.length}
        error={props.error && !props.selectedSubcategory}
      />
      <CustomSelect
        isDisable={true}
        label="Risk Stage"
        placeholder='Select or enter risk stage'
        options={state.riskStages}
        onChange={handleStageChange}
        value={props.selectedStage}
        isDisabled={!state.riskStages.length}
        error={props.error && !props.selectedStage}
      />
    </>
  )
}

export default TaskSelectGroup
