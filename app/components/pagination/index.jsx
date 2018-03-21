import React from 'react';
import RcPagination from 'rc-pagination';
import './styles.css';
import itemRender from './item-render';

const Pagination = props => (
  <RcPagination
    {...props}
    className="pagination d-flex align-items-center"
    itemRender={itemRender(props)}
    showTitle={false}
  />
);

Pagination.displayName = 'Pagination';

export default Pagination;
