import { Link, useParams } from "react-router-dom";
import { useState } from "react";
export default function Navbar() {
  const [navNum, setNavNum] = useState(-1);
  return (
    <div className=" mt-5 flex justify-center">
      <div className="flex gap-12  p-4 px-8 rounded-2xl">
        <Link
          onClick={() => {
            setNavNum(1);
          }}
          className=""
          to={`/`}
        >
          <div className={`icons ${navNum === 1 ? `icons-active` : ``}`}>
            <ion-icon size="large" name="grid-outline"></ion-icon>
          </div>
          <h1 className={`nav-text ${navNum === 1 ? `nav-text-active` : ``}`}>
            home
          </h1>
        </Link>
        <Link
          onClick={() => {
            setNavNum(2);
          }}
          className=""
          to={`/movies`}
        >
          <div className={`icons ${navNum === 2 ? `icons-active` : ``}`}>
            <ion-icon size="large" name="videocam-outline"></ion-icon>
          </div>
          <h1 className={`nav-text ${navNum === 2 ? `nav-text-active` : ``}`}>
            Movies
          </h1>
        </Link>
        <Link
          onClick={() => {
            setNavNum(3);
          }}
          className=" "
          to={`/tvshows`}
        >
          <div className={`icons ${navNum === 3 ? `icons-active` : ``}`}>
            <ion-icon size="large" name="tv-outline"></ion-icon>
          </div>
          <h1
            className={`nav-text text-center ${
              navNum === 3 ? `nav-text-active` : ``
            }`}
          >
            TV
          </h1>
        </Link>
        <Link
          onClick={() => {
            setNavNum(4);
          }}
          className=""
          to={`/bookmarks`}
        >
          <div className={`icons ${navNum === 4 ? `icons-active` : ``}`}>
            <ion-icon size="large" name="bookmark-outline"></ion-icon>
          </div>
          <h1
            className={`nav-text relative right-3 ${
              navNum === 4 ? `nav-text-active` : ``
            }`}
          >
            Bookmark
          </h1>
        </Link>
        <Link
          onClick={() => {
            setNavNum(5);
          }}
          className=""
          to={`/login`}
        >
          <div className={`icons ${navNum === 5 ? `icons-active` : ``}`}>
            <ion-icon size="large" name="person-outline"></ion-icon>
          </div>
          <h1
            className={`nav-text text-center ${
              navNum === 5 ? `nav-text-active` : ``
            }`}
          >
            User
          </h1>
        </Link>
      </div>
    </div>
  );
}
