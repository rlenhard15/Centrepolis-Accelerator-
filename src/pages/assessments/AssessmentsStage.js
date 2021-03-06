import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { useAuthContext } from '../../utils/context';

import './AssessmentsStage.scss';

function AssessmentsStage(props) {
  const { isMember } = useAuthContext();

  const changeProgressByClick = () => {
    props.handleChangeProgress(props.index);
    props.updateProgressRequest(props.index);
  };

  const stageInfo = {
    category: props.categoryName,
    sub_category: props.subCategoryName,
    stage_title: props.title,
  };

  const colorScheme = ['#FF5D54', '#FFD865', '#68B643'];
  const stageTypeCount = 3;
  const typesOfStageCount = Math.round(props.stagesCount / stageTypeCount);

  const setCircleBackground = currentTypeNumber => {
    let firstColorSetting;
    let secondColorSetting;
    let
      thirdColorSetting;
    const startPositionWithType = typesOfStageCount - props.index;
    const middlePositionWithType = props.index - typesOfStageCount;

    if (currentTypeNumber === 1) {
      if (props.index === 0) return `${colorScheme[0]}`;
      firstColorSetting = `${colorScheme[0]} -50px,`;
      secondColorSetting = `${colorScheme[1]} ${100 * startPositionWithType}px`;
    } else if (currentTypeNumber === 2) {
      if (props.stagesCount <= 6) {
        firstColorSetting = `${colorScheme[0]} -150px,`;
        secondColorSetting = `${colorScheme[1]} ${30 / props.index}px`;
        thirdColorSetting = `, ${colorScheme[2]} ${150 / props.index}px`;
      } else {
        firstColorSetting = `${colorScheme[0]} -150px,`;
        secondColorSetting = `${colorScheme[1]} ${100 / props.index}px`;
        thirdColorSetting = middlePositionWithType > 1
          ? `, ${colorScheme[2]} ${100 / middlePositionWithType}px`
          : '';
      }
    } else {
      if (props.index === props.stagesCount - 1) return `${colorScheme[2]}`;
      firstColorSetting = `${colorScheme[1]} -50px`;
      secondColorSetting = `, ${colorScheme[2]} ${100 / middlePositionWithType}px`;
    }
    return `linear-gradient(90deg, ${firstColorSetting || ''} ${secondColorSetting || ''} ${thirdColorSetting || ''})`;
  };

  const setCircleStyle = () => {
    const style = {};

    if (props.isCurrentStage) style.display = 'none';

    if (props.index < typesOfStageCount) {
      props.isActive
        ? style.background = setCircleBackground(1)
        : style.borderColor = colorScheme[0];
    } else if (props.index < typesOfStageCount * 2) {
      props.isActive
        ? style.background = setCircleBackground(2)
        : style.borderColor = colorScheme[1];
    } else {
      props.isActive
        ? style.background = setCircleBackground(3)
        : style.borderColor = colorScheme[2];
    }
    return style;
  };

  return (
    <>
      {
        props.trackWidth
          ? (
            <div
              key={props.id}
              className={`stages-item ${props.isActive ? 'active' : ''}`}
            >
              <span
                className={`stages-item-circle click stage-${props.index}`}
                onClick={changeProgressByClick}
                style={setCircleStyle()}
              />
              <span
                className="stages-item-line"
                style={{ width: props.trackWidth.clientWidth / props.stagesCount + 10 }}
              />
              <span className="stages-item-text">{props.title}</span>
              {
                !isMember
                  ? (
                    <IconButton
                      className="stages-item-btn"
                      disabled={props.isActive}
                      onClick={() => props.handleShowAddTaskPopup(stageInfo)}
                    >
                      <span className="add-icon" />
                    </IconButton>
                  ) : null
              }
            </div>
          ) : null
      }
    </>
  );
}

export default AssessmentsStage;
