import React from 'react';

interface DataProps {
  data: string;
}

const CardElement: React.FC<DataProps> = ({ data }) => {
  return (
    <div className="card">
      <p>{data}</p>
    </div>
  );
};

export default CardElement;
