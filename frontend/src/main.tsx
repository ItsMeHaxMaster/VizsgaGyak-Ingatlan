import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import NewAd from "./NewAd.tsx";
import Offers from "./Offers.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/newad" element={<NewAd />} />
        <Route path="/offers" element={<Offers />} />
        <Route
          path="*"
          element={<h1 className="text-center mt-5">404 Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
