import React from 'react';

import AssessmentCategory from './AssessmentsCategory';

const AssessmentsSettings = props => {
  return (
    <div
      className="assessment-setting"
      ref={props.settingsBlockRef}
    >
      <p className="assessment-setting-title">{props.subCategories.title} Assessment</p>
      {
        props.subCategories.sub_categories.map((category, i) =>
          <AssessmentCategory
            {...category}
            index={i}
            key={category.sub_category_id}
            assessmentId={props.assessmentId}
            assessmentName={props.assessmentName}
            customerId={props.customerId}
            categoryId={props.subCategories.id}
            categoryName={props.subCategories.title}
            subCategoryId={category.sub_category_id}
            userType={props.userType}
            assessments={props.assessments}
          />
        )
      }
    </div>
  )
}

export default AssessmentsSettings
