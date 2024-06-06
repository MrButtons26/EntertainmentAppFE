import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Movies from "./pages/Movies";
import MovieDisplay from "./pages/MovieDisplay";
import Tv from "./pages/Tv";
import TvDisplay from "./pages/TvDisplay";
import SearchPage from "./pages/SearchPage";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDisplay />} />
          <Route path="/tvshows/:id" element={<TvDisplay />} />
          <Route path="/search/:movieName" element={<SearchPage />} />
          <Route path="/tvshows" element={<Tv />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
