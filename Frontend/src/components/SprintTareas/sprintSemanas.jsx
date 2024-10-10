/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const SprintSemanas = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (


        <div className="collapse-panel" style={{ marginBottom: '2px' }}>
        <div 
        className="collapse-header" 
        onClick={togglePanel} 
        >
            <span style={{ fontSize: '1.5em', marginRight: '10px' }}>{isOpen ? '>' : '>'}</span>
            <h3 style={{ margin: 0 }}>{title}</h3>
        </div>
        {isOpen && (
                <div className="collapse-content" style={{ padding: '1px' }}>
                {React.Children.map(children, (child) => (
                    <div style={{ marginBottom: '1px' }}>
                        {child}
                    </div>
                ))}
            </div>
        )}
        </div>
    );
};

export default SprintSemanas;
