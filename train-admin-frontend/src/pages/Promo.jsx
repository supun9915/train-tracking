import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import Select from "react-select";

import ReactLoading from "react-loading";

// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Promo = () => {
  const [schedule, setSchedule] = useState({
    depStationId: "",
    arrStationId: "",
    departureTime: "",
    arrivalTime: "",
    trainId: "",
  });
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);

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

  const customStyles = {
    control: (base, state) => ({
      ...base,
      cursor: "pointer",
      minHeight: "37px",
      height: "37px",
      backgroundColor: "",
      boxShadow: state.isFocused ? null : null,
      // borderColor: state.isFocused ? '#30405D' : null,
      borderColor: "#E5E7EB",
      borderWidth: "medium",
      borderRadius: "0.6em",
      "&:hover": {
        borderColor: state.isFocused ? "#30405D" : null,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isSelected ? "#30405D" : "#EDF3FB",
      "&:hover": {
        backgroundColor: !state.isSelected ? "#dbe2e9" : null,
      },
    }),
  };

  const options = [
    { value: "First Class", label: "First Class" },
    { value: "Second Class", label: "Second Class" },
    { value: "Economy Class", label: "Economy Class" },
  ];

  return (
    <div className="settings">
      <div className="settings__wrapper">
        <h2 className="settings__title">Promotion Management</h2>
        <div>
          <div className="pl-6 pr-6 pb-6">
            <div className="  text-xs">
              <div className="flex mt-4 space-x-4 w-full pb-2">
                <div className="flex-col w-full">
                  <label htmlFor="class" className=" text-slate-50">
                    <div className="flex">
                      Select Class <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <Select
                    options={options}
                    value={options[0]}
                    // isMulti
                    // onChange={(e) => {
                    //   setValues({ ...values, trainId: e });
                    // }}
                    // styles={customStyles}
                  />
                </div>
                <div className="flex-col w-full">
                  <label htmlFor="promo" className=" text-slate-50">
                    <div className="flex">
                      Promo Code <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    id="promo"
                    // onChange={(e) => onChange(e)}
                    name="promo"
                    type="text"
                    placeholder="Enter Tracker Account Contact"
                    className="border-2 p-2 text-gray-600 rounded-md shadow-sm w-full mt-1"
                    value={"T%fDT4d45ddsdfJ"}
                  />
                </div>
              </div>

              <div className="flex mt-4 space-x-4 w-full pb-2">
                <div className="flex-col w-full">
                  <label htmlFor="rounds" className=" text-slate-50">
                    <div className="flex">
                      Number Of Rounds <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    id="rounds"
                    // onChange={(e) => onChange(e)}
                    name="rounds"
                    type="number"
                    placeholder="Enter Tracker Account Contact"
                    className="border-2 p-2 text-gray-600 rounded-md shadow-sm w-full mt-1"
                    value={10}
                  />
                </div>
                <div className="flex-col w-full">
                  <label htmlFor="dis" className=" text-slate-50">
                    <div className="flex">
                      Discount (%) <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    id="dis"
                    // onChange={(e) => onChange(e)}
                    name="dis"
                    type="text"
                    placeholder="Enter Tracker Account Contact"
                    className="border-2 p-2 text-gray-600 rounded-md shadow-sm w-full mt-1"
                    value={"5"}
                  />
                </div>
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
export default Promo;
