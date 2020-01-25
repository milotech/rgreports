import React from 'react';

import './Input.css';

export default function Input({ name, value, onChange, dropDownValues }) {
    return (
        <div className="Input">
            <input type="text" autoComplete="off" name={name} value={value} onChange={onChange} />
        </div>
    )
}