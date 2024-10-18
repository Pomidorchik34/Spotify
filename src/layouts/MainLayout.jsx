import React, { useEffect, useState } from "react";
import Home from "../images/LNI/Home.svg";
import Vector from "../images/LNI/Vector.svg";
import Search from "../images/LNI/Search.svg";
import Library from "../images/LNI/Library_S.svg";
import Like from "../images/LNI/Vector (1).svg";
import Rectangle from "../images/LNI/Rectangle 15-1.svg";
import add from "../images/RNI/User Plus_S.svg";
import X from "../images/RNI/Close_S.svg";
import user from "../images/RNI/Frame 37.svg";
import { NavLink } from "react-router-dom";

function MainLayout({ children }) {
  let [color, setColor] = useState("#ffffffc6");
  useEffect(() => {
    if (location.href == "http://localhost:5173/") {
      setColor("#ffffff");
    } else {
      setColor("#ffffffc6");
    }
    // console.log(location.href)
  }, []);
  let [names, setnames] = useState(JSON.parse(localStorage.getItem("names")));

  return (
    <div className="flex justify-between">
      <div className="w-[310px] bg-black h-full pl-[30px] pt-[70px]">
        <div className="fixed">
          <ul className="flex flex-col gap-5 mb-[49px]">
            <NavLink to="/" className="flex items-center gap-5">
              <img
                src={location.href == "http://localhost:5173/" ? Vector : Home}
                alt=""
              />
              <h1 className={`text-[${color}]`}>Home</h1>
            </NavLink>
            <li className="flex items-center gap-5">
              <img src={Search} alt="" />
              <h1>Search</h1>
            </li>
            <li className="flex items-center gap-5">
              <img src={Library} alt="" />
              <h1>Your Library</h1>
            </li>
          </ul>
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-5">
              <div className="bg-white text-black px-[12px] h-11 text-[30px] rounded-sm">
                <h1>+</h1>
              </div>
              <h1>Create Playlist</h1>
            </li>
            <NavLink to="/liked" className="flex items-center gap-5">
              <div
                className={`liked text-white w-10 h-10 relative py-[9px] p-[15px] rounded-sm`}
              >
                <img
                  src={Like}
                  className="absolute z-10 left-2"
                  width={24}
                  height={24}
                />
              </div>
              <h1>Liked Songs</h1>
            </NavLink>
          </ul>
          <ul className="flex flex-col gap-[9px] mt-[42px]">
            {names.map((value, index) => {
              return (
                <h1 key={index} className="font-normal text-[18px]">
                  {value.length > 16 ? value.slice(0, 20) + "..." : value}
                </h1>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="w-full">{children}</div>
      <div className="px-5 py-[29px] w-[346px] bg-black h-full z-10">
        <div className="fixed bg-black">
          <div className="mb-[39px] flex justify-between items-center">
            <h1>Friend Activity</h1>
            <div className="flex gap-5">
              <img src={add} alt="" />
              <img src={X} alt="" />
            </div>
          </div>
          <h1 className="mb-[23px]">
            Let friends and followers on Spotify see what you’re listening to.
          </h1>
          <ul className="flex flex-col gap-5">
            <li>
              <img src={user} alt="" />
            </li>
            <li>
              <img src={user} alt="" />
            </li>
            <li>
              <img src={user} alt="" />
            </li>
          </ul>
          <h1 className="mt-[21px]">
            {
              "Go to Settings > Social and enable “Share my listening activity on Spotify.’  You can turn this off at any time."
            }
          </h1>
          <div className="mt-[23px] flex justify-center">
            <button className="tracking-[4px] text-black px-[63px] py-5 bg-white rounded-[40px]">
              SETTINGS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
