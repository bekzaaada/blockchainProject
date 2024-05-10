import React, { useState } from 'react';
import axios from 'axios';

const NodeRegistration = () => {
    const [nodeAddress, setNodeAddress] = useState('');
    const [message, setMessage] = useState('');

    const registerNode = async () => {
        try {
            const response = await axios.post('http://192.168.0.106:5000/register_node', { node_address: nodeAddress });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error regi tering node.');
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, paddingTop: 10}}>
            <input 
                type="text" 
                placeholder="Enter node address" 
                value={nodeAddress}
                onChange={(e) => setNodeAddress(e.target.value)}
                className='input'
            />
            <button onClick={registerNode} className='btn' >Register Node</button>
            {message && <p style={{color: '#fff'}}>{message}</p>}
        </div>
    );
};

export default NodeRegistration;
