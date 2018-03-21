import React from 'react';
import { Table } from 'reactstrap';
import Header from './components/header';
import Body from './components/body';

export default class DataTable extends React.PureComponent {
  render() {
    return (
      <Table responsive>
        <Header data={Object.keys(this.props.data[0].row)} />
        <Body data={this.props.data} />
      </Table>
    );
  }
}

// DataTable.propTypes = {
//     data: PropTypes.arrayOf(PropTypes.shape({
//         onClick: PropTypes.func,
//         row: PropTypes.object,
//     })).isRequired,
// };
