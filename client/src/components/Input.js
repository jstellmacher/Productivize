import React from 'react';

const Input = ({ input }) => {
  return (
    <div>
      <label>{input.label}</label>
      <input
        type="text"
        value={input.value}
        placeholder={input.placeholder}
        readOnly
      />
    </div>
  );
};

export { Input };
