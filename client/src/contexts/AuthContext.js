import React from "react";

export default React.createContext({
  authService: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});