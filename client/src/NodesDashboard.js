import React, { useState, useEffect } from "react";
import axios from "axios";

const NodesDashboard = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await axios.get("http://192.168.1.108:5000/get_nodes");
        setNodes(response.data.nodes);
      } catch (error) {
        console.error("Error fetching nodes.");
      }
    };

    fetchNodes();
  }, []);

  return (
    <div style={{display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: 'center'}}>
      <h2 style={{ margin: 0, padding: 10, color: "#fff" }}>
        Registered Nodes
      </h2>
      <ol>
        {nodes.map((node, index) => (
          <li key={index} style={{color: '#fff'}}>{node}</li>
        ))}
      </ol>
    </div>
  );
};

export default NodesDashboard;
