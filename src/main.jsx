import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const server = "https://quicker-notes-app-backend.vercel.app/";

export const Context = createContext({ isAuthenticated: false });
const Appwrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("70px");
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        profile,
        setProfile,
        refresh,
        setRefresh,
        sidebarWidth,
        setSidebarWidth,
      }}
    >
      <App />
    </Context.Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Appwrapper />
  </React.StrictMode>,
);
