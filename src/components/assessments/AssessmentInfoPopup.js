import React from 'react'

import AssessmentLink from './AssessmentLink'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import CloseIcon from '../../images/icons/close-icon.svg'

const AssessmentInfo = props => {
  if (props.currentAssessment === 'MRL') {
    return (
      <React.Fragment>
        <p>The Manufacturing Readiness Level is a measure developed by the United States Department of Defense (DOD) to assess the maturity of manufacturing readiness, similar to how technology readiness levels (TRL) are used for technology readiness.</p>
        <p>MRLs are quantitative measures used to assess the maturity of a given technology, component or system from a manufacturing perspective. They are used to provide decision makers at all levels with a common understanding of the relative maturity and attendant risks associated with manufacturing technologies, products, and processes being considered.</p>
        <p>Manufacturing risk identification and management must begin at the earliest stages of technology development, and continue vigorously throughout each stage of a product’s life-cycles.</p>
      </React.Fragment>
    )
  } else if (props.currentAssessment === 'CRL') {
    return <p>The Commercial Readiness Level framework assesses various indicators which influence the commercial and market conditions beyond just the technology maturity. This enables key barriers to be addressed to support the commercialization of a technology.</p>
  } else {
    return (
      <React.Fragment>
        <p>Technology readiness levels are a method for estimating the maturity of technologies during the acquisition phase of a program, developed at NASA during the 1970s. The use of TRLs enables consistent, uniform discussions of technical maturity across different types of technology.</p>
        <p>A technology's TRL is determined during a Technology Readiness Assessment (TRA) that examines program concepts, technology requirements, and demonstrated technology capabilities. TRLs are based on a scale from 1 to 9 with 9 being the most mature technology.</p>
      </React.Fragment>
    )
  }
}

const AssessmentInfoPopup = props => {
  const { currentAssessment, startupId } = props
  const { risk_name } = currentAssessment

  return (
    <div className="popup">
      <ClickAwayListener onClickAway={props.handleCloseInfoPopup}>
        <div className="popup-content info-popup">
          <p className="popup-content-title">{`What is ${risk_name}?`}</p>
          <button
            className="popup-close-btn"
            onClick={props.handleCloseInfoPopup}>
            <img src={CloseIcon} alt="" />
          </button>
          <div className="info-popup-description">
            <AssessmentInfo currentAssessment={risk_name} />
          </div>
          <AssessmentLink
            assessment={currentAssessment}
            startupId={startupId}
          />
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default AssessmentInfoPopup