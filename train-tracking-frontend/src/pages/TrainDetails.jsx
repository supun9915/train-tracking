import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
// import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import "../styles/booking-form.css";
// import Select from "react-select";
import { Form, FormGroup } from "reactstrap";
import { request, GET, POST } from "../api/ApiAdapter";

const TrainDetails = () => {
  const { slug, cla, star, ende, per, cou, shed } = useParams();

  const [startSt, setStartSt] = useState({
    label: "",
    value: "",
  });
  const [endSt, setEndSt] = useState({
    label: "",
    value: "",
  });
  const [price, setPrice] = useState();

  const getStStations = async (e) => {
    const res = await request(`/station/getustation/?stationId=${e}`, GET, {
      stationId: e,
    });
    if (!res.error) {
      // console.log(res[0]);
      setStartSt({ label: res[0].name, value: res[0] });
      // console.log(startSt);
    }
  };

  const getEndStations = async (b) => {
    const res = await request(`/station/getustation/?stationId=${b}`, GET);
    if (!res.error) {
      console.log(res);
      setEndSt({ label: res[0].name, value: res[0] });
      // console.log(startSt);
    }
  };

  const getPrice = async (cla, shed, star, ende, per) => {
    const res = await request(`/price/findPrice`, POST, {
      trainClass: cla,
      schedule: shed,
      fromStation: star,
      toStation: ende,
      passengerCount: per,
    });
    if (!res.error) {
      setPrice(res);
      // console.log(res);
    }
  };

  useEffect(() => {
    getStStations(star);
    getEndStations(ende);
    getPrice(cla, shed, star, ende, per);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Helmet title={slug}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img
                src={
                  "https://adaderanaenglish.s3.amazonaws.com/1659868127-train-services.jpg"
                }
                alt=""
                className="w-100"
              />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{slug}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">LKR{price}.00/=</h6>
                </div>

                {/* <p className="section__description">{singleTrainItem.route}</p> */}
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className=" fw-bold ">Booking Information</h5>
                <Form className="form">
                  <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <input
                      type="text"
                      value={startSt.label}
                      disabled
                      placeholder="From Station"
                    />
                  </FormGroup>
                  <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <input
                      type="text"
                      value={endSt.label}
                      disabled
                      placeholder="To Station"
                    />
                  </FormGroup>

                  <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <input
                      type="text"
                      value={per}
                      disabled
                      placeholder="Person Count"
                    />
                  </FormGroup>
                  <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <input
                      type="date"
                      value={cou}
                      disabled
                      placeholder="Journey Date"
                    />
                  </FormGroup>
                </Form>
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default TrainDetails;
