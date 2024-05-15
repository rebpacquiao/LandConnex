import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') === 'true',
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  const handleLogin = (email: string, password: string) => {
    const dummyEmail = 'user@example.com';
    const dummyPassword = 'landConnex';

    if (email === dummyEmail && password === dummyPassword) {
      setIsLoggedIn(true);
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleCloseSnackbar = (
    _: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogin: handleLogin, onLogout: handleLogout }}
    >
      {children}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          Invalid credentials
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};
