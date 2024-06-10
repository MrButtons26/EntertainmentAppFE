import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import getAllBookmarks from "../../services/getAllBookmarks";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
export default function Bookmark() {
  const user = useSelector((state) => state.user);
  const [re, setRe] = useState(false);

  const { data, isLoading, isError, isPending } = useQuery({
    queryKey: ["bookmarks", user.token, re],
    queryFn: getAllBookmarks,
    staleTime: 0,
    refetchOnMount: true,
  });
  async function deleteMovie(id) {
    let temp = JSON.parse(localStorage.getItem(`bookmarkMovie`));
    const arr = temp.filter((el) => el.id !== id);
    localStorage.setItem(`bookmarkMovie`, JSON.stringify([...arr]));
    const response = await axios.delete("http://localhost:3000/bookmarks", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        id: id,
        mediaType: "movie",
      },
    });
    setRe(!re);
  }
  async function deleteTv(id) {
    let temp = JSON.parse(localStorage.getItem(`bookmarkTv`));
    const arr = temp.filter((el) => el.id !== id);
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
    setRe(!re);
  }
  console.log(data);
  return (
    <>
      {user.isLogged == false ? (
        <div className="flex justify-center mt-2">
          <h1 className="text-2xl font-thin">
            Please login to see all bookmarked{" "}
            <span className="font-medium">Movies</span> and
            <span className="font-medium"> TV shows</span>
          </h1>
        </div>
      ) : (
        <div className="">
          {data?.data?.length === 0 ? (
            <h1 className="text-2xl font-thin text-center mt-2">
              There are no bookmarked{" "}
              <span className="font-medium"> Movies </span> or
              <span className="font-medium"> TV shows</span>
            </h1>
          ) : (
            <div className="ml-[40px] ">
              <h1 className="text-2xl mx-2 font-thin mb-2 ">
                Bookmarked <span className="text-3xl font-medium">Movies</span>
              </h1>

              {isLoading === false ? (
                <>
                  <div className="flex flex-wrap justify-start">
                    {data?.data?.map(
                      (el, i) =>
                        el.title && (
                          <div
                            className="flex flex-col mx-1 my-2 rounded-xl"
                            key={i}
                          >
                            <img
                              className=" max-w-[350px] rounded-xl"
                              src={`https://image.tmdb.org/t/p/w780${el.backdrop_path}`}
                              alt=""
                            />
                            <div className="flex flex-row justify-between">
                              <h1 className="self-center text-xl font-medium">
                                {el.title}{" "}
                                <span className="font-thin">
                                  ({el.release_date.split(`-`)[0]})
                                </span>
                              </h1>
                              <div className="flex justify-end gap-2 mt-1">
                                {" "}
                                <button
                                  onClick={() => deleteMovie(el.id)}
                                  className="text-green-600"
                                >
                                  <ion-icon
                                    size="small"
                                    name="add-circle-outline"
                                  ></ion-icon>
                                </button>
                                <NavLink to={`/movies/${el.id}`}>
                                  <ion-icon
                                    size="small"
                                    name="play-outline"
                                  ></ion-icon>
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                  <h1 className="text-2xl mx-2 font-thin mb-2 ">
                    Bookmarked <span className="text-3xl font-medium">Tv</span>
                  </h1>
                  <div className="flex flex-wrap justify-start">
                    {data?.data?.map(
                      (el, i) =>
                        el.name && (
                          <div key={i}>
                            <div
                              className="flex flex-col mx-1 my-2 rounded-xl relative"
                              key={i}
                            >
                              <img
                                className=" max-w-[350px] rounded-xl"
                                src={`https://image.tmdb.org/t/p/w780${el.backdrop_path}`}
                                alt=""
                              />
                              <div className="flex flex-row justify-between">
                                <h1 className="self-center text-xl font-medium">
                                  {el.name}{" "}
                                  <span className="font-thin">
                                    ({el.first_air_date.split(`-`)[0]})
                                  </span>
                                </h1>
                                <div className="flex justify-end gap-2 mt-1">
                                  {" "}
                                  <button
                                    onClick={() => deleteTv(el.id)}
                                    className="text-green-600"
                                  >
                                    <ion-icon
                                      size="small"
                                      name="add-circle-outline"
                                    ></ion-icon>
                                  </button>
                                  <NavLink to={`/tvshows/${el.id}`}>
                                    <ion-icon
                                      size="small"
                                      name="play-outline"
                                    ></ion-icon>
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </>
              ) : (
                <div className="flex justify-center mt-4 p-2">
                  <button className="border-2 p-2 border-black flex w-[150px] justify-evenly gap-3">
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
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
