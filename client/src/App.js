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
          setAuthState({ username: "", id: 0, status: false });
        } else {
          // if (response.data.id) {
          //   setAuthState({
          //     email: response.data.email,
          //     id: response.data.id,
          //     role: response.data.role,
          //     status: true,
          //   });
          if (response.data.id) {
            if (response.data.role === "admin") {
              setAuthState({
                email: response.data.email,
                id: response.data.id,
                role: response.data.role,
                status: true,
              });
            } else if (response.data.role === "doctor") {
              axios
                .get(
                  `http://localhost:5000/doctors/get-doc/${response.data.id}`
                )
                .then((resp) => {
                  setAuthState({
                    email: response.data.email,
                    id: response.data.id,
                    role: response.data.role,
                    status: true,
                    secondId: resp.data.id,
                  });
                });
            } else if (response.data.role === "patient") {
              axios
                .get(
                  `http://localhost:5000/doctors/get-patient/${response.data.id}`
                )
                .then((resp) => {
                  setAuthState({
                    email: response.data.email,
                    id: response.data.id,
                    role: response.data.role,
                    status: true,
                    secondId: resp.data.id,
                  });
                });
            }
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
