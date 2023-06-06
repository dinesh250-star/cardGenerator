import React from "react";
import { useState } from "react";
import axios from "Axios";
import "bootstrap/dist/css/bootstrap.css";
import HomeCss from "./Home.module.css";
import { useEffect } from "react";
const Home = () => {
  const [cardNo, setCardNo] = useState(); //Stores no of card to be displayed
  const [data, setData] = useState([]); //Stores data which has to be displayed
  const [data2, setData2] = useState([]); //Stores all the json data
  const [Display, setDisplay] = useState(false); //Render when quotes are generated
  const loopData = []; //For storing randomly generated quotes
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get("http://localhost:3031/list")
        .then((res) => {
          console.log(res.data);
          setData2(res.data);
        });
    };

    fetchData();
  }, []);
  const fetchInput = (e) => {
    setCardNo(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    for (let i = 0; i < cardNo; i++) {
      const randomNo = Math.floor(Math.random() * 100);

      console.log(randomNo);
      loopData.push(data2[randomNo]);
      console.log(data2[randomNo]);
    }
    console.log(loopData);
    setData(loopData);
    setDisplay(true);
  };

  return (
    <>
      <div
        className="container"
        style={{
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

        {Display ? (
          data.map((i) => {
            return (
              <div className="card-columns mb-5">
                <div className="card p-3 ">
                  <div className="card-body">
                    <h4 className="card-title  text-danger mb-3 display-7">
                      {i.author}
                    </h4>
                    <p className="card-text display-6">{i.quote}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Nothing to Display!</h1>
        )}
      </div>
    </>
  );
};

export default Home;
