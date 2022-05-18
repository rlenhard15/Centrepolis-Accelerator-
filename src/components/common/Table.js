import React from 'react';

import Pagination from './Pagination';

import './Table.scss';

function Table(props) {
  const {
    headers,
    rows,
    rowsPerPage: rowsPerPageFromProps,
    itemsName,
  } = props;
  const [page, setPage] = React.useState(0);

  const defaultRowsPerPage = 10;
  const rowsPerPage = rowsPerPageFromProps || defaultRowsPerPage;
  const rowsToDisplay = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (_event, newPage) => setPage(newPage);

  const getStyleByIndex = index => ({ width: headers[index]?.width });

  return (
    <div className="custom-table">
      <div className="custom-table-head">
        <ul>
          {headers.map(({
            title,
            width,
          }, headerIndex) => <li key={headerIndex} style={{ width }}>{title}</li>)}
        </ul>
      </div>
      <div className="custom-table-body">
        <ul>
          {rowsToDisplay.map(({
            id,
            row,
          }) => (
            <li key={id} className="custom-table-body-row">
              <ul>
                {row.map((content, contentIndex) => (
                  <li key={contentIndex} style={getStyleByIndex(contentIndex)}>
                    {content}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <Pagination
          rowsCount={props.rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          itemsName={itemsName}
        />
      </div>
    </div>
  );
}

export default Table;
