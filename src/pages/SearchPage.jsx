import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function SearchPage() {
  const { movieName } = useParams();
  const [results, setResults] = useState({});
  const [status, setStatus] = useState(0);
  const [acitve, setActive] = useState(0);
  const [noOfMovies, setNoOfMovies] = useState({ movies: 0, tv: 0 });
  useEffect(() => {
    (async () => {
      const searchResults = await axios.get(
        `http://localhost:3000/search/?name=${movieName}`
      );
      setResults({ ...searchResults.data });
      setStatus(searchResults.status);
      let noOfMovies = 0;
      let noOfTv = 0;
      searchResults.data.results.map((el) => {
        if (el.media_type === `movie`) {
          noOfMovies++;
          console.log(23);
        }
        if (el.media_type === `tv`) {
          noOfTv++;
        }
      });
      setNoOfMovies({ movies: noOfMovies, tv: noOfTv });
    })();
  }, []);
  const navigate = useNavigate();
  function imageError(e) {
    e.target.src = `/noImage.jpg`;
  }
  return (
    <>
      {status !== 200 ? (
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
      ) : (
        <div className="my-6 mx-10 flex flex-col items-center">
          <div className="flex gap-6">
            <button
              onClick={() => {
                setActive(0);
              }}
              className={`btn-search-page ${
                acitve === 0 ? `border-purple-300` : ` `
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => {
                setActive(1);
              }}
              className={`btn-search-page  ${
                acitve === 1 ? ` border-purple-300` : ` `
              }`}
            >
              Tv Shows
            </button>
          </div>
          <div>
            {" "}
            <h1 className="text-2xl font-thin mt-3 mb-3 ">
              Movies{" "}
              <span className="font-medium ml-0.5">{noOfMovies.movies}</span>{" "}
              <span className="ml-4">
                {" "}
                Tv Shows{" "}
                <span className="font-medium ml-0.5">{noOfMovies.tv}</span>
              </span>
            </h1>
          </div>
          {acitve === 0 && (
            <div className="flex flex-col mt-10">
              {results.results.map((el, i) => {
                return (
                  el.media_type === `movie` && (
                    <div
                      key={i}
                      className="movie-list-item hover:cursor-pointer"
                      onClick={() => {
                        navigate(`/movies/${el.id}`);
                      }}
                    >
                      <img
                        className="h-[180px] w-[130px] rounded-2xl"
                        onError={(e) => {
                          imageError(e);
                        }}
                        src={`https://image.tmdb.org/t/p/w1280${el.poster_path}`}
                      />
                      <div className="flex flex-col ml-10 ">
                        <h1 className="text-xl font-medium">
                          {el.title}{" "}
                          <span className="ml-2 text-xl font-thin">
                            (
                            {el.release_date != ``
                              ? el.release_date.split(`-`)[0]
                              : `Un-Released`}
                            )
                          </span>
                        </h1>
                        <h1 className="mt-2">
                          {el.overview !== ``
                            ? el.overview
                            : `No Data Avaliable`}
                        </h1>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          )}
          {acitve === 1 && (
            <div className="tv-list">
              {results.results.map((el, i) => {
                return (
                  el.media_type === `tv` && (
                    <div
                      key={i}
                      onClick={() => {
                        navigate(`/tvshows/${el.id}`);
                      }}
                      className="movie-list-item hover:cursor-pointer"
                    >
                      <img
                        onError={(e) => {
                          imageError(e);
                        }}
                        className="h-[180px] rounded-2xl"
                        src={`https://image.tmdb.org/t/p/w1280${el.poster_path}`}
                      />

                      <div className="flex flex-col ml-10 ">
                        <h1 className="text-xl font-medium">
                          {el.name}
                          <span className="ml-2 text-xl font-thin">
                            (
                            {el.first_air_date != ``
                              ? el.first_air_date.split(`-`)[0]
                              : `Un-Released`}
                            )
                          </span>
                        </h1>
                        <h1 className="mt-2">
                          {el.overview !== ``
                            ? el.overview
                            : `No Data Avaliable`}
                        </h1>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
