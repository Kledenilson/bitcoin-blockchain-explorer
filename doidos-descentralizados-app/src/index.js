import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyles } from "./styles/GlobalStyles";
import "./i18n/i18n"; // Importa a configuração de idiomas

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById("root")
);
