import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AssessmentCategory from './AssessmentsCategory';
import { CustomButton } from '../../components/common/Button';

function AssessmentsSettings(props) {
  const navigate = useHistory();
  const [currentStep, setCurrentStep] = useState(0);
  const currentIndex = props.categories.map(c => c.id)
    .indexOf(props.activeCategory);
  const isLastStep = currentStep + 1 === props.subCategories.sub_categories.length;
  const isLastCategory = currentIndex + 1 === props.categories.length;
  useEffect(() => {
    setCurrentStep(0);
  }, [props.activeCategory]);
  const category = props.subCategories.sub_categories[currentStep];
  if (!category) {
    return null;
  }
  return (
    <div
      className="assessment-setting"
      ref={props.settingsBlockRef}
    >
      <div className="flex flex-row justify-between items-center">
        <p className="assessment-setting-title">{props.subCategories.title} Assessment</p>
      </div>
      <AssessmentCategory
        {...category}
        index={currentStep}
        startupId={props.startupId}
        key={category.sub_category_id}
        assessmentId={props.assessmentId}
        assessmentName={props.assessmentName}
        categoryId={props.subCategories.id}
        categoryName={props.subCategories.title}
        subCategoryId={category.sub_category_id}
        assessments={props.assessments}
      />
      <div className="flex flex-row justify-between mb-4">
        <div>
          {
            currentStep > 0 && (
              <CustomButton
                label="Back"
                handleClick={() => setCurrentStep(currentStep - 1)}
              />
            )
          }
        </div>
        <CustomButton
          label={isLastCategory && isLastStep ? 'Complete Assessment' : 'Next'}
          handleClick={() => {
            if (isLastStep) {
              if (isLastCategory) {
                navigate.push(`/assessments/${props.startupId}`);
              } else {
                props.changeSubCategory(props.categories[currentIndex + 1].id);
              }
            } else {
              setCurrentStep(currentStep + 1);
            }
          }}
        />
      </div>
      {props.assessmentName === 'CRL' && (
        <>
          <p className="assessment-additional-info text-xs">* Courtesy of Michigan Small Business
            Development
            Center (complimentary licence for this software for Innovation Centers)</p>
          {props.subCategories?.title === 'IP Risk' && (
            <p className="assessment-additional-info text-xs">* (Patents, Trademarks, Copyright &
              Trade
              secrets)</p>
          )}
        </>
      )}
    </div>
  );
}

export default AssessmentsSettings;
