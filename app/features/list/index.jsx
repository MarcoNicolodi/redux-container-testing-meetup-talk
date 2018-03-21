import React from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import Pagination from '../../components/pagination';
import { fetchAsync, setPage, documentSelector, isLoadingSelector, currentPageSelector } from './state/ducks';
import DataTable from '../../components/data-table';

export class List extends React.Component {
  componentDidMount() {
    this.props.fetch();
  }

  handlePageChange(page) {
    this.props.setPage(page);
    this.props.fetch();
  }

  render() {
    const { isLoading, documents } = this.props;
    return (
      <Container>
        <Row>
          <h1> Document list </h1>
        </Row>
        <Row>
          {
            documents ? (<DataTable data={documents} />) : (<span> is loading </span>)
        }
        </Row>
        <Row>
          <Pagination onChange={page => this.handlePageChange(page)} className="pagination" current={this.props.currentPage} total={10} simple pageSize={1} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  documents: documentSelector(state),
  isLoading: isLoadingSelector(state),
  currentPage: currentPageSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchAsync()),
  setPage: page => dispatch(setPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
