import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import trainData from "../assets/data/trainData";

const TrainDetails = () => {
  const { slug } = useParams();

  const singleTrainItem = trainData.find((item) => item.trainName === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleTrainItem]);

  return (
    <Helmet title={singleTrainItem.trainName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={singleTrainItem.imgUrl} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{singleTrainItem.trainName}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    LKR{singleTrainItem.price}.00 / Day
                  </h6>
                </div>

                <p className="section__description">{singleTrainItem.route}</p>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
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
