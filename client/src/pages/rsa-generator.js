import React from 'react'
import Button from "../components/Button/Button";
import "../assets/generator.css";
import { useState, useEffect } from 'react';

const Generator = () => {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  function generateKey() {
    const fetchData = async () => {
      const response = await fetch("http://192.168.0.106:5000/generate_keys");
      const data = await response.json();
      if (data) {
        setPrivateKey(data.private_key);
        setPublicKey(data.public_key);
      }
    };
    fetchData();
  }

  function downloadKey(keyData, fileName) {
    const blob = new Blob([`${keyData}\n`], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="generator">
      <h1>RSA KEY GENERATOR</h1>
      <Button text="Generate Keys" onClick={generateKey} />
      <div className="key-display">
        <div className="key-section">
          <h2>Public Key</h2>
          <textarea readOnly value={publicKey} />
          <Button text="Download Public Key" onClick={() => downloadKey(publicKey, 'public_key.pem')} />
        </div>
        <div className="key-section">
          <h2>Private Key</h2>
          <textarea readOnly value={privateKey} />
          <Button text="Download Private Key" onClick={() => downloadKey(privateKey, 'private_key.pem')} />
        </div>
      </div>
    </div>
  );
};

export default Generator;
