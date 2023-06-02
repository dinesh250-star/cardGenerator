import React from "react";
import { useState } from "react";
import axios from "Axios";
const Home = () => {
  const [cardNo, setCardNo] = useState();
  const [data, setData] = useState([]);
  const [noDisplay, setNoDisplay] = useState(true);
  const [randomGeneratedNo, setRandomGeneratedNo] = useState();
  const loopData = [];
  const fetchInput = (e) => {
    setCardNo(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(cardNo);

    await axios
      .get("http://localhost:3031/list")
      .then((res) => {
        setData(res.data);
        for (let i = 0; i < cardNo; i++) {
          const randomNo = Math.round(Math.random() * 100 + 1);
          console.log(randomNo);
          const a = loopData.push(res.data[randomNo - 1]);
          if (!a) {
            console.log("fast hogaya");
          }
        }
        console.log(loopData);
        setData(loopData);
        // setId(res.data[randomNo - 1].id);
        // setQuote(res.data[randomNo - 1].quote);
        // setAuthor(res.data[randomNo - 1].author);
      })
      .catch((err) => console.log(err));
  };
  const show = async () => {};
  return (
    <div>
      <h2>hi</h2>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          required
          onChange={fetchInput}
          placeholder="Enter no"
          min="1"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {noDisplay ? (
        data.map((i) => {
          return (
            <div>
              <h1>{i.id}</h1>
              <h1>{i.quote}</h1>
              <h1>{i.author}</h1>
            </div>
          );
        })
      ) : (
        <h1>Nothing to show!!!</h1>
      )}
    </div>
  );
};

export default Home;
