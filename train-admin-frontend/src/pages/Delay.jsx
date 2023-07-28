import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { Modal, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import * as Md from "react-icons/md";
import * as Bi from "react-icons/bi";
import Select from "react-select";
import ReactLoading from "react-loading";

import { AiOutlineReload } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request, GET, POST, PATCH, PUT } from "../api/ApiAdapter";

const Delay = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //   const navigate = useNavigate();
  const [openModalDeleteConfirm, setOpenModalDeleteConfirm] = useState(false);
  const [idDelete, setDeleteId] = useState();
  const [editMode, setEditMode] = useState("edit");
  const [openModal, setOpenModal] = useState(false);
  const [schedule, setSchedule] = useState({
    depStationId: "",
    arrStationId: "",
    departureTime: "",
    arrivalTime: "",
    trainId: "",
  });
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [deps, setDeps] = useState([]);
  const [dep, setDep] = useState();
  const [arrs, setArrs] = useState([]);
  const [arr, setArr] = useState();
  const [tras, setTras] = useState([]);
  const [tra, setTra] = useState();

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

  const styleConfirm = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    overflow: "hidden",
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const loadAllScheduleData = async () => {
    const res = await request(`schedule/getAll`, GET);
    if (!res.error) {
      setRows(res);
    }
    // else navigate("/page/unauthorized/access");
  };

  const reload = () => {
    setRows([]);
    loadAllScheduleData();
  };

  useEffect(() => {
    const newErrors = [];
    if (schedule.name === "") {
      newErrors.push({ label: "schedule.name", value: "Required" });
    }
    if (schedule.address === "") {
      newErrors.push({ label: "schedule.address", value: "Required" });
    }
    if (schedule.contact === "") {
      newErrors.push({ label: "schedule.contact", value: "Required" });
    }
    setErrors([...newErrors]);
    loadAllScheduleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    // setEnabledEdit(false);
    setLoading(false);
    setSchedule({
      depStationId: "",
      arrStationId: "",
      departureTime: "",
      arrivalTime: "",
      trainId: "",
    });
    reload();
    setOpenModalDeleteConfirm(false);
  };

  const handleDeleteConfirmModel = (e, row) => {
    e.stopPropagation();
    setDeleteId(row.id);
    setOpenModalDeleteConfirm(true);
  };

  const onDelete = () => {
    deleteAccount(idDelete);
  };

  const deleteAccount = async (id) => {
    const res = await request(`schedule/delete`, PATCH, {
      delete: true,
      id,
    });
    if (!res.error) {
      toast.success("Delete schedule successfully..!");
      setOpenModalDeleteConfirm(false);

      reload();
    } else {
      toast.error("Unable to delete schedule...!");
    }
  };

  const loadAllStationDep = async () => {
    const res = await request(`station/getustation`, GET);
    if (!res.error) {
      const newDep = [];
      res.forEach((item) => {
        newDep.push({ label: item.name, value: item });
      });
      setDeps(newDep);
      // console.log(res);
    }
  };

  const loadAllStationArr = async () => {
    const res = await request(`station/getustation`, GET);
    if (!res.error) {
      const newArr = [];
      res.forEach((item) => {
        newArr.push({ label: item.name, value: item });
      });
      setArrs(newArr);
      // console.log(res);
    }
  };

  const loadAllTrainData = async () => {
    const res = await request(`train/getutrain`, GET);
    if (!res.error) {
      const newTrains = [];
      res.forEach((item) => {
        newTrains.push({ label: item.name, value: item });
      });
      setTras(newTrains);
    }
    // else navigate("/page/unauthorized/access");
  };

  const handleOpenModal = (e, row) => {
    loadAllStationDep();
    loadAllStationArr();
    loadAllTrainData();
    e.stopPropagation();
    setSchedule(row);
    setOpenModal(true);
  };

  const onChange = (e) => {
    setSchedule((state) => ({
      ...state,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const createStation = async () => {
    const res = await request("schedule/create", POST, {
      ...schedule,
    });
    if (!res.error) {
      toast.success("Create schedule successfully..!");
      handleCloseModal();
      setLoading(false);
    } else {
      toast.error(res.error.response.data);
      setLoading(false);
      // console.log(res);
    }
  };

  const updateStation = async () => {
    const res = await request(`schedule/update/${schedule.id}`, PUT, {
      name: schedule.name,
      address: schedule.address,
      contact: schedule.contact,
    });
    if (!res.error) {
      toast.success("Update schedule successfully..!");
      handleCloseModal();
      setLoading(false);
    } else {
      toast.error(res.error.response.data);
      setLoading(false);
    }
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

  return (
    <div className="settings">
      <div className="settings__wrapper">
        <h2 className="settings__title">Delay</h2>
        <div>
          <div className="w-full mb-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={(e) => {
                setEditMode("add");
                handleOpenModal(e, schedule);
                // setEnabledEdit(true);
              }}
              className="px-2 py-1 bg-[#00A05E] rounded-md shadow-md cursor-pointer"
            >
              <Md.MdAdd color="white" />
            </button>
            <button
              type="button"
              onClick={() => reload()}
              className="px-2 py-1 bg-blue-400 rounded-md shadow-md cursor-pointer"
            >
              <AiOutlineReload color="white" />
            </button>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#30405D" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "#D1F1F9",
                      fontSize: ".8em",
                      fontWeight: 800,
                      paddingY: ".5em",
                    }}
                  >
                    Train
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#D1F1F9",
                      fontSize: ".8em",
                      fontWeight: 800,
                      paddingY: ".5em",
                    }}
                  >
                    Delayed Time
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#D1F1F9",
                      fontSize: ".8em",
                      fontWeight: 800,
                      paddingY: ".5em",
                    }}
                    align="center"
                  >
                    Schedule
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#D1F1F9",
                      fontSize: ".8em",
                      fontWeight: 800,
                      paddingY: ".5em",
                    }}
                    align="center"
                  >
                    Date
                  </TableCell>

                  <TableCell
                    sx={{
                      color: "#D1F1F9",
                      fontSize: ".8em",
                      fontWeight: 800,
                      paddingY: ".5em",
                    }}
                    align="center"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "#EDF3FB" }}>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: ".7em",
                        color: "#d3d3dd3",
                        paddingY: ".5em",
                      }}
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: ".7em",
                        color: "#d3d3dd3",
                        paddingY: ".5em",
                      }}
                    >
                      {row.a}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: ".7em",
                        color: "#d3d3dd3",
                        paddingY: ".5em",
                      }}
                      align="center"
                    >
                      {row.b}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: ".7em",
                        color: "#d3d3dd3",
                        paddingY: ".5em",
                      }}
                      align="center"
                    >
                      {/* {row.createdTime} */}
                      {/* {format(row.createdTime * 1000, "yyyy-MM-dd hh:mm")} */}
                    </TableCell>
                    <TableCell align="center" sx={{ paddingY: ".5em" }}>
                      <div className="flex justify-center space-x-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            setEditMode("edit");
                            handleOpenModal(e, row);
                            // setEditEnabled(false);
                          }}
                          className="cursor-pointer rounded-md p-1 text-yellow-500"
                        >
                          <Bi.BiEdit size="1.5em" />
                        </button>
                        <button
                          onClick={(e) => {
                            setOpenModalDeleteConfirm();
                            handleDeleteConfirmModel(e, row);
                          }}
                          type="button"
                          className="cursor-pointer rounded-md p-1 text-red-500"
                        >
                          <Md.MdDelete size="1.5em" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{
              ".MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-displayedRows, .MuiTablePagination-actions, .MuiTablePagination-menuItem":
                {
                  fontSize: "0.8em",
                  color: "white",
                },
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {loading && (
                <ReactLoading
                  className="z-50 absolute right-[40%] top-1/2"
                  type="bubbles"
                  color="#30405D"
                />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">
                    {editMode === "add" ? "Add" : "Edit"} Schedule
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCloseModal()}
                    disabled={loading === true}
                    className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                  >
                    <Md.MdOutlineClose />
                  </button>
                </div>

                <div className="  text-xs">
                  {/* <h3></h3> */}
                  <div className="flex mt-4 space-x-4 w-full">
                    <div className="flex-col w-full">
                      <label htmlFor="trainId" className="text-gray-500">
                        <div className="flex">
                          Trains <span className="text-red-500">*</span>
                        </div>
                      </label>
                      <Select
                        options={tras}
                        // value={tra}
                        // isMulti
                        // onChange={(e) => {
                        //   setTra(e);
                        // }}
                        styles={customStyles}
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label htmlFor="arrStationId" className="text-gray-500">
                        <div className="flex">
                          Schedule <span className="text-red-500">*</span>
                        </div>
                      </label>
                      <Select
                        options={arrs}
                        // value={arr}
                        // isMulti
                        // onChange={(e) => {
                        //   setArr(e);
                        // }}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  {/* <div className="text-sm flex mt-4 font-bold ml-0">
                        <div
                          className={`text-input flex -mt-[0.2em] -ml-3 ${
                            editMode === "edit" ? "visible" : "hidden"
                          }`}
                        >
                          <Checkbox
                            name="enableEdit"
                            id="enableEdit"
                            onChange={(e) => setEditEnabled(e)}
                          />
                        </div>
                        <label htmlFor="enableEdit" className="pt-2 text-sm">
                          {editMode === "edit" ? "Edit " : null} Tracker Account
                        </label>
                      </div> */}

                  <div className="flex mt-4 space-x-4 w-1/2 ">
                    <div className="flex-col w-full">
                      <label htmlFor="departureTime" className="text-gray-500">
                        <div className="flex">
                          Delay Time(minutes){" "}
                          <span className="text-red-500">*</span>
                        </div>
                      </label>
                      <input
                        id="departureTime"
                        onChange={(e) => onChange(e)}
                        name="departureTime"
                        type="number"
                        placeholder="Enter Tracker Account Contact"
                        className="border-2 p-2 text-gray-600 rounded-md shadow-sm w-full mt-1"
                        value={schedule.departureTime}
                      />
                    </div>
                  </div>
                  {/* <div className="flex mt-4 space-x-4 w-full ">
                    <div className="flex-col w-full">
                      <label htmlFor="trainId" className="text-gray-500">
                        <div className="flex">
                          Trains <span className="text-red-500">*</span>
                        </div>
                      </label>
                      <Select
                        options={tras}
                        // value={tra}
                        // isMulti
                        // onChange={(e) => {
                        //   setTra(e);
                        // }}
                        styles={customStyles}
                      />
                    </div>
                  </div> */}
                  {/* ttt */}
                  {/* <div
                        className={`flex mt-4 space-x-4 w-full ${
                          editMode === "edit" && enabledEdit === false
                            ? "hidden"
                            : "visible"
                        }`}
                      >
                        <div className="flex-col w-full">
                          <label htmlFor="appkey" className="text-gray-500">
                            <div className="flex">
                              App Key <span className="text-red-500">*</span>
                            </div>
                          </label>
                          <input
                            id="appkey"
                            onChange={(e) => onChange(e)}
                            name="appkey"
                            type="text"
                            placeholder="Enter Tracker Account App Key"
                            className="border-2 p-2 text-gray-600 rounded-md shadow-sm w-full mt-1"
                            value={schedule.appkey?.trim()}
                          />
                        </div>
                        <div className="flex-col w-full">
                          <label htmlFor="appSecret" className="text-gray-500">
                            <div className="flex">
                              App Secret <span className="text-red-500">*</span>
                            </div>
                          </label>
                          <input
                            id="appSecret"
                            onChange={(e) => onChange(e)}
                            name="appSecret"
                            type="text"
                            placeholder="Enter Tracker Account App Secret"
                            className="border-2 p-2 text-gray-600 rounded-md shadow-sm w-full mt-1"
                            value={schedule.appSecret?.trim()}
                          />
                        </div>
                      </div> */}
                </div>
              </div>
              <div className="bg-gray-100 p-2 flex justify-end">
                <div className="space-x-4">
                  <button
                    onClick={editMode === "add" ? createStation : updateStation}
                    type="button"
                    disabled={errors.length !== 0 || loading === true}
                    className={
                      errors.length !== 0 || loading === true
                        ? "bg-gray-200 p-2 rounded-md text-white text-xs hover:bg-gray-200 w-20"
                        : "bg-blue-500 p-2 text-white text-xs w-20 rounded-md shadow-md"
                    }
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    disabled={loading === true}
                    className="bg-red-500 p-2 text-xs text-white rounded-md w-20 shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Box>
          </Modal>

          <Modal
            open={openModalDeleteConfirm}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleConfirm}>
              <div>
                <div className="p-6">
                  <div className="flex mb-4 items-center justify-between">
                    <div className="text-lg font-bold">
                      Do you want to delete this Schedule..!
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCloseModal()}
                      className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                    >
                      <Md.MdOutlineClose />
                    </button>
                  </div>
                  <div className="text-xs text-gray-700 space-y-1">
                    <div className="font-semibold">{`If you complete this, you can't reverse it.`}</div>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 flex justify-end rounded-b-xl">
                  <div className="space-x-4">
                    <button
                      onClick={() => {
                        onDelete();
                      }}
                      type="button"
                      className="bg-red-500 p-2 text-white text-xs rounded-md shadow-md mr-1 w-20"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleCloseModal}
                      type="button"
                      className=" bg-blue-500 p-2 text-xs text-white rounded-md shadow-md mr-4 w-20"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default Delay;