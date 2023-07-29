import React, { useState } from "react";
import { Modal, Box } from "@mui/material";

import ReactLoading from "react-loading";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Ticket = () => {
  const [schedule, setSchedule] = useState({
    first: "",
    second: "",
    third: "",
  });
  const [loading, setLoading] = useState();

  const schema = Yup.object({
    first: Yup.number().min(10).required(),
    second: Yup.number().min(10).required(),
    third: Yup.number().min(10).required(),
  });

  const user = {
    first: "",
    second: "",
    third: "",
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    overflow: "hidden",
  };

  const {
    resetForm,
    setValues,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: user,
    validationSchema: schema,
  });

  return (
    <div className="settings">
      <div className="settings__wrapper">
        <h2 className="settings__title">Ticket Management</h2>
        <div>
          <div className="pl-6 pr-6 pb-6">
            <div className="  text-xs">
              <div className="flex mt-4 space-x-4 w-full pb-2">
                <div className="flex-col w-full">
                  <label htmlFor="first" className=" text-slate-50">
                    <div className="flex">
                      First Class Ticket Price{" "}
                      <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    id="first"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="first"
                    type="number"
                    placeholder="Enter First class ticket price"
                    className={
                      "border-2 p-2 mt-1 text-gray-600 rounded-md shadow-sm w-full " +
                      (errors.first && touched.first
                        ? "ring-1 ring-red-500"
                        : "")
                    }
                    value={values.first}
                  />
                  <div className="text-red-500">
                    {errors.first && touched.first && errors.first}
                  </div>
                </div>
                <div className="flex flex-col w-full"></div>
              </div>

              <div className="flex mt-4 space-x-4 w-full pb-2">
                <div className="flex-col w-full">
                  <label htmlFor="second" className=" text-slate-50">
                    <div className="flex">
                      Second Class Ticket Price{" "}
                      <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    id="second"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="second"
                    type="number"
                    placeholder="Enter Second class ticket price"
                    className={
                      "border-2 p-2 mt-1 text-gray-600 rounded-md shadow-sm w-full " +
                      (errors.second && touched.second
                        ? "ring-1 ring-red-500"
                        : "")
                    }
                    value={values.second}
                  />
                  <div className="text-red-500">
                    {errors.second && touched.second && errors.second}
                  </div>
                </div>
                <div className="flex flex-col w-full"></div>
              </div>
              <div className="flex mt-4 space-x-4 w-full">
                <div className="flex-col w-full">
                  <label htmlFor="third" className=" text-slate-50">
                    <div className="flex">
                      Economy Class Ticket Price{" "}
                      <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    id="third"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="third"
                    type="number"
                    placeholder="Enter economy class ticket price"
                    className={
                      "border-2 p-2 mt-1 text-gray-600 rounded-md shadow-sm w-full " +
                      (errors.third && touched.third
                        ? "ring-1 ring-red-500"
                        : "")
                    }
                    value={values.third}
                  />
                  <div className="text-red-500">
                    {errors.third && touched.third && errors.third}
                  </div>
                </div>
                <div className="flex flex-col w-full"></div>
              </div>
              <div className="flex mt-4 space-x-4 w-full">
                <div className="flex flex-col w-full">
                  <button
                    // onClick={editMode === "add" ? createStation : updateStation}
                    type="button"
                    disabled={errors.length !== 0 || loading === true}
                    className={
                      errors.length !== 0 || loading === true
                        ? "bg-gray-200 p-2 rounded-md text-white text-xs hover:bg-gray-200 w-20"
                        : "bg-blue-500 mt-6 p-2 text-white text-xs w-20 rounded-md shadow-md"
                    }
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end"></div>
        </div>
      </div>
    </div>
  );
};
export default Ticket;
