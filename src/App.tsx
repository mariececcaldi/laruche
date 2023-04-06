import React from "react";
import "./App.css";
import * as ReactDOM from "react-dom";
import SearchPage from "./Search/SearchPage";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./Product/ProductDetail";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "100vh",
  lineHeight: "50px",
  color: "gray",
  backgroundColor: "#ccc",
};

const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Content style={contentStyle}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
