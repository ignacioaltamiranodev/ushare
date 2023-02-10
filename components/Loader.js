import React from 'react';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
      <div className="lds-dual-ring"></div>;
    </div>
  );
};

export default Loader;
