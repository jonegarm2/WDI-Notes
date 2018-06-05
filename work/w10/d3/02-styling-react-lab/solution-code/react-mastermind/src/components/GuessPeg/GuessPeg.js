import React from 'react';

const GuessPeg = (props) => {
  let style = {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: '50%',
    backgroundColor: props.color,
    opacity: 0.85
  };

  return (
    <div style={style} />
  );
}

export default GuessPeg;
