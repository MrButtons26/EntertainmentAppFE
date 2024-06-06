import { useQueries, useQuery } from "@tanstack/react-query";
import SearchBar from "../components/SearchBar";
import getTrendingMovies from "../../services/trendingMovies";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function Home() {
  const [imgUrl, setImgUrl] = useState([]);
  const [slideNum, setSlideNum] = useState(0);
  const [activeItem, setActiveItem] = useState(-1);
  const carousel = useRef(null);

  const { data, isLoading, isError, isPending } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrendingMovies,
  });
  useEffect(() => {
    async function wrapper() {
      if (isLoading === false) {
        let arr = [];
        for (let i = 0; i <= 9; i++) {
          const res = await axios.get(
            `https://image.tmdb.org/t/p/w1280${data.results[i].backdrop_path}`
          );
          arr.push(res.config.url);
        }
        setImgUrl(arr);
      }
    }
    wrapper();
  }, [isLoading]);

  function carouselMover(btnDirection) {
    let x = carousel.current.getBoundingClientRect().x;
    console.log(carousel.current.getBoundingClientRect());

    if (btnDirection == `left` && slideNum > 0) {
      carousel.current.style.transform = `translateX(${275 + x}px)`;
      setSlideNum(slideNum - 1);
    } else if (btnDirection === `right` && slideNum < 8) {
      carousel.current.style.transform = `translateX(${-275 + x}px)`;
      setSlideNum(slideNum + 1);
    }
  }
  return (
    <>
      <SearchBar></SearchBar>
      <h1 className=" pl-5 pb-2 text-3xl font-thin">
        Trending <span className=" text-4xl font-semibold pl-1">Movies</span>
      </h1>
      {isLoading === false ? (
        <div className="carousel-container flex relative ">
          <div className=" absolute h-[236px] left-[0px] z-10 self-center">
            <button
              onClick={() => {
                carouselMover(`left`);
              }}
              className="h-[100%] btn-carousel btn-left text-white  opacity-[1] w-[45px]  "
            >
              <ion-icon size="large" name="chevron-back-outline"></ion-icon>
            </button>
          </div>

          <div ref={carousel} className="carousel">
            <button
              onMouseEnter={() => {
                setActiveItem(0);
              }}
              onMouseLeave={() => {
                setActiveItem(-1);
              }}
              className={`item-btn ${
                activeItem === 0 ? `active-item-btn` : ``
              }`}
            >
              <img
                className={`img ${activeItem === 0 ? `active-img` : ``}`}
                src={`${imgUrl[0]}`}
                alt=""
              />
              <div
                className={`item-info flex flex-col ${
                  activeItem === 0 ? `item-info-active` : ``
                }`}
              >
                <h1 className="text-l">{data.results[0].original_title}</h1>
                <h1 className="text-sm text-justify font-thin mx-3.5">
                  {data.results[0].overview}
                </h1>
                <div className=" my-2 flex mx-6 gap-4 ">
                  <h1 className="text-sm">
                    {data.results[0].release_date.split(`-`)[0]}
                  </h1>
                  <h1
                    className={`text-sm ${
                      data.results[0].vote_average > 6
                        ? `text-green-500`
                        : `text-red-600`
                    }`}
                  >
                    {Math.round(data.results[0].vote_average * 10) / 10}/10
                  </h1>
                  <Link>
                    <ion-icon size="small" name="add-circle-outline"></ion-icon>
                  </Link>
                  <NavLink to={`/movies/${data.results[0].id}`}>
                    <ion-icon size="small" name="play-outline"></ion-icon>
                  </NavLink>{" "}
                </div>
              </div>
            </button>
            <button
              onMouseEnter={() => {
                setActiveItem(1);
              }}
              onMouseLeave={() => {
                setActiveItem(-1);
              }}
              className={`item-btn ${
                activeItem === 1 ? `active-item-btn ` : ``
              }`}
            >
              <img
                className={`img ${activeItem === 1 ? `active-img` : ``}`}
                src={`${imgUrl[1]}`}
                alt=""
              />
              <div
                className={`item-info flex flex-col ${
                  activeItem === 1 ? `item-info-active` : ``
                }`}
              >
                <h1 className="text-l">{data.results[1].original_title}</h1>
                <h1 className="text-sm text-justify font-thin mx-3.5">
                  {data.results[1].overview}
                </h1>
                <div className=" mt-2 flex mx-6 gap-4 ">
                  <h1 className="text-sm">
                    {data.results[1].release_date.split(`-`)[0]}
                  </h1>
                  <h1
                    className={`text-sm ${
                      data.results[1].vote_average > 6
                        ? `text-green-500`
                        : `text-red-600`
                    }`}
                  >
                    {Math.round(data.results[1].vote_average * 10) / 10}/10
                  </h1>
                  <Link>
                    <ion-icon size="small" name="add-circle-outline"></ion-icon>
                  </Link>
                  <NavLink to={`/movies/${data.results[1].id}`}>
                    <ion-icon size="small" name="play-outline"></ion-icon>
                  </NavLink>{" "}
                </div>
              </div>
            </button>
            <button
              onMouseEnter={() => {
                setActiveItem(2);
              }}
              onMouseLeave={() => {
                setActiveItem(-1);
              }}
              className={` item-btn  ${
                activeItem === 2 ? `active-item-btn  ` : ``
              }`}
            >
              <img
                className={`img ${activeItem === 2 ? `active-img` : ``}`}
                src={`${imgUrl[2]}`}
                alt=""
              />
              <div
                className={`item-info flex flex-col ${
                  activeItem === 2 ? `item-info-active` : ``
                }`}
              >
                <h1 className="text-l">{data.results[2].original_title}</h1>
                <h1 className="text-sm text-justify font-thin mx-3.5">
                  {data.results[2].overview}
                </h1>
                <div className=" my-2 flex mx-6 gap-4 ">
                  <h1 className="text-sm">
                    {data.results[2].release_date.split(`-`)[0]}
                  </h1>
                  <h1
                    className={`text-sm ${
                      data.results[2].vote_average > 6
                        ? `text-green-500`
                        : `text-red-600`
                    }`}
                  >
                    {Math.round(data.results[2].vote_average * 10) / 10}/10
                  </h1>
                  <Link>
                    <ion-icon size="small" name="add-circle-outline"></ion-icon>
                  </Link>
                  <NavLink to={`/movies/${data.results[2].id}`}>
                    <ion-icon size="small" name="play-outline"></ion-icon>
                  </NavLink>{" "}
                </div>
              </div>
            </button>
            <button
              onMouseEnter={() => {
                setActiveItem(3);
              }}
              onMouseLeave={() => {
                setActiveItem(-1);
              }}
              className={`item-btn ${
                activeItem === 3 ? `active-item-btn` : ``
              }`}
            >
              <img
                className={`img ${activeItem === 3 ? `active-img` : ``}`}
                src={`${imgUrl[3]}`}
                alt=""
              />
              <div
                className={`item-info flex flex-col ${
                  activeItem === 3 ? `item-info-active` : ``
                }`}
              >
                <h1 className="text-l">{data.results[3].original_title}</h1>
                <h1 className="text-sm text-justify font-thin mx-3.5">
                  {data.results[3].overview}
                </h1>
                <div className=" my-2 flex mx-6 gap-4 ">
                  <h1 className="text-sm">
                    {data.results[3].release_date.split(`-`)[0]}
                  </h1>
                  <h1
                    className={`text-sm ${
                      data.results[3].vote_average > 6
                        ? `text-green-500`
                        : `text-red-600`
                    }`}
                  >
                    {Math.round(data.results[3].vote_average * 10) / 10}/10
                  </h1>
                  <Link>
                    <ion-icon size="small" name="add-circle-outline"></ion-icon>
                  </Link>
                  <NavLink to={`/movies/${data.results[3].id}`}>
                    <ion-icon size="small" name="play-outline"></ion-icon>
                  </NavLink>{" "}
                </div>
              </div>
            </button>
            <button
              onMouseEnter={() => {
                setActiveItem(4);
              }}
              onMouseLeave={() => {
                setActiveItem(-1);
              }}
              className={`item-btn ${
                activeItem === 4 ? `active-item-btn ` : ``
              }`}
            >
              <img
                className={`img ${activeItem === 4 ? `active-img` : ``}`}
                src={`${imgUrl[4]}`}
                alt=""
              />
              <div
                className={`item-info flex flex-col ${
                  activeItem === 4 ? `item-info-active` : ``
                }`}
              >
                <h1 className="text-l">{data.results[0].original_title}</h1>
                <h1 className="text-sm text-justify font-thin mx-3.5">
                  {data.results[4].overview}
                </h1>
                <div className=" my-2 flex mx-6 gap-4 ">
                  <h1 className="text-sm">
                    {data.results[4].release_date.split(`-`)[0]}
                  </h1>
                  <h1
                    className={`text-sm ${
                      data.results[4].vote_average > 6
                        ? `text-green-500`
                        : `text-red-600`
                    }`}
                  >
                    {Math.round(data.results[4].vote_average * 10) / 10}/10
                  </h1>
                  <Link>
                    <ion-icon size="small" name="add-circle-outline"></ion-icon>
                  </Link>
                  <NavLink to={`/movies/${data.results[4].id}`}>
                    <ion-icon size="small" name="play-outline"></ion-icon>
                  </NavLink>{" "}
                </div>
              </div>
            </button>
            <button
              onMouseEnter={() => {
                setActiveItem(5);
              }}
              onMouseLeave={() => {
                setActiveItem(-1);
              }}
              className={`item-btn ${
                activeItem === 5 ? `active-item-btn` : ``
              }`}
            >
              <img
                className={`img ${activeItem === 5 ? `active-img` : ``}`}
                src={`${imgUrl[5]}`}
                alt=""
              />
              <div
                className={`item-info flex flex-col ${
                  activeItem === 5 ? `item-info-active` : ``
                }`}
              >
                <h1 className="text-l">{data.results[5].original_title}</h1>
                <h1 className="text-sm text-justify font-thin mx-3.5">
                  {data.results[5].overview}
                </h1>
                <div className=" my-2 flex mx-6 gap-4 ">
                  <h1 className="text-sm">
                    {data.results[5].release_date.split(`-`)[0]}
                  </h1>
                  <h1
                    className={`text-sm ${
                      data.results[5].vote_average > 6
                        ? `text-green-500`
                        : `text-red-600`
                    }`}
                  >
                    {Math.round(data.results[5].vote_average * 10) / 10}/10
                  </h1>
                  <Link>
                    <ion-icon size="small" name="add-circle-outline"></ion-icon>
                  </Link>
                  <NavLink to={`/movies/${data.results[5].id}`}>
                    <ion-icon size="small" name="play-outline"></ion-icon>
                  </NavLink>{" "}
                </div>
              </div>
            </button>
            <button
              onMouseEnter={() => {
                setActiveItem(6);
              }}
              onMouseLeave={() => {
                setActiveItem(-1);
              }}
              className={`item-btn ${
                activeItem === 6 ? `active-item-btn` : ``
              }`}
            >
              <img
                className={`img ${activeItem === 6 ? `active-img` : ``}`}
                src={`${imgUrl[6]}`}
                alt=""
              />
              <div
                className={`item-info flex flex-col ${
                  activeItem === 6 ? `item-info-active` : ``
                }`}
              >
                <h1 className="text-l">{data.results[6].original_title}</h1>
                <h1 className="text-sm text-justify font-thin mx-3.5">
                  {data.results[6].overview}
                </h1>
                <div className=" my-2 flex mx-6 gap-4 ">
                  <h1 className="text-sm">
                    {data.results[6].release_date.split(`-`)[0]}
                  </h1>
                  <h1
                    className={`text-sm ${
                      data.results[6].vote_average > 6
                        ? `text-green-500`
                        : `text-red-600`
                    }`}
                  >
                    {Math.round(data.results[6].vote_average * 10) / 10}/10
                  </h1>
                  <Link>
                    <ion-icon size="small" name="add-circle-outline"></ion-icon>
                  </Link>
                  <NavLink to={`/movies/${data.results[6].id}`}>
                    <ion-icon size="small" name="play-outline"></ion-icon>
                  </NavLink>{" "}
                </div>
              </div>
            </button>
            <button
              onMouseEnter={() => {
                setActiveItem(7);
              }}
              onMouseLeave={() => {
                setActiveItem(-1);
              }}
              className={`item-btn ${
                activeItem === 7 ? `active-item-btn` : ``
              }`}
            >
              <img
                className={`img ${activeItem === 7 ? `active-img` : ``}`}
                src={`${imgUrl[7]}`}
                alt=""
              />{" "}
              <div
                className={`item-info flex flex-col ${
                  activeItem === 7 ? `item-info-active` : ``
                }`}
              >
                <h1 className="text-l">{data.results[7].original_title}</h1>
                <h1 className="text-sm text-justify font-thin mx-3.5">
                  {data.results[7].overview}
                </h1>
                <div className=" my-2 flex mx-6 gap-4 ">
                  <h1 className="text-sm">
                    {data.results[7].release_date.split(`-`)[0]}
                  </h1>
                  <h1
                    className={`text-sm ${
                      data.results[7].vote_average > 6
                        ? `text-green-500`
                        : `text-red-600`
                    }`}
                  >
                    {Math.round(data.results[7].vote_average * 10) / 10}/10
                  </h1>
                  <Link>
                    <ion-icon size="small" name="add-circle-outline"></ion-icon>
                  </Link>
                  <NavLink to={`/movies/${data.results[7].id}`}>
                    <ion-icon size="small" name="play-outline"></ion-icon>
                  </NavLink>{" "}
                </div>
              </div>
            </button>
            <button
              onMouseEnter={() => {
                setActiveItem(8);
              }}
              onMouseLeave={() => {
                setActiveItem(-1);
              }}
              className={`item-btn ${
                activeItem === 8 ? `active-item-btn` : ``
              }`}
            >
              <img
                className={`img ${activeItem === 8 ? `active-img` : ``}`}
                src={`${imgUrl[8]}`}
                alt=""
              />
              <div
                className={`item-info flex flex-col ${
                  activeItem === 8 ? `item-info-active` : ``
                }`}
              >
                <h1 className="text-l">{data.results[8].original_title}</h1>
                <h1 className="text-sm text-justify font-thin mx-3.5">
                  {data.results[8].overview}
                </h1>
                <div className=" my-2 flex mx-6 gap-4 ">
                  <h1 className="text-sm">
                    {data.results[8].release_date.split(`-`)[0]}
                  </h1>
                  <h1
                    className={`text-sm ${
                      data.results[8].vote_average > 6
                        ? `text-green-500`
                        : `text-red-600`
                    }`}
                  >
                    {Math.round(data.results[8].vote_average * 10) / 10}/10
                  </h1>
                  <Link>
                    <ion-icon size="small" name="add-circle-outline"></ion-icon>
                  </Link>
                  <NavLink to={`/movies/${data.results[8].id}`}>
                    <ion-icon size="small" name="play-outline"></ion-icon>
                  </NavLink>{" "}
                </div>
              </div>
            </button>
            <button
              onMouseEnter={() => {
                setActiveItem(9);
              }}
              onMouseLeave={() => {
                setActiveItem(-1);
              }}
              className={`item-btn ${
                activeItem === 9 ? `active-item-btn` : ``
              }`}
            >
              <img
                className={`img ${activeItem === 9 ? `active-img` : ``}`}
                src={`${imgUrl[9]}`}
                alt=""
              />
              <div
                className={`item-info flex flex-col ${
                  activeItem === 9 ? `item-info-active` : ``
                }`}
              >
                <h1 className="text-l">{data.results[9].original_title}</h1>
                <h1 className="text-sm text-justify font-thin mx-3.5">
                  {data.results[9].overview}
                </h1>
                <div className=" my-2 flex mx-6 gap-4 ">
                  <h1 className="text-sm">
                    {data.results[9].release_date.split(`-`)[0]}
                  </h1>
                  <h1
                    className={`text-sm ${
                      data.results[9].vote_average > 6
                        ? `text-green-500`
                        : `text-red-600`
                    }`}
                  >
                    {Math.round(data.results[9].vote_average * 10) / 10}/10
                  </h1>
                  <Link>
                    <ion-icon size="small" name="add-circle-outline"></ion-icon>
                  </Link>
                  <NavLink to={`/movies/${data.results[9].id}`}>
                    <ion-icon size="small" name="play-outline"></ion-icon>
                  </NavLink>{" "}
                </div>
              </div>
            </button>
          </div>
          <div className="right-[0px] absolute self-center  h-[236px] ">
            <button
              onClick={() => {
                carouselMover(`right`);
              }}
              className=" btn-carousel h-[100%] btn-right w-[45px] text-white  "
            >
              <ion-icon size="large" name="chevron-forward-outline"></ion-icon>
            </button>
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
