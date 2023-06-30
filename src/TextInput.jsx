import React, { useState } from 'react';

const TextInput = ({ handleTextInput }) => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
    handleTextInput(event.target.value);
  };

  return (
		<div className='section'>
    	<textarea  value={text} onChange={handleChange} />
  	</div>
		);
};

export default TextInput;