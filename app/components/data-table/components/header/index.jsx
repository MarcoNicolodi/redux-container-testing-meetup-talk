import React from 'react';

export default class Header extends React.PureComponent {
  render() {
    return (
      <thead>
        <tr>
          {this.props.data.map(header => (
            <th key={header}>{header}</th>
            ))}
        </tr>
      </thead>
    );
  }
}

