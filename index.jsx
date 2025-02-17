import React from "react";
import App from "./src/App";
import { createRoot } from "react-dom/client";

const rootNode = document.querySelector('#root');

createRoot(rootNode).render(<App />);