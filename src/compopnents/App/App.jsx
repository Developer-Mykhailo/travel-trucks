import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import Catalog from "../../pages/Catalog/Catalog";
import CamperDetailsPage from "../../pages/CamperDetailsPage/CamperDetailsPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Layout from "../Layout/Layout";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<CamperDetailsPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
