import React from "react";

class ConditionalRender extends React.Component {
  render() {
    const { render, fallback, condition } = this.props;
    const shouldRender = !!condition;
    const hasFallback = fallback !== undefined;
    return shouldRender ? render() : hasFallback ? fallback() : null;
  }
}

ConditionalRender.displayName = "ConditionalRender";

export default ConditionalRender;
