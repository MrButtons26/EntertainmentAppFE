import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  function submission(e) {
    e.preventDefault();
    navigate(`/search/${search}`);
  }
  return (
    <div className="mt-12 flex justify-center">
      <form
        onSubmit={(e) => {
          submission(e);
        }}
        action=""
      >
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="input-search"
          placeholder="SEARCH"
          type="text"
        />
      </form>
    </div>
  );
}
