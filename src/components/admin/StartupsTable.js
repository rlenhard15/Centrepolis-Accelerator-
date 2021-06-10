import React from 'react'
import { Link } from 'react-router-dom'

import Table from '../common/Table'
import RowMenu from './StartupsTableRowMenu'

import './StartupsTable.scss'

const headers = [
  {
    title: 'Admins',
    width: '18%',
  },
  {
    title: 'Company Name',
    width: '16%',
  },
  {
    title: 'Startup Admins',
    width: '17%',
  },
  {
    title: 'CRL Assesment',
    width: '15%',
  },
  {
    title: 'TRL Assesment',
    width: '15%',
  },
  {
    title: 'MRL Assesment',
    width: '15%',
  },
  {
    width: '4%'
  }
]


const StartupsTable = ({ startupsData }) => {
  const rows = mapStartupsToRow(startupsData.startups)

  return (
    <div className="startups-table">
      <Table headers={headers} rows={rows} itemsName="companies" />
    </div>
  )
}

const mapStartupsToRow = startups => startups.map(startup => ({
  id: startup.id,
  row: [
    getUsersNames(startup.admins),
    <Link to={`/assessments/${startup.id}`} className="startups-link">
      {startup.name}
    </Link>,
    <div className="startups-st-admins">
      {getUsersNames(startup.startup_admins)}
    </div>,
    formAssessmentRisk(startup.assessments_risk_list, 'CRL'),
    formAssessmentRisk(startup.assessments_risk_list, 'TRL'),
    formAssessmentRisk(startup.assessments_risk_list, 'MRL'),
    <RowMenu />,
  ]
}))

const getUsersNames = users => {
  if (!users.length) return '--'

  return users
    .filter(u => u.first_name)
    .map(u => <React.Fragment key={u.id}><span>{u.first_name} {u.last_name}</span><br /></React.Fragment>)
}

const formAssessmentRisk = (assessmentsRiskList, riskName) => {
  const riskValue = assessmentsRiskList
    ?.find(risk => risk.assessment.split(' ')[0] === riskName)
    ?.risk_value

  if (!riskValue) return <span className="no-assessment">Incomplete</span>

  if (riskValue <= 33) {
    return <span className="have-assessment high">High risk</span>
  } else if (riskValue > 33 && riskValue <= 66) {
    return <span className="have-assessment medium">Medium risk</span>
  } else {
    return <span className="have-assessment low">Low risk</span>
  }
}

export default StartupsTable
