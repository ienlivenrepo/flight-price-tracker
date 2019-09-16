import React from "react";
import logo from "./logo.svg";
import { Basic } from "./components/calendar";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App-container">
      <Basic />
    </div>
  );
};

export default App;
