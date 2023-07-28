import React, { useState, useEffect } from "react";
import { request, GET } from "../api/ApiAdapter";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";

const Activities = () => {
  const [completedList, setCompletedList] = useState([]);
  const [pendingList, setPendingList] = useState([]);

  const getOngoing = async () => {
    const res = await request(`/passenger/activity/ongoing`, GET);
    if (!res.error) {
      setPendingList(res);
    } else {
      console.log(res);
      // toast.error('Unable to load shuttle data..!');
    }
  };

  const getCompleted = async () => {
    const res = await request(`/passenger/activity/completed`, GET);
    if (!res.error) {
      setCompletedList(res);
    } else {
      console.log(res);
      // toast.error('Unable to load shuttle data..!');
    }
  };

  useEffect(() => {
    getOngoing();
    getCompleted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" min-h-[52vh]">
      <Tabs>
        <TabList>
          <Tab>Ongoing</Tab>
          <Tab>Completed</Tab>
        </TabList>

        <TabPanel>
          {pendingList.map((activity) => (
            <div className="container">
              <div className="row border-3 rounded-md mt-2 mb-2 border-slate-400 ml-4 flex">
                <div className="col-12 col-md-2">
                  <img
                    src="https://adaderanaenglish.s3.amazonaws.com/1659868127-train-services.jpg"
                    alt=""
                    style={{ maxWidth: "200px" }}
                    className="mt-3 mt-md-2 mb-md-2"
                  />
                </div>
                <div className="col-12 col-md-4 mt-2 p-md-2">
                  <div className=" text-2xl font-bold">
                    {activity?.schedule?.train?.name}
                  </div>
                  <div className=" text-sm text-slate-700 mt-1 font-bold">
                    Date
                  </div>
                  <div className="flex">
                    <div>Start at {activity?.schedule?.departureTime}</div>
                    <div>Stop at {activity?.schedule?.arrivalTime}</div>
                  </div>
                </div>
                <div className="col-12 col-md-2  mt-2 justify-center flex items-center">
                  <div className=" text-2xl font-bold pr-2">Price =</div>
                  <div className=" text-2xl font-bold">
                    Rs: {activity?.payment?.total}/=
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className=" text-xl font-bold">
                    Current Location - {activity?.schedule?.location?.name}{" "}
                    Station
                  </div>
                  <div
                    className={`text-red-400 ml-4 mt-2 text-xl font-bold ${
                      activity?.schedule?.delay ? "visible" : "hidden"
                    }`}
                  >
                    Train Delay - {activity?.schedule?.delay}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </TabPanel>
        <TabPanel>
          {pendingList.map((activity) => (
            <div className="container">
              <div className="row border-3 rounded-md mt-2 mb-2 border-slate-400 ml-4 flex">
                <div className="col-12 col-md-2">
                  <img
                    src="https://adaderanaenglish.s3.amazonaws.com/1659868127-train-services.jpg"
                    alt=""
                    style={{ maxWidth: "200px" }}
                    className="mt-3 mt-md-2 mb-md-2"
                  />
                </div>
                <div className="col-12 col-md-4 mt-2 p-md-2">
                  <div className=" text-2xl font-bold">
                    {activity?.schedule?.train?.name}
                  </div>
                  <div className=" text-sm text-slate-700 mt-1 font-bold">
                    Date
                  </div>
                  <div className="flex">
                    <div>Start at {activity?.schedule?.departureTime}</div>
                    <div>Stop at {activity?.schedule?.arrivalTime}</div>
                  </div>
                </div>
                <div className="col-12 col-md-2  mt-2 justify-center flex items-center">
                  <div className=" text-2xl font-bold pr-2">Price =</div>
                  <div className=" text-2xl font-bold">
                    Rs: {activity?.payment?.total}/=
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className=" text-xl font-bold">
                    Current Location - {activity?.schedule?.location?.name}{" "}
                    Station
                  </div>
                  <div
                    className={`text-red-400 ml-4 mt-2 text-xl font-bold ${
                      activity?.schedule?.delay ? "visible" : "hidden"
                    }`}
                  >
                    Train Delay - {activity?.schedule?.delay}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Activities;
