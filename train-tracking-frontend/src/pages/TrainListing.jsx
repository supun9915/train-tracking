import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import TrainItem from "../components/UI/TrainItem";
import trainData from "../assets/data/trainData";
// import FindTrainForm from "../components/UI/FindTrainForm";
import { request, GET } from "../api/ApiAdapter";
import { useParams } from "react-router-dom";
import "../styles/find-train-form.css";
import Select from "react-select";
import { Form, FormGroup } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const TrainListing = () => {
  const { clas, st, end, count, date } = useParams();
  const [startSt, setStartSt] = useState({
    label: "",
    value: "",
  });
  const [endSt, setEndSt] = useState({
    label: "",
    value: "",
  });
  const [find, setFind] = useState({
    date: "",
    count: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const getStStations = async (e) => {
    const res = await request(`/station/getustation`, GET, {
      stationId: e,
    });
    if (!res.error) {
      console.log(res[0]);
      setStartSt({ label: res[0].name, value: res[0] });
      console.log(startSt);
    }
  };

  const getEndStations = async (e) => {
    const res = await request(`/station/getustation`, GET, {
      stationId: e,
    });
    if (!res.error) {
      console.log(res[0]);
      setEndSt({ label: res[0].name, value: res[0] });
      console.log(startSt);
    }
  };

  const [stations, setStations] = useState([]);

  const getAllStations = async (row) => {
    const res = await request(`/station/getustation`, GET);
    if (!res.error) {
      const newStation = [];
      res.forEach((item) => {
        newStation.push({ label: item.name, value: item });
      });
      setStations(newStation);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleClassSelect = (event) => {
    setSelectedClass(event.target.value);
  };

  const onFindChange = (e) => {
    // console.log(e);
    setFind((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getAllStations();
    getStStations(st);
    getEndStations(end);
    setFind({ date: date, count: count });
    setSelectedClass(clas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Helmet title="Trains">
      <CommonSection title="Train Listing" />
      <div>
        <Container>
          <Row className="form__row">
            <Col lg="4" md="4">
              <div className="find__trains-left">
                <h2>Find your Train here</h2>
              </div>
            </Col>

            <Col lg="8" md="8" sm="12">
              <Form className="form">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <FormGroup className="form__group">
                    {/* <input type="text" placeholder="From Station" required /> */}
                    <Select
                      options={stations}
                      onChange={(e) => {
                        setStartSt(e);
                      }}
                      value={startSt}
                      placeholder="From Station"
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    {/* <input type="text" placeholder="To Station" required /> */}
                    <Select
                      options={stations}
                      onChange={(e) => {
                        setEndSt(e);
                      }}
                      value={endSt}
                      placeholder="To Station"
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={find.date}
                      onChange={(e) => onFindChange(e)}
                      placeholder="Journey date"
                      required
                    />
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
                        <DropdownItem
                          value="Economy"
                          onClick={handleClassSelect}
                        >
                          Economy
                        </DropdownItem>
                        <DropdownItem
                          value="Business"
                          onClick={handleClassSelect}
                        >
                          Business
                        </DropdownItem>
                        <DropdownItem
                          value="First Class"
                          onClick={handleClassSelect}
                        >
                          First Class
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="text"
                      id="count"
                      name="count"
                      onChange={(e) => onFindChange(e)}
                      value={find.count}
                      placeholder="No of Passengers"
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <button
                      className="btn find__train-btn"
                      // onClick={handleFindTrain}
                    >
                      Find Train
                    </button>
                  </FormGroup>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <section>
        <Container>
          <Row>
            {trainData.map((item) => (
              <TrainItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default TrainListing;
