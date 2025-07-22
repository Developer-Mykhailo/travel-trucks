import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("../../pages/CatalogPage/CatalogPage"));
const CamperDetailsPage = lazy(() =>
  import("../../pages/CamperDetailsPage/CamperDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

import Layout from "../Layout/Layout";
import Features from "../Features/Features";
import Reviews from "../Reviews/Reviews";

import Loader from "../Loader/Loader";

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
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
