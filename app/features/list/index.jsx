import React from 'react';
import { connect } from 'react-redux';
import { fetchAsync, documentSelector, isLoadingSelector } from './state/ducks';
import DataTable from '../../components/data-table';

export class List extends React.Component {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { isLoading, documents } = this.props;
    return (
      <React.Fragment>
        <h1> Document list </h1>
        {
            documents ? (<DataTable data={documents} />) : (<span> is loading </span>)
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  documents: documentSelector(state),
  isLoading: isLoadingSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
