import React from "react";

const UpdateForm = () => {
  return (
    <div class="mb-4 mb-lg-0 w-100">
      <div class="card">
        <div class="card-body py-5 px-md-5">
          <h1 className="mb-4">Edit your account</h1>
          <form action="">
            <div className="md:flex md:justify-between md:gap-4">
              <div class="mb-3 w-full">
                <label for="exampleInputEmail1" class="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3 w-full">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control form-control-sm"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
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
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
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
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
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
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3 w-full">
                <label for="exampleInputEmail1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control form-control-sm"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
            <button type="button" class="btn w-100 btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
