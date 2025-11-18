import { Route, Routes,} from "react-router-dom";

import { MainPage, ComicsPage, RegisterForm } from "../pages";
import AppHeader from "../appHeader/AppHeader";



const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/login" element={<RegisterForm />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
