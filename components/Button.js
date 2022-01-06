import React from 'react';

function Button({ type, children }) {
    return (
        <button type={type}
                className="bg-green-800 text-gray-100 px-4 py-2 rounded hover:bg-green-700 my-2">
            {children}
        </button>
    );
}

export default Button;