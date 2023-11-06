import React, { useState, useEffect } from "react";
import axios from "axios";

const NodesDashboard = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_nodes");
        setNodes(response.data.nodes);
      } catch (error) {
        console.error("Error fetching nodes.");
      }
    };

    fetchNodes();
  }, []);

  return (
    <div>
      <h2 style={{ margin: 0, padding: 10, color: "#fff" }}>
        Registered Nodes
      </h2>
      <ul>
        {nodes.map((node, index) => (
          <li key={index}>{node}</li>
        ))}
      </ul>
    </div>
  );
};

export default NodesDashboard;
