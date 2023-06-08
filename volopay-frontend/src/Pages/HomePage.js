import React, { useEffect, useRef, useState } from "react";
import style from "../Style/Home.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  let [search, setSearch] = useState("");
  let [data, setData] = useState("");
  let [loading, setLoading] = useState(false);
  let [eroor, setError] = useState(false);
  let [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  const getData = async () => {
    let res = await fetch(
      `https://json-server-mock-60xa.onrender.com/data?_page=${page}&_limit=5`
    );
    setLoading(true);
    try {
      let datas = await res.json();
      setData([...data, ...datas]);
      setLoading(false);
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      // console.log(err);
    }
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    if (documentHeight - (scrollTop + windowHeight) < 100 && hasMore) {
      // Load more items if scrolled close to the bottom and there are more items to load
      setPage((prevPage) => prevPage + 1);
    } else {
      setPage(1);
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
  }, [page]);

  useEffect(() => {
    // console.log(container);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // console.log(data);

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

        <div
          className={style.profiles}
          ref={containerRef}
          // style={{ height: "400px" }}
        >
          {data &&
            data.map((elem, index) => {
              return (
                <div key={index}>
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
        {hasMore && <div>Loading more...</div>}
      </div>
    </div>
  );
};

export default HomePage;
