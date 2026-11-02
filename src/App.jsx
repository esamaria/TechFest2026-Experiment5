import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useTheme } from "./context/ThemeContext";

const Home = lazy(() => import("./pages/Home"));
const Events = lazy(() => import("./pages/Events"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const MyRegistrations = lazy(() => import("./pages/MyRegistrations"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <Navbar />
      <Suspense fallback={<main className="page" aria-live="polite">Loading page...</main>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-registrations" element={<MyRegistrations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
