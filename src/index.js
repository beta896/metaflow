<<<<<<< HEAD
import express from "express";
import verdictsRouter from "../routes/verdicts.js";

const app = express();
app.use(express.json());

app.use("/verdicts", verdictsRouter);

app.get("/", (req, res) => {
  res.send("Metaflow backend is alive.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
>>>>>>> 5b44bae0a0876873c6fe8a67004c52601cd4e71e
