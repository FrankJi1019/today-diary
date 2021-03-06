import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './public.css'
import theme from "./theme";
import {ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {AuthProvider} from "./providers/AuthProvider";
import {UtilProvider} from "./providers/UtilProvider";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <UtilProvider>
              <App />
            </UtilProvider>
          </AuthProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
