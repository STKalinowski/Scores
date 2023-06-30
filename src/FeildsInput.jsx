import React, { useState } from 'react';

const FieldsInput = ({ handleFieldsInput }) => {
  const [fields, setFields] = useState(['']);

  const handleInputChange = (index, event) => {
    const values = [...fields];
    values[index] = event.target.value;
    setFields(values);
    handleFieldsInput(values);
  };

  const handleAddField = () => {
    setFields([...fields, '']);
  };

	const handleDeleteField = (index) => {
    let newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  return (
    <div className='section'>
			<h3>Fields:</h3>
      {fields.map((field, idx) => (
        <div key={`div-${idx}`}>
          <input 
            key={`field-${idx}`} 
            value={field} 
						type='text'
            onChange={event => handleInputChange(idx, event)}
          />
          <button 
            key={`delete-${idx}`} 
            onClick={() => handleDeleteField(idx)}
          >
            x
          </button>
        </div>
      ))}
      <button onClick={handleAddField}>Add field</button>
    </div>
  );
};

export default FieldsInput;

