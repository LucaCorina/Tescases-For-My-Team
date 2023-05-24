import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import ReactDOM from "react-dom";
import "./Main.css";
import "./register2.css";
import { TextField, Button, InputLabel, Typography } from "@mui/material";
import { flexbox } from "@mui/system";
import { Navigate, useLocation } from "react-router-dom";
export default function Register2() {
  const style = { margin: "10px " };
  //ar fi pt containerul 2
  const [code, setCode] = useState("");

  //pentru containerul 1
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(200);
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState(false);
  const { state, pathname } = useLocation();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [county, setCounty] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
    setSubmitted(false);
  };
  const handleStreet = (e) => {
    setStreet(e.target.value);
    setSubmitted(false);
  };
  const handleCounty = (e) => {
    setCounty(e.target.value);
    setSubmitted(false);
  };
  const [redirect, setRedirect] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleClick() {
    setWord(temp);
  }
  // Changing the URL only when the user
  // changes the input
  useEffect(() => {
    setQrCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}`
    );
  }, [word, size]);

  //pentru container 2
  const handleCode = (e) => {
    console.log(e.target.value);
    setCode(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (city === "" || street === "") {
      setError(true);
    } else {
      console.log(state.token);
      const loginCall = await fetch(
        "http://localhost:3604/userflat/createorjoinflat",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: state.token,
          },

          body: JSON.stringify({
            Name: name,
            City: city,
            Street: street,
            County: county,
          }),
        }
      );
      const json = await loginCall.json();

      console.log(json);
      if (!json.error) {
        //aici???
        // setToken(json.accessToken);
        console.log(state.token);
        setSubmitted(true);
        setError(false);
        setTimeout(() => setRedirect({ redirect: true }), 2000);
      } else {
        setSubmitted(false);
        setError(json.error);
      }
    }
  };
  if (redirect) {
    console.log(redirect);
    return <Navigate to="/dashboard" state={state} />;
    // dac inlocuiesc cu state={{ token: token }}in consola o sa imi dea ceva eroare de la id.
  }

  return (
    <div id="content">
      <div className="home">
        <div className="featuredItem">
          <div>
            {/* <input name='code' placeholder='Enter code' type="text" className="search" value={code} onChange={handleCode} />
                        <button onSubmit={onSubmitHandler}>Enter</button> */}

            <div className="featuredTitle">
              <h3 style={style}>
                Do you look for a flat? Enter the code and join
              </h3>
            </div>
            <div className="featuredTitle">
              <TextField
                style={style}
                id="outlined-basic"
                onChange={handleName}
                variant="outlined"
                label="Name"
                type="text"
                fullWidth
              />
            </div>
            <div className="featuredTitle">
              <TextField
                style={style}
                id="outlined-basic"
                onChange={handleCity}
                variant="outlined"
                label="City"
                type="text"
                fullWidth
              />
            </div>
            <div className="featuredTitle">
              <TextField
                style={style}
                id="outlined-basic"
                onChange={handleStreet}
                variant="outlined"
                label="Street"
                type="text"
                fullWidth
              />
            </div>
            <div className="featuredTitle">
              <TextField
                style={style}
                id="outlined-basic"
                onChange={handleCounty}
                variant="outlined"
                label="County"
                type="text"
                fullWidth
              />
            </div>
            {/* <TextField required id="outlined-basic" label="Please confirm the password"
                                style={btnStyle} type="password" variant="outlined" fullWidth /> */}

            <div className="featuredTitle">
              <Button
                style={style}
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                Enter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
