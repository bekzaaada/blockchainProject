import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UploadButton from "../components/Button/UploadButton";
import axios from "axios";

import "../assets/table.css";

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState({});
  const { index } = useParams();
  const [columns] = useState([
    "INDEX",
    "MINER",
    "HASH",
    "DATE AND TIME",
    "MERKLE ROOT",
    "PREVIOUS HASH",
  ]);

  const fetchData = async () => {
    const response = await fetch("http://192.168.1.121:5000/get_chain");
    const result = await response.json();
    if (result)
      setTransaction(
        result.chain.filter((item) => item.index === index * 1)[0]
      );
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://192.168.1.121:5000/get_chain");
      const result = await response.json();
      if (result)
        setTransaction(
          result.chain.filter((item) => item.index === index * 1)[0]
        );
    };
    fetchData();
  }, [index]);

  const handleFileUpload = (
    event,
    index,
    transaction_index,
    encrypted_data
  ) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      console.log(event.target.result);
      const formData = new FormData();
      formData.append("private_file", event.target.result);
      formData.append("encrypted_data", encrypted_data);
      formData.append("index", index);
      formData.append("transaction_index", transaction_index);

      const response = axios
        .post("http://192.168.1.121:5000/get_decrypted_data", formData)
        .then(() => {
          fetchData();
        });
    };
    reader.readAsText(file);
  };
  // const handleFileUpload = (event, index, transaction_index, encrypted_data) => {
  //   var file = event.target.files[0];
  //   var reader = new FileReader();
  //   reader.onload = function (event) {
  //     const formData = new FormData();
  //     formData.append("private_file", event.target.result);
  //     formData.append("encrypted_data", encrypted_data);
  //     formData.append("index", index);
  //     formData.append("transaction_index", transaction_index);

  //     axios
  //       .post("http://192.168.1.121:5000/get_decrypted_data", formData, {
  //         responseType: "blob", // Set the response type to blob
  //       })
  //       .then((response) => {
  //         // Create a blob object from the response data
  //         const blob = new Blob([response.data], {
  //           type: response.headers["content-type"],
  //         });

  //         // Create a URL for the blob
  //         const url = window.URL.createObjectURL(blob);

  //         // Create a temporary anchor element to trigger the download
  //         const a = document.createElement("a");
  //         a.href = url;
  //         a.download = "decrypted_data.txt"; // Set the file name
  //         a.style.display = "none";
  //         document.body.appendChild(a);

  //         // Trigger a click event on the anchor element to initiate the download
  //         a.click();

  //         // Remove the anchor element
  //         document.body.removeChild(a);

  //         // Release the blob object URL
  //         window.URL.revokeObjectURL(url);
  //       })
  //       .catch((error) => {
  //         console.error("Failed to download decrypted data:", error);
  //       });
  //   };
  //   reader.readAsText(file);
  // };

  return (
    <div className="lists">
      <div className="table">
        <div className="head">
          {columns.map((el) => (
            <div key={el}>{el}</div>
          ))}
        </div>
        <div className="body">
          <div className="row">
            <div>
              <p>{transaction.index}</p>
            </div>
            <div>
              <p>{transaction.miner}</p>
            </div>
            <div>
              <p>{transaction.hash}</p>
            </div>
            <div>
              <p>{transaction.timestamp}</p>
            </div>
            <div>
              <p>{transaction.merkle_root}</p>
            </div>
            <div>
              <p>{transaction.previous_hash}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 30 }}></div>
      <div className="table">
        <div className="head">
          <div>Transaction #</div>
          <div>Public Key</div>
          <div>Encrypted file data</div>
          <div>additional info</div>
          <div></div>
        </div>
        <div className="body">
          {transaction.transactions?.map((item, i) => (
            <div key={i} className="row">
              <div>
                <p>{i + 1}</p>
              </div>
              <div>
                <p>{item.public_key}</p>
              </div>
              <div>
                <p>{item.encrypted_file}</p>
              </div>
              <div>
                <p>{item.add_info}</p>
              </div>
              <UploadButton
                text={"Decrypt"}
                action={(e) =>
                  handleFileUpload(e, transaction.index, i, item.encrypted_file)
                }
                id="input-file1"
              ></UploadButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
