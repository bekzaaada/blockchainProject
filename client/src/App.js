import React from "react";
import MainHeader from "./components/Header/MainHeader";
import Header from "./components/Header/Header";
import Main from "./pages/main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lists from "../src/pages/lists";
import Generator from "./pages/rsa-generator";
import BlockGenerator from "./pages/block-generate";
import TransactionDetails from "./pages/transactionDetails";
import NodeRegistration from "./NodeRegistration";
import NodesDashboard from "./NodesDashboard";

function App() {
  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/register-node" element={<NodeRegistration />} />
          <Route path="/nodes-dashboard" element={<NodesDashboard />} />
          <Route
            path="/"
            element={[<MainHeader key="mainHeader" />, <Main key="main" />]}
          />
          <Route
            path="/lists"
            element={[<Header key="header" />, <Lists key="cryptos" />]}
          />
          <Route
            path="/generator"
            element={[<Header key="header" />, <Generator key="generator" />]}
          />
          <Route
            path="/block-generate"
            element={[<Header key="header" />, <BlockGenerator key="block" />]}
          />
          <Route
            path="/transaction-detail/:index"
            element={[
              <MainHeader key="mainHeader" />,
              <TransactionDetails key="transaction" />,
            ]}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
