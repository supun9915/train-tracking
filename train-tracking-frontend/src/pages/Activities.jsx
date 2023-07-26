import React, { useState } from "react";

const Activities = () => {
  const [status, setStatus] = useState(false);

  const setPending = () => {
    if (status === true) {
      setStatus(false);
    }
  };

  const setDone = () => {
    if (status === false) {
      setStatus(true);
    }
  };

  return (
    <div className=" min-h-[52vh]">
      <div>
        <button
          className={` hover:bg-blue-400 w-40 p-2 ${
            status === false ? "bg-blue-500" : ""
          }`}
          type="button"
          onClick={setPending}
        >
          On Going Activities
        </button>
        <button
          className={` hover:bg-blue-400 w-40 p-2 ${
            status === true ? "bg-blue-500" : ""
          }`}
          type="button"
          onClick={setDone}
        >
          Completed Activities
        </button>
      </div>
      <div className="  w-full">
        <div className=" border-3 rounded-md mt-2 mb-2 border-slate-400 ml-4 w-3/4 flex">
          <div className=" w-1/6">
            <img
              src="https://adaderanaenglish.s3.amazonaws.com/1659868127-train-services.jpg"
              alt=""
              style={{ maxWidth: "200px" }}
              className="p-2"
            />
          </div>
          <div className=" w-2/6">
            <div className=" text-2xl font-bold">Train Name</div>
            <div className=" text-sm text-slate-700 -mt-2 font-bold">Date</div>
            <div className="flex">
              <div className={status === false ? "visible" : "hidden"}>
                Jurney will Start at 2023/03/25 08:45:54
              </div>
              <div className={status === false ? "visible" : "hidden"}>
                Jurney will Stop at 2023/03/25 08:45:54
              </div>
              <div className={status === true ? "visible" : "hidden"}>
                Jurney Started at 2023/03/25 08:45:54
              </div>
              <div className={status === true ? "visible" : "hidden"}>
                Jurney Stoped at 2023/03/25 08:45:54
              </div>
            </div>
          </div>
          <div className="w-1/6 justify-center flex items-center">
            <div className=" text-2xl font-bold pr-2">Price =</div>
            <div className=" text-2xl font-bold">Rs: 500/=</div>
          </div>
          <div className="w-2/6">
            <div className=" ml-4 mt-4 text-xl font-bold">
              Current Location - Galle Station
            </div>
            <div
              className={`text-red-400 ml-4 mt-2 text-xl font-bold ${
                status === false ? "visible" : "hidden"
              }`}
            >
              Train will Delay - 15min
            </div>
            <div
              className={`text-red-400 ml-4 mt-2 text-xl font-bold ${
                status === true ? "visible" : "hidden"
              }`}
            >
              Train was Delayed - 15min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
