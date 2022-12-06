import Register from "./components/register";
import { AuthProvider } from "./store/auth-context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./components/home";

function App() {
  const [isAuth, setIsAuth] = useState(false);



  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <Home setIsAuth={setIsAuth} />
              ) : (
                <Register setIsAuth={setIsAuth} />
              )
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
