import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useState ,useEffect} from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spiner/Spiner";
import CharacterPage from "../characterPage/CharacterPage";


const ProfilePage = lazy(()=> import('../pages/profilePage/ProfilePage'))
const NotFound404 = lazy(() => import('../pages/404/404'))
const MainPage = lazy(() => import('../pages/mainPage/MainPage'))
const ComicsPage = lazy(() => import('../pages/comicsPage/ComicsPage'))
const RegisterForm = lazy(() => import('../pages/registerForm/RegisterForm'))
const SingleComic = lazy(() => import('../pages/singleComic/SingleComic'))
const MarvelInfoPage = lazy(() => import('../pages/marvelInfoPage/MarvelInfoPage'))


const App = () => {
  const [login, setLogin] = useState(() => {
    return localStorage.getItem('isAuth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuth', login);
  }, [login]);

  const location = useLocation();

  const hideHeader = location.pathname === "/";

  return (
    <div className="app">
      {!hideHeader && (
        <AppHeader login={login} />
      )}
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<MarvelInfoPage />} />
            <Route path="/characters" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/login" element={<RegisterForm setLogin={setLogin} />} />
            <Route path="/comics/:comicId" element={<SingleComic />} />
            <Route path="/characters/:id" element={<CharacterPage />} />
            <Route path="/profile" element={<ProfilePage setLogin={setLogin} />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
