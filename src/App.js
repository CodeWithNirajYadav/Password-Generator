import { useState } from "react";
import "./App.css";

export default function App() {
  const [length, setLength] = useState(16);

  const [options, setOptions] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: false,
  });

  const [password, setPassword] = useState("");

  const chars = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  const generate = () => {
    let pool = "";

    if (options.upper) pool += chars.upper;
    if (options.lower) pool += chars.lower;
    if (options.numbers) pool += chars.numbers;
    if (options.symbols) pool += chars.symbols;

    if (!pool) {
      alert("Please select at least one option");
      return;
    }

    const randomValues = new Uint32Array(length);

    crypto.getRandomValues(randomValues);

    let newPassword = "";

    for (let i = 0; i < length; i++) {
      newPassword += pool[randomValues[i] % pool.length];
    }

    setPassword(newPassword);
  };

  const copyPassword = async () => {
    if (!password) return;

    await navigator.clipboard.writeText(password);

    alert("Password copied!");
  };

  return (
    <div className="app">

      <div className="card">

        <div className="topGlow"></div>

        <h1>Password Generator</h1>

        <p className="subtitle">
          Generate secure & strong passwords instantly
        </p>

        <div className="passwordContainer">

          <input
            value={password}
            readOnly
            placeholder="Generate your password..."
            className="passwordInput"
          />

          <button
            onClick={copyPassword}
            className="copyBtn"
          >
            Copy
          </button>

        </div>

        <div className="sliderBox">

          <div className="lengthRow">
            <span>Password Length</span>
            <span>{length}</span>
          </div>

          <input
            type="range"
            min="6"
            max="40"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="slider"
          />

        </div>

        <div className="options">

          {Object.keys(options).map((key) => (
            <label key={key} className="option">

              <input
                type="checkbox"
                checked={options[key]}
                onChange={() =>
                  setOptions((prev) => ({
                    ...prev,
                    [key]: !prev[key],
                  }))
                }
              />

              <span>{key}</span>

            </label>
          ))}

        </div>

        <button
          onClick={generate}
          className="generateBtn"
        >
          Generate Password
        </button>

      </div>

    </div>
  );
}