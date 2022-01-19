import React from 'react'

import AssessmentCategory from './AssessmentsCategory'

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
            startupId={props.startupId}
            key={category.sub_category_id}
            assessmentId={props.assessmentId}
            assessmentName={props.assessmentName}
            categoryId={props.subCategories.id}
            categoryName={props.subCategories.title}
            subCategoryId={category.sub_category_id}
            assessments={props.assessments}
          />
        )
      }
      {props.assessmentName === "CRL" && (
        <>
          <p className="assessment-additional-info">Courtesy of Michigan Small Business Development Center (complimentary licence for this software for Innovation Centers)</p>
          {props.subCategories?.title === "IP Risk" && (
            <p className="assessment-additional-info">(Patents, Trademarks, Copyright & Trade secrets)</p>
          )}
        </>
      )}
    </div>
  )
}

export default AssessmentsSettings
