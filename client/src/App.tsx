import React from "react";
import { Basic } from "./components/calendar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./styles/styles.scss";

const App: React.FC = () => {
  return (
    <div className="container">
      <Basic />
    </div>
  );
};

export default App;
