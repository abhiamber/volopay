import React, { useEffect, useState } from "react";
import style from "../Style/Home.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  let [search, setSearch] = useState("");
  let [data, setData] = useState("");
  let [page, setPage] = useState(1);
  let [loading, setLoadiing] = useState(true);

  const getData = async () => {
    let res = await fetch(
      `https://json-server-mock-60xa.onrender.com/data?_page=${page}&_limit=5`
    );
    try {
      let datas = await res.json();
      setData((prevItems) => [...prevItems, ...datas]);
      if (datas.length === 0) {
        setLoadiing(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let innerHeight = window.innerHeight;

    if (innerHeight + scrollTop + 1 >= scrollHeight) {
      setPage((p) => p + 1);
    }
  };

  const hanldeSearch = () => {
    if (search === "") {
      getData();
    } else {
      let url = `https://json-server-mock-60xa.onrender.com/data?name=${search}`;
      filterAndSearchFunc(url);
    }
  };

  const handleChangeFilter = (e) => {
    let value = e.target.value;
    // console.log(value, "njjknkjn/");

    if (value === "") {
      getData();
    } else {
      let url = `https://json-server-mock-60xa.onrender.com/data?card_type=${value}`;
      filterAndSearchFunc(url);
    }
  };

  const filterAndSearchFunc = async (url) => {
    let res = await fetch(url);
    try {
      let data = await res.json();
      setData([...data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    // console.log(container);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={style.containers}>
      <div className={style.titles}>
        <p>Card Design</p>
        <div className={style.hoisting} style={{ marginBottom: "20px" }}>
          <div>
            <input
              placeholder="Searc=h by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={hanldeSearch}> Search</button>
          </div>
          <div>
            <select onChange={handleChangeFilter}>
              <option value="">Fliter By Card Type</option>

              <option value="burner">Burner</option>
              <option value="subscription">Subscription</option>
            </select>
          </div>
        </div>

        <div className={style.profiles}>
          {data &&
            data.map((elem, index) => {
              return (
                <div key={index}>
                  <p>{elem.card_type} </p>
                  <h1>{elem.budget_name}</h1>
                  <span style={{ marginRight: "3px" }}> spent</span>
                  <progress
                    max={elem.available_to_spend.value / 10}
                    value={elem.spent.value}
                  />
                  <br />
                  <span>
                    {" "}
                    {elem.card_type === "burner"
                      ? `Expiray - ${elem["expiry"]}
`
                      : `Limit - ${elem.limit} `}
                  </span>
                  <br /> <br />
                  <div className={style.hoisting}>
                    <button> {elem.name} </button>
                    <button>{elem.status}</button>
                  </div>
                  <br />
                  <button>
                    <Link to={`/${elem.owner_id}`}>MoreDetails</Link>
                  </button>
                </div>
              );
            })}
        </div>
        {loading && (
          <div style={{ color: "purple", fontSize: "20px" }}>
            Loading...........
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
