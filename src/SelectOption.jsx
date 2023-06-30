import React, { useState, useEffect } from 'react';

const SelectComponent = ({ options, selected, setSelected }) => {
    const handleChange = (event) => {
				setSelected(event.target.value);
    };

    return (
        <div style={{maxWidth:'120px'}}>
            <select value={selected} onChange={handleChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectComponent;
