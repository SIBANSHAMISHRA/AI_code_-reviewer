import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Statistics from "./Pages/Statistics";


import Dashboard from "./Pages/Dashboard";
import History from "./Pages/History";
import Login from "./Pages/Login";
import SignUp from "./Pages/Sign up";

function App() {
  const [history, setHistory] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
       <Route
         path="/dashboard"
         element={<Dashboard history={history} setHistory={setHistory} />}
/>

        <Route
          path="/history"
          element={<History history={history} />}
        />

        <Route
  path="/statistics"
  element={<Statistics history={history} />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

