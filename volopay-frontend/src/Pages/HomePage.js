import React, { useEffect, useState } from "react";
import style from "../Style/Home.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  let [search, setSearch] = useState("");
  let [data, setData] = useState("");
  let [loading, setLoading] = useState(false);
  let [eroor, setError] = useState(false);

  const getData = async () => {
    let res = await fetch("https://json-server-mock-60xa.onrender.com/data");
    setLoading(true);
    try {
      let data = await res.json();
      setData([...data]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
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
    setLoading(true);
    try {
      let data = await res.json();
      console.log(data);
      setData([...data]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  if (loading) {
    return <h1>Loading.............</h1>;
  }

  if (eroor) {
    return <h1>Error while fetching data from server..............</h1>;
  }
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
                <div key={elem.owner_id}>
                  <p>{elem.card_type} </p>
                  <h1>{elem.budget_name}</h1>
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
      </div>
    </div>
  );
};

export default HomePage;
