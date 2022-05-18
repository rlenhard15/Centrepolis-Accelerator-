import React, { useState } from 'react';

import './AssessmentsSlider.scss';

function AssessmentSlider(props) {
  const [value, setValue] = useState(props.activeStageIndex);

  const handleChange = e => {
    setValue(e.target.value);
    props.handleChangeProgress(+e.target.value);
  };

  const handleMouseUp = () => props.updateProgressRequest(+value);

  return (
    <div className="range">
      <input
        type="range"
        min="0"
        max={props.steps - 1}
        step="1"
        value={props.activeStageIndex}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}

export default AssessmentSlider;
