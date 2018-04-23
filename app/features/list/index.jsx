import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";
import NoResults from "../../components/no-results";
import Filter from "./components/filter";
import {
  fetchAsync,
  setPage,
  setFilter,
  documentSelector,
  isLoadingSelector,
  currentPageSelector,
  errorSelector,
  totalPagesSelector,
  filterSelector
} from "./state/ducks";
import DataTable from "../../components/data-table";
import Alert from "../../components/alert";

export class List extends React.Component {
  componentDidMount() {
    this.props.fetch();
  }

  handlePageChange(page) {
    this.props.setPage(page);
    this.props.fetch();
  }

  handleFilterSubmit(value) {
    this.props.setFilter(value);
    this.props.fetch();
  }

  render() {
    const { isLoading, documents, error } = this.props;
    let render;
    if (isLoading) {
      render = <Loader />;
    } else if (error) {
      render = <Alert level={error.level}> {error.message} </Alert>;
    } else if (Array.isArray(documents) && documents.length > 0) {
      render = <DataTable data={documents} />;
    } else {
      render = <NoResults />;
    }

    return (
      <Container>
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col md="9">
            <h1> Document list </h1>
          </Col>
          <Col md="3">
            <Filter onSubmit={filter => this.handleFilterSubmit(filter)} />
          </Col>
        </Row>
        <Row>{render}</Row>
        <Row>
          <Pagination
            onChange={page => this.handlePageChange(page)}
            className="pagination"
            current={this.props.currentPage}
            total={this.props.totalPages}
            simple
            pageSize={1}
          />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  documents: documentSelector(state),
  isLoading: isLoadingSelector(state),
  error: errorSelector(state),
  currentPage: currentPageSelector(state),
  totalPages: totalPagesSelector(state),
  filter: filterSelector(state)
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchAsync()),
  setPage: page => dispatch(setPage(page)),
  setFilter: filter => dispatch(setFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
