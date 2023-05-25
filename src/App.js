import Hero from "./components/hero/Hero";
import { AuthContextProvider } from "./components/context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Hero />
    </AuthContextProvider>
  );
}

export default App;
