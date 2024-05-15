import React from 'react';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (_email: string, _password: string) => {},
});
