import React from "react";
import Helmet from "../components/Helmet/Helmet";
import LoginForm from "../components/UI/LoginForm";
import "../styles/login.css";
import logo from "../assets/all-images/train1.jpg";

const Login = () => {
  return (
    <Helmet title="Login">
      <div
        class="px-4 py-2 px-md-4 text-center text-lg-start min-vh-100 d-flex justify-content-center align-items-center find__trains-left"
        style={{ backgroundImage: `url(${logo})` }}
      >
        <div class=" rounded-4 px-md-4">
          <div class="row gx-lg-5 align-items-center">
            <div class="col-lg-8 mb-8 mb-lg-0">
              <div
              // style={{
              //   display: "inline-block",
              //   padding: "0.2em 0.4em",
              //   borderRadius: "4px",
              //   // border: "2px solid rgb(19, 255, 201)", // Border color
              //   color: "rgb(255, 255, 19)",
              //   backgroundColor: "rgba(0, 0, 0, 0.50)",
              // }}
              >
                <h1
                  class="my-5 display-3 fw-bold ls-tigh"
                  style={{ color: "rgb(19, 255, 201)" }}
                >
                  The best offer <br />
                  <span>for your business</span>
                </h1>
              </div>
              <div className="mt-2">
                <p style={{ color: "rgb(19, 201, 255)" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
              </div>
            </div>
            <div className="col">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;
