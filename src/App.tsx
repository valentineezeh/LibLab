import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const MoviePage = lazy(() => import("./Pages/Movies"));
const CharacterPage = lazy(() => import("./Pages/Characters"));
const QuotePage = lazy(() => import("./Pages/Quotes"));

const App = () => {
  return (
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/characters" element={<CharacterPage />} />
            <Route path="/quotes" element={<QuotePage />} />
            <Route index element={<Navigate to="/movies" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  );
}

export default App;
