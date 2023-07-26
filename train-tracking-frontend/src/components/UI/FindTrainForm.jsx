import React, { useState } from "react";
import "../../styles/find-train-form.css";
import Select from "react-select";
import { Form, FormGroup } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const FindTrainForm = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleClassSelect = (event) => {
    setSelectedClass(event.target.value);
  };
  const navigate = useNavigate();
  const handleFindTrain = () => {
    navigate(`/trains/${selectedClass}`);
  };

  return (
    <Form className="form">
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          {/* <input type="text" placeholder="From Station" required /> */}
          <Select placeholder="From Station" />
        </FormGroup>

        <FormGroup className="form__group">
          {/* <input type="text" placeholder="To Station" required /> */}
          <Select placeholder="To Station" />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="date" placeholder="Journey date" required />
        </FormGroup>

        <FormGroup className="form__group">
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle
              caret
              style={{
                backgroundColor: "transparent",
                color: "#000",
                fontSize: "16px",
                padding: "10px 20px",
                width: "100%",
              }}
            >
              {selectedClass ? selectedClass : "Select Class"}
            </DropdownToggle>
            <DropdownMenu
              style={{
                backgroundColor: "#fff",
                border: "none",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
                width: "100%",
              }}
            >
              <DropdownItem value="Economy" onClick={handleClassSelect}>
                Economy
              </DropdownItem>
              <DropdownItem value="Business" onClick={handleClassSelect}>
                Business
              </DropdownItem>
              <DropdownItem value="First Class" onClick={handleClassSelect}>
                First Class
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="No of Passengers" required />
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__train-btn" onClick={handleFindTrain}>
            Find Train
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindTrainForm;
