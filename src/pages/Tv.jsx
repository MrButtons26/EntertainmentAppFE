import getAllTv from "../../services/getTvShows";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Tv() {
  const user = useSelector((state) => state.user);
  const [bookMarks, setBookmarks] = useState([]);
  const [bk, activeBk] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => {
      activeBk(false);
    }, 1800);
    let temp = JSON.parse(localStorage.getItem(`bookmarkTv`));
    temp !== null && setBookmarks([...temp]);
    return () => {
      clearTimeout(timeout);
    };
  }, [bk]);

  const [active, setActive] = useState(-1);
  const nextPage = useRef(null);
  const observer = new IntersectionObserver((entries) => {
    console.log(entries[0].isIntersecting);
    if (entries[0].isIntersecting === true) {
      fetchNextPage();
    }
    console.log(entries);
  });
  useEffect(() => {
    if (nextPage !== null && status == `success`) {
      observer.observe(nextPage.current);
    }
    () => {
      observer.unobserve(nextPage.current);
    };
  });
  async function addBookmark(id) {
    activeBk(!bk);
    let temp = JSON.parse(localStorage.getItem(`bookmarkTv`));
    if (
      temp?.some((el) => {
        return el.id == id;
      })
    ) {
      const arr = temp.filter((el) => el.id !== id);
      setBookmarks([...arr]);
      localStorage.setItem(`bookmarkTv`, JSON.stringify([...arr]));
      const response = await axios.delete("http://localhost:3000/bookmarks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          id: id,
          mediaType: "tv",
        },
      });
      return;
    }
    temp =
      temp === null
        ? [{ id, mediaType: "tv" }]
        : [...temp, { id, mediaType: "tv" }];
    if (user.isLogged === true) {
      setBookmarks([...temp]);
      localStorage.setItem(`bookmarkTv`, JSON.stringify([...temp]));
      const res = await axios.post(
        `http://localhost:3000/bookmarks`,
        {
          id: id,
          mediaType: "tv",
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    }
  }
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["TopRatedTv"],
    queryFn: getAllTv,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });

  return status === "pending" ? (
    <div className="flex justify-center mt-4 p-2">
      <button
        className="border-2 p-2 border-black flex w-[150px] justify-evenly gap-3"
        ref={nextPage}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        <div
          className={`w-[25px] h-[25px] rounded-xl bg-purple-400
            dot-one 
          `}
        ></div>
        <div
          className={`w-[25px] h-[25px] rounded-xl bg-purple-400
            dot-two 
          `}
        ></div>
        <div
          className={`w-[25px] h-[25px] rounded-xl bg-purple-400
            dot-three 
          `}
        ></div>
      </button>
    </div>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {" "}
      {bk && !user.isLogged && (
        <div className="flex justify-center relative">
          <h1
            className={`bookmark-error ${
              bk && !user.isLogged && `bookmark-error-active`
            }`}
          >
            Please Login to Bookmark
          </h1>
        </div>
      )}
      <SearchBar></SearchBar>
      <h1 className="text-3xl font-thin pl-12">
        Top Rated <span className=" text-4xl font-semibold">TV</span>
      </h1>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          <div className="movie-container px-8">
            {group.results.map((movie, i) => (
              <div
                onMouseEnter={() => {
                  setActive(i);
                }}
                onMouseLeave={() => {
                  setActive(-1);
                }}
                key={i}
                className={`item ${active === i ? `item-active` : ``}`}
              >
                <img
                  className={`movies-img ${
                    active === i ? `movies-img-active` : ``
                  }`}
                  src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                  alt=""
                />
                <div
                  className={`info-movie ${
                    active === i ? `info-movie-active` : ``
                  }`}
                >
                  <h1 className="text-l self-center">{movie.original_name}</h1>
                  <h1 className="mx-4 text-justify text-s font-thin">
                    {movie.overview}
                  </h1>
                  <div className=" my-2 flex mx-6 gap-4 ">
                    <h1 className="text-sm">
                      {movie.first_air_date.split(`-`)[0]}
                    </h1>
                    <h1
                      className={`text-sm ${
                        movie.vote_average > 5
                          ? `text-green-500`
                          : `text-red-600`
                      }`}
                    >
                      {Math.trunc(movie.vote_average)}/10
                    </h1>
                    <button
                      className={` ${
                        bookMarks?.some((el) => el.id === movie.id) &&
                        `text-green-500`
                      }`}
                      onClick={() => addBookmark(movie.id)}
                    >
                      <ion-icon
                        size="small"
                        name="add-circle-outline"
                      ></ion-icon>
                    </button>
                    <NavLink to={`/tvshows/${movie.id}`}>
                      <ion-icon size="small" name="play-outline"></ion-icon>
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
      <div className="flex justify-center mt-4 p-2">
        <button
          className="border-2 p-2 border-black flex w-[150px] justify-evenly gap-3"
          ref={nextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          <div
            className={`w-[25px] h-[25px] rounded-xl bg-purple-400 ${
              isFetchingNextPage === true ? `dot-one` : ``
            }`}
          ></div>
          <div
            className={`w-[25px] h-[25px] rounded-xl bg-purple-400 ${
              isFetchingNextPage === true ? `dot-two` : ``
            }`}
          ></div>
          <div
            className={`w-[25px] h-[25px] rounded-xl bg-purple-400 ${
              isFetchingNextPage === true ? `dot-three` : ``
            }`}
          ></div>
        </button>
      </div>
      ;
    </>
  );
}

//  {
//    isFetchingNextPage
//      ? "Loading more..."
//      : hasNextPage
//      ? "Load More"
//      : "Nothing more to load";
//  }
