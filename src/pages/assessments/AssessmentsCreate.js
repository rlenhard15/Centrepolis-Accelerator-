import React from 'react';
import { useHistory } from "react-router-dom";

import AssessmentCategory from './AssessmentsCategory';

import { CustomButton } from '../../components/common/Button';

const AssessmentCreate = props => {
  const history = useHistory();

  const handleChangePage = () => {
    if (props.step < props.settings.length) {
      props.changePage(props.step + 1);
    } else {
      history.push('/')
    }
  }

  return (
    <>
      {
        props.settings.map((setting, i) =>
          props.step === i + 1 &&
          <div
            key={setting.id}
            className="assessment-setting"
            ref={props.settingsBlockRef}
          >
            <p className="assessment-setting-title">{setting.title} Assessment</p>
            {
              setting.sub_categories.map((category, i) =>
                <AssessmentCategory
                  assessmentId={props.assessmentId}
                  categoryId={setting.id}
                  subCategoryId={category.id}
                  userType = {props.userType}
                  key={category.id}
                  {...category}
                  index={i}
                />
              )
            }
          </div>
        )
      }
      <CustomButton
        label={props.step !== 4 ? 'Next' : 'Submit'}
        handleClick={handleChangePage}
      />
    </>
  )
}

export default AssessmentCreate
