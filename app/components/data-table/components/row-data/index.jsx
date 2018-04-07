import React from 'react';

export default class RowData extends React.PureComponent {
  render() {
    return (
      <td>{this.props.children}</td>
    );
  }
}
