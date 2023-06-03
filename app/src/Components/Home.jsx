import React from "react";
import { useState } from "react";
import axios from "Axios";
import "bootstrap/dist/css/bootstrap.css";
import HomeCss from "./Home.module.css";
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
    <>
      <div
        className="container"
        style={{
          // backgroundImage: `url("https://mdbcdn.b-cdn.net/img/Photos/Others/images/76.webp")`,

          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <form onSubmit={submitHandler} className="form-inline mb-5">
          <div className="input-group mb-4">
            <input
              className="form-control mr-2"
              type="number"
              required
              onChange={fetchInput}
              placeholder="Enter no"
              min="1"
            ></input>
            <div className="input-group-append">
              <button type="submit" className="btn btn-outline-success">
                Submit
              </button>
            </div>
          </div>
        </form>

        {noDisplay ? (
          data.map((i) => {
            return (
              <div class="card-columns mb-5">
                <div class="card p-3 ">
                  <div class="card-body">
                    <h4 class="card-title  text-danger mb-3 display-7">
                      {i.author}
                    </h4>
                    <p class="card-text display-6">{i.quote}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Nothing to show!!!</h1>
        )}
      </div>
    </>
  );
};

export default Home;
