import React, { useEffect, useState } from "react";
import btn from "../images/Home/Ellipse 9.svg";
import { useNavigate } from "react-router-dom";
import Play from "../images/details/Play_Greem Hover (1).svg";
import Pause from "../images/details/Pause_Greem Hover.svg";
import heart from "../images/details/Heart_XS.svg";
import download from "../images/details/Download_XS.svg";
import option from "../images/details/Options_XS.svg";
import frame from "../images/details/Frame 44.svg";
import table from "../images/details/Frame 11.svg";
function Details() {
  const [play, setPlay] = useState(Play);
  const [playlist, setPlaylist] = useState([]);
  const [playing, setPlaying] = useState(true);
  let nav = useNavigate("");
  const getToken = async () => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            "d2e5beeda92d42c5a6af76a190847a62" +
              ":" +
              "23469cdad6024acd952176d41c81d970"
          )}`,
        },
        body: "grant_type=client_credentials",
      });
      const auth = await response.json();
      localStorage.setItem(
        "access_token",
        `${auth.token_type} ${auth.access_token}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  getToken();
  const getPlaylist = async () => {
    try {
      let response = await fetch(
        `https://api.spotify.com/v1/playlists/${location.href.slice(
          location.href.indexOf("id") + 3
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );
      let data = [];
      data = await response.json();
      setPlaylist(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (location.href.includes("id")) {
      getPlaylist();
    } else {
      nav("/");
    }
  }, []);
  const [audio, setAudio] = useState(null);

  const handleAudioPlayPause = (url) => {
    let copiedAudio = new Audio(url);
    if (audio == null) {
      let newAudio = new Audio(url);
      setAudio(newAudio);
    }
    if (audio) {
      if (!audio.paused) {
        audio.pause();
        copiedAudio != audio ? setAudio(null) : null;
      } else {
        audio.play();
      }
    } else {
      let newAudio = new Audio(url);
      setAudio(newAudio);
    }
  };
  return (
    <div className="text-white h-[1400px] justify-center relative px-[41px]">
      <div className="absolute -z-10 h-[600px] details w-full left-0"></div>
      <nav className="h-[80px] py-5 sticky flex gap-5">
        <button className="relative">
          <img className="relative" src={btn} alt="" />
          <h1 className="text-[30px] bottom-[43px] relative">{"<"}</h1>
        </button>
        <button className="relative">
          <img className="relative" src={btn} alt="" />
          <h1 className="text-[30px] bottom-[43px] relative">{">"}</h1>
        </button>
      </nav>
      <div className="w-[988px] flex gap-8 items-center justify-center">
        <img
          className="h-[300px]"
          height={300}
          src={playlist.images && playlist.images[0].url}
          alt=""
        />
        <div className="text flex flex-col justify-end">
          <h1>
            {playlist.public == true ? "PUBLIC PLAYLIST" : "PRIVATE PLAYLIST"}
          </h1>
          <h1 className="text-[122px] leading-[124.33px] tracking-[-6%] -ml-2 font-bold">
            {playlist.name && playlist.name.trim()}
          </h1>
          <div className="flex gap-1">
            {playlist.tracks &&
              playlist.tracks.items.map((value, index) => {
                if (index < 3) {
                  return (
                    <h1 className="text-nowrap font-normal" key={index}>
                      {value.track.name + ","}
                    </h1>
                  );
                }
              })}
            <h1 className="text-[#ffffffc6] font-normal">and more...</h1>
          </div>
          <div className="flex gap-1">
            <h1 className="font-normal">Made for </h1>
            <h1>{playlist.description && playlist.description.slice(7)}</h1>
            <li className="list-disc text-[#ffffffc6] font-normal">
              {playlist.tracks && playlist.tracks.total} songs,
            </li>
          </div>
        </div>
      </div>
      <div className="play flex justify-between mt-[60px]">
        <div className="flex">
          <img
            src={play}
            width={138}
            height={114}
            onClick={() => (play == Play ? setPlay(Pause) : setPlay(Play))}
            className="pr-6"
            alt=""
          />
          <img src={heart} alt="" className="pr-[21px]" />
          <img src={download} alt="" className="pr-[22px]" />
          <img src={option} alt="" />
        </div>
        <img src={frame} alt="" />
      </div>
      <img src={table} alt="" />
      <div className="flex flex-col">
        {playlist.tracks &&
          playlist.tracks.items.map((value, index) => {
            return (
              <div
                className="album relative"
                key={index}
                onClick={() => handleAudioPlayPause(value.track.preview_url)}
              >
                <div className="flex items-center">
                  <h1 className="pl-[11px] pr-[23px] text-[#B3B3B3] font-normal">
                    {index + 1}
                  </h1>
                  <img
                    src={value.track.album.images[0].url}
                    className="pr-[21px]"
                    alt=""
                    width={64}
                    height={64}
                  />
                  <div className="flex flex-col text-[#B3B3B3] font-normal">
                    <h1>{value.track.album.name.slice(0, 10)}</h1>
                    <h1>
                      {value.track.album.artists.map((value) => {
                        return `${value.name}`;
                      })}
                    </h1>
                  </div>
                </div>
                <h1 className="absolute left-[400px] text-[#B3B3B3]">
                  {value.track.album.name}
                </h1>
                <div className="flex gap-[37px]">
                  <img src={heart} width={20.13} height={21} alt="" />
                  <h1>0:29</h1>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Details;
