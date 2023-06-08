import { useParams } from "react-router-dom";
import style from "../Style/Details.module.css";
import { useEffect, useState } from "react";

const CardDetails = () => {
  let [data, setData] = useState("");
  let [loading, setLoading] = useState(false);
  let [eroor, setError] = useState(false);
  let { id } = useParams();
  console.log(id);
  const getData = async () => {
    let res = await fetch(
      `https://json-server-mock-60xa.onrender.com/data?owner_id=${id}`
    );
    setLoading(true);
    try {
      let data = await res.json();
      setData(data[0]);
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
    <div className={style.titles}>
      <p>Card Detials by OwnerId</p>
      <h2>owner_id {data.owner_id}</h2>
      <div className={style.profiles}>
        <div>
          <p>Card Types {data.card_type} </p>
          <p>Budget Name {data.budget_name}</p>
          <span>
            {" "}
            {data.card_type === "burner"
              ? `Expiray - ${data["expiry"]}
`
              : `Limit - ${data.limit} `}
          </span>
        </div>
        <div>
          <p>
            available_to_spend{" "}
            {data.available_to_spend && data.available_to_spend.currency}{" "}
            {data.available_to_spend && data.available_to_spend.value}{" "}
          </p>
          <p>
            spent {data.spent && data.spent.currency}{" "}
            {data.spent && data.spent.value}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
