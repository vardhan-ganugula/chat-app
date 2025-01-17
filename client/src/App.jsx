import { Header, Footer, Signup, Loading,Homepage, Profile, Login,Logout } from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStrore";
import { useEffect } from "react";

function App() {
  const { checkAuth, isCheckingAuth, authUser, isLoggedIn } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if ((isCheckingAuth && !authUser)) {
    return <Loading classes="h-screen" />;
  }

  return (
    <>
      <Header />
      <main className="min-h-[90vh]">
      <Routes>
        <Route path="/" element={isLoggedIn ? <Homepage /> : <Navigate to='/login' />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to='/login' />} />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to='/' />} />
        <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to='/' />} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
