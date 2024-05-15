import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="LandConnex | Dashboard" />
              <Dashboard />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
