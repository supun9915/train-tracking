import React, { useState } from "react";
import "../../styles/find-train-form.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/features/authSlice";
import { POST, request } from "../../api/ApiAdapter";

const LoginForm = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const login = async () => {
    try {
      const result = await request("/auth/login", POST, input);
      if (!result.error) {
        dispatch(setCredentials(result));
        localStorage.setItem("token", result.token.toString());
        navigate("/");
      } else {
        setError(result);
        console.error(result);
      }
    } catch (error) {}
  };

  const onInputChange = (e) => {
    setError("");
    setInput({
      ...input,
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
    });
  };

  return (
    <div class="mb-4 mb-lg-0 w-100 ">
      <div className="card" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
        <div className="grid place-items-center mt-52 ">
          <h1 className="mb-5 text-white">Welcome Back!!!</h1>
          <form action="" className="w-[20em] h-[30em]">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label text-white">
                Username
              </label>
              <input
                name="username"
                onChange={(e) => onInputChange(e)}
                type="text"
                class="form-control form-control-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label text-white">
                Password
              </label>
              <input
                name="password"
                onChange={(e) => onInputChange(e)}
                type="password"
                class="form-control form-control-sm"
                id="exampleInputPassword1"
              />
            </div>
            <button
              type="button"
              class="btn w-48 ml-16 btn-primary mt-10"
              onClick={() => login()}
            >
              Submit
            </button>
            {error !== "" && (
              <div className="text-red-500 mt-4 flex justify-center items-center w-full text-sm">
                The username or password is incorrect
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
