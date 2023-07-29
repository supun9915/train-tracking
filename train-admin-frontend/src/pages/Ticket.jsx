import React, { useState } from "react";
import { Modal, Box } from "@mui/material";

import ReactLoading from "react-loading";

// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Ticket = () => {
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
                      Fist Class Ticket Price{" "}
                      <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    id="first"
                    // onChange={(e) => onChange(e)}
                    name="first"
                    type="number"
                    placeholder="Enter Tracker Account Contact"
                    className="border-2 p-2 text-gray-600 rounded-md shadow-sm w-full mt-1"
                    value={850}
                  />
                </div>
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
                    // onChange={(e) => onChange(e)}
                    name="second"
                    type="number"
                    placeholder="Enter Tracker Account Contact"
                    className="border-2 p-2 text-gray-600 rounded-md shadow-sm w-full mt-1"
                    value={600}
                  />
                </div>
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
                    // onChange={(e) => onChange(e)}
                    name="third"
                    type="number"
                    placeholder="Enter Tracker Account Contact"
                    className="border-2 p-2 text-gray-600 rounded-md shadow-sm w-full mt-1"
                    value={450}
                  />
                </div>
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
