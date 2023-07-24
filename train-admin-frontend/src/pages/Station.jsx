import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import * as Bi from "react-icons/bi";
import * as Md from "react-icons/md";
// import { Modal, Box } from "@mui/material";

const Station = () => {
  return (
    <div className="settings">
      <div className="settings__wrapper">
        <h2 className="settings__title">Settings</h2>
        <div>
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
                  />
                  <TableCell
                    sx={{
                      color: "#D1F1F9",
                      fontSize: ".8em",
                      fontWeight: 800,
                      paddingY: ".5em",
                    }}
                  >
                    Station Name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#D1F1F9",
                      fontSize: ".8em",
                      fontWeight: 800,
                      paddingY: ".5em",
                    }}
                  >
                    Location
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
                    Contact
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
                    Created Date
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
                <TableRow
                  // key={row.id}

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
                    id
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: ".7em",
                      color: "#d3d3dd3",
                      paddingY: ".5em",
                    }}
                    scope="row"
                  >
                    {/* {row.name} */}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: ".7em",
                      color: "#d3d3dd3",
                      paddingY: ".5em",
                    }}
                  >
                    {/* {row.address} */}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: ".7em",
                      color: "#d3d3dd3",
                      paddingY: ".5em",
                    }}
                    align="center"
                  >
                    {/* {format(row.lastModified * 1000, 'yyyy-MM-dd hh:mm')} */}{" "}
                    Time
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: ".7em",
                      color: "#d3d3dd3",
                      paddingY: ".5em",
                    }}
                    align="center"
                  >
                    switch
                    {/* <Tooltip title="Active/Deactive" placement="left">
                          <Switch
                            name="active"
                            className="cursor-pointer"
                            checked={row.active}
                            size="small"
                            onChange={(e) => {
                              onChangeSw(e, row);
                            }}
                            align="center"
                          />
                        </Tooltip> */}
                  </TableCell>
                  <TableCell align="center" sx={{ paddingY: ".5em" }}>
                    <div className="flex justify-center space-x-4">
                      {/* <Tooltip title="Edit" placement="left"> */}
                      <button
                        type="button"
                        // onClick={(e) => {
                        //   setEditMode("edit");
                        //   handleOpenModal(e, row);
                        //   setEditEnabled(false);
                        // }}
                        className="cursor-pointer rounded-md p-1 text-yellow-500"
                      >
                        <Bi.BiEdit size="1.5em" />
                      </button>
                      {/* </Tooltip> */}
                      {/* <Tooltip title="Delete" placement="left"> */}
                      <button
                        // onClick={(e) => {
                        //   setOpenModalDeleteConfirm();
                        //   handleDeleteConfirmModel(e, row);
                        // }}
                        type="button"
                        className="cursor-pointer rounded-md p-1 text-red-500"
                      >
                        <Md.MdDelete size="1.5em" />
                      </button>
                      {/* </Tooltip> */}
                    </div>
                  </TableCell>
                </TableRow>
                {/* ))} */}
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
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            // count={rows.length}
            // rowsPerPage={rowsPerPage}
            // page={page}
            // onPageChange={handleChangePage}
            // onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Station;
