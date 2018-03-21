import React from 'react';
import RowData from '../row-data';

export default class Row extends React.PureComponent {
  render() {
    const onClick = this.props.data.onRowClick
      ? () => this.props.data.onRowClick()
      : () => undefined;

    return (
      <tr
        onClick={onClick}
      >
        {Object.keys(this.props.data.row).map(property => (
          <RowData key={property}>
            {this.props.data.row[property]}
          </RowData>
        ))}
      </tr>
    );
  }
}
