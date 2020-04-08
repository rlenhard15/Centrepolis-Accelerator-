import React from 'react';

import AssessmentCategory from './AssessmentsCategory';

const AssessmentCreate = props => {
  return (
    <>
      <div
        className="assessment-setting"
        ref={props.settingsBlockRef}
      >
        <p className="assessment-setting-title">{props.subCategories.title} Assessment</p>
        {
          props.subCategories.sub_categories.map((category, i) =>
            <AssessmentCategory
              key={category.sub_category_id}
              assessmentId={props.assessmentId}
              categoryId={props.subCategories.id}
              subCategoryId={category.sub_category_id}
              userType={props.userType}
              {...category}
              index={i}
            />
          )
        }
      </div>
    </>
  )
}

export default AssessmentCreate
