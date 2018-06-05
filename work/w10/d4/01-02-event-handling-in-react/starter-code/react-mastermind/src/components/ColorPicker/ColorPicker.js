import React from 'react';
import './ColorPicker.css';

const ColorPicker = (props) => {
  return (
    <div className="ColorPicker">
      {props.colors.map((color, idx) =>
        <div
          className="ColorPicker-color"
          style={{
            backgroundColor: props.selColorIdx === idx ? 'white' : color,
            border: props.selColorIdx === idx ? `14px solid ${color}` : false
          }}
          key={color}
          onClick={() => props.handleColorSelection(idx)}
        />
      )}
    </div>
  );
}

export default ColorPicker;
