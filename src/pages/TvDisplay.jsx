import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function TvDisplay() {
  const [bookMarks, setBookmarks] = useState([]);
  const [bk, activeBk] = useState(false);
  const user = useSelector((state) => state.user);
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

  const [movie, setmovie] = useState({});
  const [credits, setCredits] = useState({});
  const [imdb, setImdb] = useState(0);
  const [status, setStatus] = useState(null);
  const [language, setLanguage] = useState(``);
  const { id } = useParams();
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
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:3000/tvshows/${id}`);
        const language = await axios.get(`http://localhost:3000/language`);
        const credits = await axios.get(
          `http://localhost:3000/tvshows/${id}/credits`
        );
        const imdb = await axios.get(
          `http://localhost:3000/tvshows/${id}/imdb`
        );
        setImdb(imdb.data.imdb_id);
        setCredits({ ...credits.data });

        res.data.original_language;
        setmovie({ ...res.data });
        for (let [i, j] of language.data.entries()) {
          j.iso_639_1 === res.data.original_language &&
            setLanguage(j.english_name);
        }
        setStatus(res.status);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <>
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
      {status === 200 ? (
        <div className=" flex flex-col items-center mt-4">
          <div className=" flex relative  mt-10">
            <img
              className=" h-[550px] min-w-[1280px] rounded-2xl"
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt=""
            />

            <div className="min-w-[600px] bg-transparent p-6 absolute w-[40%] box-content inset-x-[50px] inset-y-[50px] backdrop-blur-3xl flex rounded-3xl border-2 tt-1 ">
              <img
                className=" h-[90%] rounded-2xl "
                src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                alt=""
              />
              <div className="w-[100%] flex flex-col">
                <h1 className="w-[100%] text-center text-2xl font-semibold">
                  {movie.name}{" "}
                  <span className="font-extralight">
                    ({movie.first_air_date.split(`-`)[0]})
                  </span>
                </h1>
                <h1 className="mt-2 w-[100%] text-center font-light text-xl">
                  {movie.genres.map((el, i) => (
                    <span className="mx-1" key={i}>
                      {el.name} &#9679;
                    </span>
                  ))}
                  <span className="">
                    Seasons
                    <span className="ml-1 font-medium">
                      {movie.number_of_seasons}
                    </span>
                  </span>
                </h1>
                <h1 className="my-3 pl-3 w-[100%] text-justify">
                  {movie.overview}
                </h1>
                <h1
                  className={`w-[100%] text-center text-xl font-thin ${
                    movie.vote_average > 5 ? `text-green-500` : `text-red-600`
                  }`}
                >
                  <span className="uppercase mr-4 text-black font-medium">
                    <span className="font-thin">
                      Language <span className="font-medium">{language}</span>
                    </span>
                  </span>
                  <span className="uppercase text-black mr-2">Rating</span>
                  <span className="font-medium">
                    {Math.round(movie.vote_average * 10) / 10}/10
                  </span>
                  <button
                    className={` text-black ml-3 ${
                      bookMarks?.some((el) => el.id === movie.id) &&
                      `text-green-500`
                    }`}
                    onClick={() => addBookmark(movie.id)}
                  >
                    <ion-icon size="small" name="add-circle-outline"></ion-icon>
                  </button>
                </h1>
                <Link
                  to={`https://www.imdb.com/title/${imdb}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ border: `3px solid black` }}
                  className="self-center mt-2 px-2 py-1 rounded-lg"
                >
                  IMDB <ion-icon size="small" name="link-outline"></ion-icon>
                </Link>
              </div>
            </div>
          </div>

          <h1 className="mt-5 text-3xl font-medium ">
            {credits.cast.length !== 0
              ? `Top Billed Cast`
              : `There are no acting credits avaliable for this TV series`}
          </h1>
          <div className="mt-10 mb-10 max-w-[1280px] border-5 flex overflow-x-scroll credits gap-2">
            {credits.cast.map((el, i) => {
              return i <= 11 ? (
                <div
                  key={i}
                  className="my-2 mx-1 pb-1.5 rounded-2xl flex flex-col  bg-white "
                >
                  <img
                    className="max-w-[150px] rounded-2xl"
                    src={`https://image.tmdb.org/t/p/w780${el.profile_path}`}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <h1 className="text-center font-medium">
                      {el.original_name}
                    </h1>
                    <h1 className="text-center font-thin">({el.character})</h1>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
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
    </>
  );
}
