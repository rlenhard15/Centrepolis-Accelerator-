import React, { useEffect, useState } from 'react';
import Table from '../common/Table';
import { useAuthContext } from '../../utils/context';
import useHttp from '../../hooks/useHttp.hook';

import './AssessmentUsers.scss';
import AssessmentUsersRowMenu from './AssessmentUsersRowMenu';

const headers = [
  {
    title: 'User Name',
    width: '150px',
  },
  {
    title: 'Email',
    width: '42%',
  },
  {
    title: 'Member Status',
    width: '20%',
  },
  {
    title: 'Last Visit',
    width: '10%',
  },
  {
    title: 'Tasks',
    width: '7%',
  },
  {
    width: '3%',
  },
];

export function AssessmentUsers({
  members,
  teamLeads,
  startupId,
}) {
  const {
    isSuperAdmin,
    isAdmin,
  } = useAuthContext();
  const { request } = useHttp();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(mapDataToRow());
  }, [members, teamLeads]);

  const mapDataToRow = () => mapMembersData()
    .sort((userA, userB) => new Date(userA.createdAt) - new Date(userB.createdAt));

  const mapMembersData = () => members.map(member => ({
    id: member.id,
    key: member.id,
    createdAt: member.created_at,
    row: [
      getUserName(member),
      member.email,
      teamLeads.find(t => t.id === member.id) ? 'Team Lead' : 'Member',
      member.last_visit ? formatDate(member.last_visit) : '--',
      member.tasks_number,
    ],
  }));

  const getUserName = user => {
    if (!user.first_name) return '--';
    return `${user.first_name} ${user.last_name}`;
  };

  const handleDeleteUser = id => async () => {
    await request(`/api/users/${id}?startup_id=${startupId}`, 'DELETE');
    setRows(rows.filter(r => r.id !== id));
  };

  const handleResendInvite = id => async () => {
    await request(`/users/resend_invite?user_id=${id}`, 'GET');
  };

  const formatDate = timestamp => {
    const date = new Date(timestamp);
    const day = date.getUTCDay();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear()
      .toString()
      .slice(2);

    return `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${year}`;
  };

  const rowsData = isSuperAdmin || isAdmin
    ? rows.map(r => ({
      ...r,
      row: [...r.row, <AssessmentUsersRowMenu
        key={r.id}
        handleResendInvite={handleResendInvite(r.id)}
        handleDeleteUser={handleDeleteUser(r.id)}
      />],
    }))
    : rows;

  return (
    <div className="assessment-users">
      <Table headers={headers} rows={rowsData} itemsName="member" />
    </div>
  );
}

export default AssessmentUsers;
