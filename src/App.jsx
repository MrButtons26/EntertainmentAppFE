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
import { useDispatch } from "react-redux";
import { logInRed } from "./userSlice";
import { logOutRed } from "./userSlice";
import Bookmark from "./pages/Bookmark";
import { useState } from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3,
    },
  },
});
function App() {
  const [refresh, setRefresh] = useState(false);
  const Dispatch = useDispatch();
  localStorage.getItem("bookmarkMovie") === null &&
    localStorage.setItem("bookmarkMovie", JSON.stringify([]));
  localStorage.getItem("bookmarkTv") === null &&
    localStorage.setItem("bookmarkTv", JSON.stringify([]));
  const data = localStorage.getItem("auth");
  if (data) {
    Dispatch(logInRed(JSON.parse(data)));
  }
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login refresh={refresh} setRefresh={setRefresh} />}
          />
          <Route path="/movies" element={<Movies />} />
          <Route path="/bookmarks" element={<Bookmark />} />
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
