import React from "react";
import { useState } from "react";
import axios from "Axios";
import "bootstrap/dist/css/bootstrap.css";
import HomeCss from "./Home.module.css";
const Home = () => {
  const [cardNo, setCardNo] = useState(); //Stores no of card to be displayed
  const [data, setData] = useState([]); //Stores all the json data
  const [Display, setDisplay] = useState(false); //Render when quotes are generated
  const loopData = []; //For storing randomly generated quotes

  const fetchInput = (e) => {
    setCardNo(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(cardNo);

    //  fetching all the data,then generating quotes randomly in for loop
    //  and pushing it into loopData array and saving it. Update Display
    //  to true so now it can be conditionally rendered

    await axios
      .get("http://localhost:3031/list")
      .then((res) => {
        setData(res.data);
        for (let i = 0; i < cardNo; i++) {
          const randomNo = Math.round(Math.random() * 100 + 1);
          console.log(randomNo);
          loopData.push(res.data[randomNo - 1]);
        }
        console.log(loopData);
        setData(loopData);
        setDisplay(true);
      })
      .catch((err) => console.log(err));
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
          <h1>Nothing to Display!</h1>
        )}
      </div>
    </>
  );
};

export default Home;
