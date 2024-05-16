import { useContext, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login';
import { AuthProvider } from './components/AuthProvider/AuthProvider';

import { AuthContext } from './contexts/AuthContext';

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
    <AuthProvider>
      <RoutesComponent />
    </AuthProvider>
  );
}

export default App;

const RoutesComponent = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <>
              <PageTitle title="LandConnex | Dashboard" />
              <Dashboard />
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};
