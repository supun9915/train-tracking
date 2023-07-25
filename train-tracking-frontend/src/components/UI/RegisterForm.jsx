import React, { useState, useEffect } from "react";
import { request, POST } from "../../api/ApiAdapter";

const Register = () => {
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    nic: "",
    contact: "",
    username: "",
    password: "",
  });

  const handleCloseModal = () => {
    setUser({
      name: "",
      email: "",
      nic: "",
      contact: "",
      username: "",
      password: "",
    });
  };

  const onChange = (e) => {
    setUser((state) => ({
      ...state,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const createAccount = async () => {
    if (errors.length === 0) {
      const res = await request("v1/user/create", POST, {
        ...user,
      });
      if (!res.error) {
        // toast.success("Created");
        handleCloseModal();
      } else {
        // toast.error(res.error.response.data);
      }
    } else {
      // toast.error("Required field cannot be empty");
    }
  };

  useEffect(() => {
    // handleCloseModal();
    const newErrors = [];
    if (user.name === "") {
      newErrors.push({ label: "user.name", value: "Required" });
    }
    if (user.email === "") {
      newErrors.push({ label: "user.email", value: "Required" });
    }
    if (user.contact === "") {
      newErrors.push({ label: "user.contact", value: "Required" });
    }
    if (user.password === "") {
      newErrors.push({ label: "user.password", value: "Required" });
    }
    if (user.username === "") {
      newErrors.push({ label: "user.username", value: "Required" });
    }
    setErrors([...newErrors]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div class="mb-4 mb-lg-0 w-100">
      <div class="card">
        <div class="card-body py-5 px-md-5">
          <h1 className="mb-4">Create a account</h1>
          <form action="">
            <div className="md:flex md:justify-between md:gap-4">
              <div class="mb-3 w-full">
                <label for="exampleInputEmail1" class="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="name"
                  name="name"
                  aria-describedby="emailHelp"
                  value={user.name}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="mb-3 w-full">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control form-control-sm"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  value={user.email}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="md:flex md:justify-between md:gap-4">
              <div class="mb-3 w-full">
                <label
                  for="exampleInputEmail1"
                  class="form-label form-label-sm"
                >
                  NIC
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="nic"
                  name="nic"
                  aria-describedby="emailHelp"
                  value={user.nic}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="mb-3 w-full">
                <label
                  for="exampleInputEmail1"
                  class="form-label form-label-sm"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="contact"
                  name="contact"
                  aria-describedby="emailHelp"
                  value={user.contact}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="md:flex md:justify-between md:gap-4">
              <div class="mb-3 w-full">
                <label for="exampleInputEmail1" class="form-label">
                  Username
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="username"
                  name="username"
                  aria-describedby="emailHelp"
                  value={user.username}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="mb-3 w-full">
                <label for="exampleInputEmail1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control form-control-sm"
                  id="password"
                  name="password"
                  aria-describedby="emailHelp"
                  value={user.password}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <button
              onClick={createAccount}
              type="button"
              className={
                errors.length !== 0
                  ? "bg-gray-200 p-2 rounded-md text-white text-xs hover:bg-gray-200 w-20"
                  : "bg-blue-500 p-2 text-white text-xs w-20 rounded-md shadow-md"
              }
              disabled={errors.length !== 0}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
