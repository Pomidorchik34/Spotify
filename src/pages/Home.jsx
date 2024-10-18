import React, { useEffect, useState } from "react";
import btn from "../images/Home/Ellipse 9.svg";
import instance from "../axios.getToken";
import { useNavigate } from "react-router-dom";

function Home() {
  let nav = useNavigate();
  const [mixed, setMixed] = useState([]);
  const [feat, setFeat] = useState([]);
  const [MadeFY, setMadeFY] = useState([]);
  const [recantly, setRecantly] = useState([]);
  const [jump, setJump] = useState([]);
  const [uniquely, setUniquely] = useState([]);
  const [seeAll, setSeeAll] = useState([
    { counter: 1, length: 4 },
    { counter: 1, length: 4 },
    { counter: 1, length: 4 },
    { counter: 1, length: 4 },
    { counter: 1, length: 4 },
  ]);
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
  const getFeat = async () => {
    try {
      let response = await fetch(
        "https://api.spotify.com/v1/browse/featured-playlists",
        {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );
      let data = [];
      data = await response.json();
      setFeat(data.playlists.items);
      console.log(data.playlists.items);
    } catch (err) {
      console.log(err);
    }
  };
  const getMixed = async () => {
    try {
      let response = await fetch(
        "https://api.spotify.com/v1/browse/categories/toplists/playlists",
        {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );
      let data = [];
      data = await response.json();
      setMixed(data.playlists.items);
      console.log(data.playlists.items);
    } catch (err) {
      console.log(err);
    }
  };
  const getRecently = async () => {
    try {
      let response = await fetch(
        "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists",
        {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );
      let data = [];
      data = await response.json();
      setRecantly(data.playlists.items);
      console.log(data.playlists.items);
    } catch (err) {
      console.log(err);
    }
  };
  const getMadeFY = async () => {
    try {
      let response = await fetch(
        "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists",
        {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );
      let data = [];
      data = await response.json();
      setMadeFY(data.playlists.items);
      console.log(data.playlists.items);
    } catch (err) {
      console.log(err);
    }
  };
  const getJump = async () => {
    try {
      let response = await fetch(
        "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists",
        {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );
      let data = [];
      data = await response.json();
      setJump(data.playlists.items);
      console.log(data.playlists.items);
    } catch (err) {
      console.log(err);
    }
  };
  const getUniquely = async () => {
    try {
      let response = await fetch(
        "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists",
        {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );
      let data = [];
      data = await response.json();
      setUniquely(data.playlists.items);
      console.log(data.playlists.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let names = mixed.map((value) => {
      return value.name;
    });
    console.log(names);
    localStorage.setItem("names", JSON.stringify(names));

    getMixed();
    getMadeFY();
    getRecently();
    getJump();
    getUniquely();
    getFeat();
  }, []);
  return (
    <div className="text-white h-[1400px] justify-center relative ">
      <div className="absolute -z-10 h-[600px] home w-full"></div>
      <nav className="h-[80px] py-5 sticky flex gap-5 px-[41px]">
        <button className="relative">
          <img className="relative" src={btn} alt="" />
          <h1 className="text-[30px] bottom-[43px] relative">{"<"}</h1>
        </button>
        <button className="relative">
          <img className="relative" src={btn} alt="" />
          <h1 className="text-[30px] bottom-[43px] relative">{">"}</h1>
        </button>
      </nav>
      <h1 className="px-[41px] text-[39px]">Good afternoon</h1>
      <div className="cards-afternoon gap-y-4 gap-x-[31px] justify-center">
        {feat.map((element, index) => {
          if (index < 6) {
            return (
              <div key={index} className="card">
                <img
                  src={element.images[0].url}
                  width={82}
                  height={82}
                  alt="none"
                />
                <h1>{element.name}</h1>
              </div>
            );
          }
        })}
      </div>
      <div className="main">
        <div className="c">
          <div className="flex justify-between px-[41px] pb-[26px]">
            <h1 className="text-[30px]">Your top mixes</h1>{" "}
            <button
              className="tracking-[4px] text-[#ffffffc6]"
              onClick={() => {
                let copied = [...seeAll];
                seeAll[0].counter++;
                if (seeAll[0].counter % 2 == 0) {
                  copied[0].length = mixed.length;
                  setSeeAll(copied);
                } else {
                  copied[0].length = 4;
                  setSeeAll(copied);
                }
              }}
            >
              SEE ALL
            </button>
          </div>
          <div className="cards">
            {mixed.map((element, index) => {
              if (index < seeAll[0].length) {
                return (
                  <div
                    key={index}
                    className="card2"
                    onClick={() => nav(`/details?id=${element.id}`)}
                  >
                    <img
                      src={element.images[0].url}
                      alt=""
                      width={182}
                      height={182}
                    />
                    <div className="text pt-[25px]">
                      <h1 className="text-[20px]">{element.name}</h1>
                      <p>{element.description.slice(0, 25) + "..."}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="c">
          <div className="flex justify-between px-[41px] pb-[26px]">
            <h1 className="text-[30px]">Made for you</h1>{" "}
            <button
              className="tracking-[4px] text-[#ffffffc6]"
              onClick={() => {
                let copied = [...seeAll];
                seeAll[1].counter++;
                if (seeAll[1].counter % 2 == 0) {
                  copied[1].length = mixed.length;
                  setSeeAll(copied);
                } else {
                  copied[1].length = 4;
                  setSeeAll(copied);
                }
              }}
            >
              SEE ALL
            </button>
          </div>
          <div className="cards">
            {MadeFY.map((element, index) => {
              if (index < seeAll[1].length) {
                return (
                  <div
                    key={index}
                    className="card2"
                    onClick={() => nav(`/details?id=${element.id}`)}
                  >
                    <img
                      src={element.images[0].url}
                      alt=""
                      width={182}
                      height={182}
                    />
                    <div className="text pt-[25px]">
                      <h1 className="text-[20px]">{element.name}</h1>
                      <p>{element.description.slice(0, 25) + "..."}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="c">
          <div className="flex justify-between px-[41px] pb-[26px]">
            <h1 className="text-[30px]">Recently played</h1>{" "}
            <button
              className="tracking-[4px] text-[#ffffffc6]"
              onClick={() => {
                let copied = [...seeAll];
                seeAll[2].counter++;
                if (seeAll[2].counter % 2 == 0) {
                  copied[2].length = mixed.length;
                  setSeeAll(copied);
                } else {
                  copied[2].length = 4;
                  setSeeAll(copied);
                }
              }}
            >
              SEE ALL
            </button>
          </div>
          <div className="cards">
            {recantly.map((element, index) => {
              if (index < seeAll[2].length) {
                return (
                  <div
                    key={index}
                    className="card2"
                    onClick={() => nav(`/details?id=${element.id}`)}
                  >
                    <img
                      src={element.images[0].url}
                      alt=""
                      width={182}
                      height={182}
                    />
                    <div className="text pt-[25px]">
                      <h1 className="text-[20px]">{element.name}</h1>
                      <p>{element.description.slice(0, 25) + "..."}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="c">
          <div className="flex justify-between px-[41px] pb-[26px]">
            <h1 className="text-[30px]">Jump back in</h1>{" "}
            <button
              className="tracking-[4px] text-[#ffffffc6]"
              onClick={() => {
                let copied = [...seeAll];
                seeAll[3].counter++;
                if (seeAll[3].counter % 2 == 0) {
                  copied[3].length = mixed.length;
                  setSeeAll(copied);
                } else {
                  copied[3].length = 4;
                  setSeeAll(copied);
                }
              }}
            >
              SEE ALL
            </button>
          </div>
          <div className="cards">
            {jump.map((element, index) => {
              if (index < seeAll[3].length) {
                return (
                  <div
                    key={index}
                    className="card2"
                    onClick={() => nav(`/details?id=${element.id}`)}
                  >
                    <img
                      src={element.images[0].url}
                      alt=""
                      width={182}
                      height={182}
                    />
                    <div className="text pt-[25px]">
                      <h1 className="text-[20px]">{element.name}</h1>
                      <p>{element.description.slice(0, 25) + "..."}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="c">
        <div className="flex justify-between px-[41px] py-[26px]">
          <h1 className="text-[30px]">Uniquely yours</h1>{" "}
          <button
            className="tracking-[4px] text-[#ffffffc6]"
            onClick={() => {
              let copied = [...seeAll];
              seeAll[4].counter++;
              if (seeAll[4].counter % 2 == 0) {
                copied[4].length = mixed.length;
                setSeeAll(copied);
              } else {
                copied[4].length = 4;
                setSeeAll(copied);
              }
            }}
          >
            SEE ALL
          </button>
        </div>
        <div className="cards">
          {uniquely.map((element, index) => {
            if (index < seeAll[4].length) {
              return (
                <div
                  key={index}
                  className="card2"
                  onClick={() => nav(`/details?id=${element.id}`)}
                >
                  <img
                    src={element.images[0].url}
                    alt=""
                    width={182}
                    height={182}
                  />
                  <div className="text pt-[25px]">
                    <h1 className="text-[20px]">{element.name}</h1>
                    <p>{element.description.slice(0, 25) + "..."}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="h-[22px]"></div>
    </div>
  );
}

export default Home;
