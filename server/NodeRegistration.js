import React, { useState } from "react";
import axios from "axios";
import "../assets/main.css";


const NodeRegistration = () => {
  const [nodeAddress, setNodeAddress] = useState("");
  const [message, setMessage] = useState("");

    const registerNode = async () => {
        try {
            const response = await axios.post('http://192.168.0.106/register_node', { node_address: nodeAddress });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error registering node.');
        }
    };

  return (
    <div>
      <input
        type="text"
        className="input"
        placeholder="Enter node address"
        value={nodeAddress}
        onChange={(e) => setNodeAddress(e.target.value)}
      />
      <button onClick={registerNode}>Register Node</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NodeRegistration;
