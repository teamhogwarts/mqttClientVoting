import React from 'react';

const headerStyle = {
    textAlign: 'right',
    fontSize: '4em',
    color: 'white',
    paddingRight: '20px'
}
const counterStyle = {
    textAlign: 'center',
    fontSize: '28em',
    color: 'grey'
}
const Counter = ({ background, counter, header }) => (
    <div style={{ backgroundColor: background, margin: '10px', width: '550px'}}>
        <p style={headerStyle}>{header}</p>
        <p style={counterStyle}>{counter}</p>
    </div>
)

export default Counter;
