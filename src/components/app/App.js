import { Route, Routes, } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spiner/Spiner";
import CharacterPage from "../characterPage/CharacterPage";


const NotFound404 = lazy(() => import('../pages/404/404'))
const MainPage = lazy(() => import('../pages/mainPage/MainPage'))
const ComicsPage = lazy(() => import('../pages/comicsPage/ComicsPage'))
const RegisterForm = lazy(() => import('../pages/registerForm/RegisterForm'))
const SingleComic = lazy(() => import('../pages/singleComic/SingleComic'))


const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/login" element={<RegisterForm />} />
            <Route path="/comics/:comicId" element={<SingleComic />} />
             <Route path="/characters/:id" element={<CharacterPage />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
