import React from "react";
import { Col } from "reactstrap";
import "../../styles/train-item.css";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const TrainItem = (props) => {
  const { imgUrl, time, trainName } = props.item;
  const cla = props.clas;
  const st = props.start;
  const en = props.end;
  const coun = props.count;
  const dat = props.date;
  const navigate = useNavigate();
  // console.log(cla);
  const handleFindTrainDetails = () => {
    navigate(`/trains/${trainName}/${cla}/${st}/${en}/${coun}/${dat}`);
  };

  return (
    <Col lg="8" md="6" sm="6" className="mb-2">
      <div className="searchItem flex">
        <div className="w-20 h-full">
          <img src={imgUrl} alt="" className="siImg  object-cover" />
        </div>
        <div className="siDesc">
          <h1 className="siTitle">{trainName}</h1>
          <span className="siSubtitle">{time}</span>
          {/* <span className="siPrice">LKR {price}</span> */}
        </div>
        <div>
          <Button color="primary" onClick={handleFindTrainDetails}>
            Book Now
          </Button>{" "}
        </div>
      </div>
    </Col>
  );
};

export default TrainItem;
