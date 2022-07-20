import ThreeDotMenu from '../common/ThreeDotMenu';
import DeleteIcon from '../../images/icons/delete-icon.svg';
import React from 'react';

export default function AssessmentUsersRowMenu({
  handleDeleteUser,
  handleResendInvite
}) {
  return (
    <ThreeDotMenu
      menuItems={[
        {
          text: 'Resend Invite',
          onClick: handleResendInvite,
        },
        {
          text: 'Delete',
          icon: <img src={DeleteIcon} alt="Delete" />,
          onClick: handleDeleteUser,
        },
      ]}
    />
  );
}
