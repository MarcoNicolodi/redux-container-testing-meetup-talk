import React from 'react';

const Title = (props) => {
  const { totalQuantity } = props;
  return (
    <div>
      <h1>
                Documents
      </h1>
      <p>
        {totalQuantity}
      </p>
    </div>
  );
};

export default Title;
