import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(event) {
    const { value } = event.target;
    if (event.keyCode === 13) {
      this.props.onSubmit(value);
    }
  }

  render() {
    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroupText>
        </InputGroupAddon>
        <Input id="filter-input" onKeyUp={this.onKeyUp} placeholder="Search" />
      </InputGroup>
    );
  }
}
