import React from 'react';
import './Textbox.css';

function Textbox(props: any) {
  const handleEnter = (e: any) => {
    if ((e.charCode || e.keyCode) === 13) {
      props.onInput(e.target.value);
    }
  }
  return (
    <input placeholder={props.placeholder} onKeyPress={handleEnter} className="Textbox" type="text" />
  );
}

export default Textbox;
