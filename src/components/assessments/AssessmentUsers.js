import React from 'react'

import { ReactComponent as DeleteIcon } from '../../images/icons/delete-icon.svg'
import Table from '../common/Table'
import { useAuthContext } from '../../CheckAuthorization'
// import useHttp from '../../hooks/useHttp.hook'

import './AssessmentUsers.scss'

const headers = [
  {
    title: 'User Name',
    width: '150px',
  },
  {
    title: 'Email',
    width: '34%',
  },
  {
    title: 'Member Status',
    width: '20%',
  },
  {
    title: 'Last Visit',
    width: '15%',
  },
  {
    title: 'Tasks',
    width: '10%',
  },
  {
    width: '3%'
  }
]

export const AssessmentUsers = ({ members, startupAdmins }) => {
  const { isSuperAdmin } = useAuthContext()
  // const { request } = useHttp()

  const mapDataToRow = () => {
    return mapMembersData()
      .concat(mapAdminsData())
      .sort((userA, userB) => new Date(userA.createdAt) - new Date(userB.createdAt))
  }

  const mapMembersData = () => {
    return members.map(member => ({
      id: member.id,
      createdAt: member.created_at,
      row: [
        getUserName(member),
        member.email,
        'Member',
        member.last_visit ? formatDate(member.last_visit) : '--',
        member.tasks_number,
      ]
    }))
  }

  const mapAdminsData = () => {
    return startupAdmins.map(admin => ({
      id: admin.id,
      createdAt: admin.created_at,
      row: [
        getUserName(admin),
        admin.email,
        'Startup Admin',
        admin.last_visit ? formatDate(admin.last_visit) : '--',
        admin.tasks_number,
        isSuperAdmin && <DeleteIcon />,
      ]
    }))
  }

  const getUserName = (user) => {
    if (!user.first_name) return '--'
    return `${user.first_name} ${user.last_name}`
  }

  const handleDeleteAdmin = async (id) => {
    // TODO
    // await request(`/api/admins/${id}`)
  }

  const formatDate = timestamp => {
    const date = new Date(timestamp)
    const day = date.getUTCDay()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear().toString().slice(2)

    return `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${year}`
  }

  return (
    <div className="assessment-users">
      <Table headers={headers} rows={mapDataToRow()} itemsName="member" />
    </div>
  )
}

export default AssessmentUsers
