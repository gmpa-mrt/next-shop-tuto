import React from 'react';

function Input(props) {
    return (
        <input {...props}
               className="border rounded px-3 py-1 w-80"/>
    );
}

export default Input;