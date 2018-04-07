import React from 'react';
import Row from '../row';

export default class Body extends React.PureComponent {
  render() {
    return (
      <tbody>
        {this.props.data.map((row, key) => (
            // eslint-disable-next-line
            <Row key={key} data={row} />
        ))}
      </tbody>
    );
  }
}
