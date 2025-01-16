import { Header, Footer, Signup, Loading,Homepage, Profile, Login,Logout } from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStrore";
import { useEffect } from "react";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if ((isCheckingAuth && !authUser)) {
    return <Loading classes="h-screen" />;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to='/login' />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to='/login' />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to='/' />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to='/' />} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
