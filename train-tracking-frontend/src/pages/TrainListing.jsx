import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import TrainItem from "../components/UI/TrainItem";
// import trainData from "../assets/data/trainData";
import { request, POST } from "../api/ApiAdapter";
import { useParams } from "react-router-dom";
import "../styles/find-train-form.css";
import FindTrainForm from "../components/UI/FindTrainForm";

const TrainListing = () => {
  const { clas, st, end, count, date } = useParams();
  const [trains, setTrains] = useState([]);

  const getFindTrains = async () => {
    let fromD = date + "T00:00:00Z";
    let toD = date + "T23:59:59Z";
    const res = await request(`/schedule/find/train`, POST, {
      fromStation: st,
      toStation: end,
      fromDate: fromD,
      toDate: toD,
      train_class: clas,
      passengerCount: count,
    });
    if (!res.error) {
      console.log(res);
      setTrains(res);
    }
  };

  useEffect(() => {
    getFindTrains();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(clas);
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
              {/* <Form className="form">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <FormGroup className="form__group">
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
                        <DropdownItem value="First" onClick={handleClassSelect}>
                          First Class
                        </DropdownItem>
                        <DropdownItem
                          value="Second"
                          onClick={handleClassSelect}
                        >
                          Second Class
                        </DropdownItem>
                        <DropdownItem value="Third" onClick={handleClassSelect}>
                          Economy
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
                      type="button"
                      disabled={
                        startSt === undefined ||
                        endSt === undefined ||
                        find.date === "" ||
                        selectedClass === null ||
                        find.count === ""
                      }
                      className="btn find__train-btn"
                      onClick={getFindTrainsSubmit}
                    >
                      Find Train
                    </button>
                  </FormGroup>
                </div>
              </Form> */}
              <FindTrainForm />
            </Col>
          </Row>
        </Container>
      </div>
      <section>
        <Container>
          <Row>
            {trains.map((item) => (
              <TrainItem
                item={item}
                key={item.id}
                clas={clas}
                start={st}
                end={end}
                count={count}
                date={date}
              />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default TrainListing;
