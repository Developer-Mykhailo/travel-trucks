import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import CamperDetailsPage from "../../pages/CamperDetailsPage/CamperDetailsPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Layout from "../Layout/Layout";
import { Suspense } from "react";
import Features from "../Features/Features";
import Reviews from "../Reviews/Reviews";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />

            <Route path="/catalog/:id" element={<CamperDetailsPage />}>
              <Route index element={<Navigate to="features" replace />} />
              <Route path="features" element={<Features />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
