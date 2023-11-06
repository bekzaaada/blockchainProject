import React, { useState } from "react";
import UploadButton from "../components/Button/UploadButton";
import Button from "../components/Button/Button";
import axios from "axios";
import "../assets/main.css";
const Main = () => {
  const [publicKey, setPublicKey] = useState({});
  const [file, setFile] = useState({});
  const [transactionData] = useState({
    transactionNumber: 0,
    additionalInfo: "",
  });

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");


  const handleFileUpload = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setFile(event.target.result);
    };
    reader.readAsText(file);
  };
  const handlePublicKeyUpload = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setPublicKey(event.target.result);
    };

    reader.readAsText(file);
  };


  const sendTransaction = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("public_key", publicKey);
    formData.append("transactionNumber", transactionData.transactionNumber);
    formData.append("add_info", name);
    formData.append("sender", "Beks");
    formData.append("amount", "Beks");
    formData.append("recipient", "Beks");
    try {
      const response = await axios.post(
        "http://192.168.1.121:5000/add_transaction",
        formData
      );
      console.log("Transaction sent:", response.data);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };
  const generateBlock = async () => {
    try {
      const response = await axios.get("http://192.168.1.121:5000/mine_block");
      console.log("New block generated:", response.data);
    } catch (error) {
      console.error("Error generating block:", error);
    }
  };
  return (
    <div className="main">
      <div className="main__block1">
        
        <UploadButton
          text={"IMPORT A FILE"}
          action={(e) => handleFileUpload(e)}
          id="input-file1"
        />
        {file.length > 0 && (
          <p className="message">File has successfully been uploaded</p>
        )}
        <UploadButton
          text={"Upload public key"}
          action={(e) => handlePublicKeyUpload(e)}
          id="input-file2"
        />
        <p></p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          placeholder="Additional info"
        />
        <p></p>
        {publicKey.length > 0 && (
          <p className="message">Public key has successfully been uploaded</p>
        )}
        <Button text={"Send transaction"} onClick={(e) => sendTransaction(e)}  />
        {message && <p className="message">File has successfully added to transaction</p>}

        <Button text={"Generate block"} onClick={(e) => generateBlock(e)} />
      </div>
    </div>
  );
};
export default Main;
