import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import RoutesMap from "./pages/RoutesMap";

function App() {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    role: "",
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/current", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          setAuthState({ ...authState, status: false });
        } else {
          if (response.data.id) {
            setAuthState({
              email: response.data.email,
              id: response.data.id,
              role: response.data.role,
              status: true,
            });
          }
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <RoutesMap></RoutesMap>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
