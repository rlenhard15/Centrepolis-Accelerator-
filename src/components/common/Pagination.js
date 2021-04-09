import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import FirstPageRoundedIcon from '@material-ui/icons/FirstPageRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import LastPageRoundedIcon from '@material-ui/icons/LastPageRounded';

import './Pagination.scss';

const Pagination = props => {
  const { rows, page, rowsPerPage, handleChangePage, outlined } = props;
  const count = rows.length;

  const handleFirstPageButtonClick = event => {
    handleChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    handleChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    handleChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    handleChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={`pagination-wrapper ${outlined  ? 'outlined' : ''}`}>
      <div className="pagination-items-counter">
        {rows.length} {rows.length > 1 ? props.itemsName + 's' : props.itemsName}
      </div>
      <div className="pagination-wrapper-common">
        {
          rows.length > rowsPerPage ?
            <>
              <div className="pagination-pages-counter">
                {`${rows.length === 0 ? 0 : page + 1} of ${Math.ceil(count / rowsPerPage)}`}
              </div>
              <div className="pagination-arrows">
                <IconButton
                  onClick={handleFirstPageButtonClick}
                  disabled={page === 0}
                  aria-label="first page"
                >
                  <FirstPageRoundedIcon />
                </IconButton>
                <IconButton
                  onClick={handleBackButtonClick}
                  disabled={page === 0}
                  aria-label="previous page">
                  <ChevronLeftRoundedIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextButtonClick}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label="next page"
                >
                  <ChevronRightRoundedIcon />
                </IconButton>
                <IconButton
                  onClick={handleLastPageButtonClick}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label="last page"
                >
                  <LastPageRoundedIcon />
                </IconButton>
              </div>
            </> : null
        }

      </div>
    </div>
  );
}

export default Pagination