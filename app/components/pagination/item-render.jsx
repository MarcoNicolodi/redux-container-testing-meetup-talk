import React from 'react';
import classNames from 'classnames';

const itemRender = props => (page, type, element) => {
  if (type === 'prev') {
    const disabled = page === 0;
    const className = classNames('btn btn-pagination', { disabled });
    return (
      <button
        type="button"
        id="pagination-previous-button"
        className={className}
        disabled={disabled}
      >
                prev
      </button>
    );
  }
  if (type === 'next') {
    const disabled = props.current === props.total;
    const className = classNames('btn btn-pagination', { disabled });
    return (
      <button
        type="button"
        id="pagination-next-button"
        className={className}
        disabled={disabled}
      >
                next
      </button>
    );
  }
  return element;
};

export default itemRender;
