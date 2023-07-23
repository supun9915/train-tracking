import React from "react";
import Helmet from "../components/Helmet/Helmet";
import "../styles/login.css";

const Login = () => {
  return (
    <Helmet title="Login">
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-2 login__find__trains-left p-0">
          <div className="col"></div>
          <div className="col">
            <section
              className="m-0 p-2"
              style={{ "background-color": "#9A616D;" }}
            >
              <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                  <div class="col col-md-8 col-xl-8">
                    <div class="card" style={{ "border-radius": "2rem;" }}>
                      <div class="row g-0">
                        <div class="d-flex align-items-center">
                          <div class="card-body p-4 p-lg-5 text-black">
                            <form>
                              <div class="d-flex align-items-center mb-3 pb-1">
                                <span class="h2 fw-bold mb-0">Sign Up</span>
                              </div>

                              <h6
                                class="fw-normal mb-3 pb-3"
                                style={{ "letter-spacing": "1px;" }}
                              >
                                Sign into your account
                              </h6>

                              <div class="form-outline mb-4">
                                <label class="form-label" for="form2Example17">
                                  Email address
                                </label>
                                <input
                                  type="email"
                                  id="form2Example17"
                                  class="form-control"
                                />
                              </div>

                              <div class="form-outline mb-4">
                                <label class="form-label" for="form2Example27">
                                  Password
                                </label>
                                <input
                                  type="password"
                                  id="form2Example27"
                                  class="form-control"
                                />
                              </div>

                              <div class="pt-1 mb-4 w-100">
                                <button
                                  class="btn btn-dark btn btn-block w-100"
                                  type="button"
                                >
                                  Login
                                </button>
                              </div>

                              <a class="small text-muted" href="#!">
                                Forgot password?
                              </a>
                              <p
                                class="mb-5 pb-lg-2"
                                style={{ color: "#393f81;" }}
                              >
                                Don't have an account?{" "}
                                <a
                                  href="/register"
                                  style={{ color: "#393f81;" }}
                                >
                                  Register here
                                </a>
                              </p>
                              <a href="#!" class="small text-muted">
                                Terms of use.
                              </a>
                              <a href="#!" class="small text-muted">
                                Privacy policy
                              </a>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* <section>
        <div>
          <section style={{ "background-color": "#9A616D;" }}>
            <div class="container py-5 h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-xl-5">
                  <div class="card" style={{ "border-radius": "2rem;" }}>
                    <div class="row g-0">
                      <div class="d-flex align-items-center find__trains-left">
                        <div class="card-body p-4 p-lg-5 text-black">
                          <form>
                            <div class="d-flex align-items-center mb-3 pb-1">
                              <span class="h1 fw-bold mb-0">Sign Up</span>
                            </div>

                            <h5
                              class="fw-normal mb-3 pb-3"
                              style={{ "letter-spacing": "1px;" }}
                            >
                              Sign into your account
                            </h5>

                            <div class="form-outline mb-4">
                              <input
                                type="email"
                                id="form2Example17"
                                class="form-control form-control-lg"
                              />
                              <label class="form-label" for="form2Example17">
                                Email address
                              </label>
                            </div>

                            <div class="form-outline mb-4">
                              <input
                                type="password"
                                id="form2Example27"
                                class="form-control form-control-lg"
                              />
                              <label class="form-label" for="form2Example27">
                                Password
                              </label>
                            </div>

                            <div class="pt-1 mb-4">
                              <button
                                class="btn btn-dark btn-lg btn-block"
                                type="button"
                              >
                                Login
                              </button>
                            </div>

                            <a class="small text-muted" href="#!">
                              Forgot password?
                            </a>
                            <p
                              class="mb-5 pb-lg-2"
                              style={{ color: "#393f81;" }}
                            >
                              Don't have an account?{" "}
                              <a href="#!" style={{ color: "#393f81;" }}>
                                Register here
                              </a>
                            </p>
                            <a href="#!" class="small text-muted">
                              Terms of use.
                            </a>
                            <a href="#!" class="small text-muted">
                              Privacy policy
                            </a>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section> */}
    </Helmet>
  );
};

export default Login;
