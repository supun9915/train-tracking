import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import TrainItem from "../components/UI/TrainItem";
import trainData from "../assets/data/trainData";
import FindTrainForm from "../components/UI/FindTrainForm";
import { useParams } from "react-router-dom";

const TrainListing = () => {
  const { trainClass } = useParams();

  useEffect(() => {
    console.log(trainClass);
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
              <FindTrainForm />
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
