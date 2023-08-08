import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
// import BookingForm from "../components/UI/BookingForm";
// import PaymentMethod from "../components/UI/PaymentMethod";
import masterCard from "../assets/all-images/master-card.jpg";
import paypal from "../assets/all-images/paypal.jpg";
import "../styles/booking-form.css";
import "../styles/payment-method.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../redux/features/authSlice";
// import Select from "react-select";
import { Form, FormGroup } from "reactstrap";
import { request, GET, POST } from "../api/ApiAdapter";
import PaymentMethod from "../components/UI/PaymentMethod";

const TrainDetails = () => {
  const { slug, cla, star, ende, per, cou, shed } = useParams();
  const navigate = useNavigate();
  const authUser = useSelector(selectCurrentUser);
  const [startSt, setStartSt] = useState({
    label: "",
    value: "",
  });
  const [endSt, setEndSt] = useState({
    label: "",
    value: "",
  });
  const [price, setPrice] = useState();
  const [path, setPath] = useState([]);
  const [method, setMethod] = useState();

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
      // console.log(res);
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

  const getPassenger = async () => {
    const res = await request(`/passenger/by/user/`, POST, {
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

  const getpath = async (shed) => {
    const res = await request(`/schedule/route/${shed}`, POST);
    if (!res.error) {
      setPath(res);
      // console.log(res);
    }
  };

  useEffect(() => {
    getpath(shed);
    getStStations(star);
    getEndStations(ende);
    getPrice(cla, shed, star, ende, per);
    console.log(authUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReserveButtonClick = (event) => {
    event.preventDefault();

    const paymentForm = document.getElementById("paymentForm");
    const selectedPaymentMethod = paymentForm.querySelector(
      'input[name="paymentMethod"]:checked'
    );

    if (selectedPaymentMethod) {
      const selectedValue = selectedPaymentMethod.value;
      console.log("Selected Payment Method:", selectedValue);
      setMethod(selectedValue);
      // Do further processing with the selectedValue
    } else {
      console.log("Please select a payment method.");
      // Handle the case where no payment method is selected
    }
  };

  const reservation = async () => {
    const res = await request(`/booking/create`, POST, {
      method: method,
      total: price,
      scheduleId: shed,
      reservation: {
        trainClass: cla,
        seatNumber: per,
      },
      passengerId: "4c38a0db-9c57-40ba-878c-3652a769444a",
      travelFromID: star,
      travelToId: ende,
    });
    if (!res.error) {
      navigate(`/home`);
      // console.log(res);
    }
  };

  const onSucess = (orderId) => console.log("onSuccess", reservation);
  const onDismissed = () => console.log("onDismissed");
  const onError = (error) => console.log("onError", error);

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

                <p className="section__description">{path.join(",")}</p>
                <p className="mt-3">
                  <span className="font-bold mr-2">Additional Services : </span>
                  <span className="">Meals</span>
                </p>
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
                <h5 className="mb-4 fw-bold">Payment Information</h5>
                <FormGroup className="booking__form w-100 ms-1 mb-4">
                  <input
                    type="text"
                    value="Tharaka Dasunpriya"
                    disabled
                    placeholder="From Station"
                  />
                </FormGroup>

                <FormGroup className="booking__form w-100 ms-1 mb-4">
                  <input
                    type="text"
                    value="0775707306"
                    disabled
                    placeholder="From Station"
                  />
                </FormGroup>

                <FormGroup className="booking__form w-100 ms-1 mb-4">
                  <input
                    type="text"
                    value="tharaka@gmail.com"
                    disabled
                    placeholder="From Station"
                  />
                </FormGroup>

                <FormGroup className="booking__form w-100 ms-1 mb-4">
                  <input
                    type="text"
                    value="No 602, Moragala, Pilana, Wanchawala"
                    disabled
                    placeholder="From Station"
                  />
                </FormGroup>

                <FormGroup className="booking__form w-100 ms-1 mb-4">
                  <input type="text" placeholder="Promo Code" />
                </FormGroup>

                <PaymentMethod
                  amount={Number(price)}
                  items={`${startSt.label} to ${endSt.label}`}
                  firstName="Pasindu"
                  lastName="Eranga"
                  email="mr.h.d.pasindueranga@gmail.com"
                  phone="0775707306"
                  address="No 602, Moragala, Pilana, Wanchawala"
                  delivery_address=""
                  delivery_city=""
                  delivery_country=""
                  onSucess={onSucess}
                  onDismissed={onDismissed}
                  onError={onError}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default TrainDetails;
