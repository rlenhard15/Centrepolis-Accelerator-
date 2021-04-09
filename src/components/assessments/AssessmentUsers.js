import React from 'react';

import { ReactComponent as DeleteIcon } from '../../images/icons/delete-icon.svg';
import Table from '../common/Table';

import './AssessmentUsers.scss'

const headers = [
  {
    title: 'User Name',
    width: '200px',
  },
  {
    title: 'Email',
    width: '24%',
  },
  {
    title: 'Member Status',
    width: '20%',
  },
  {
    title: 'Last Visit',
    width: '20%',
  },
  {
    title: 'Tasks',
    width: '16%',
  },
  {
    width: '2%'
  }
];

export const AssessmentUsers = () => {

  // @TODO: Test data
  const rows = [
    { id: 1,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 2,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 3,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 4,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 5,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 6,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 7,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 8,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 9,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 10,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 11,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 12,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 13,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 14,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 15,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 16,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 17,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 18,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 19,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 20,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 21,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 22,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 23,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 24,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 25,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
    { id: 26,
      row: [<b>Bessie Cooper</b>, 'Carmen0@gmail.com', 'Startup Admin', '06/04/20', '06/04/20', <DeleteIcon />],
    },
  ];

  return (
    <div className="assessment-users">
      <Table headers={headers} rows={rows} itemsName="member" />
    </div>
  );
};

export default AssessmentUsers;
