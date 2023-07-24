import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';

const TrainItem = (props) => {
  const { category, type, ticketPrice, imgUrl, trainName, groupSize } = props.item;
  const navigate = useNavigate();

  const handleViewRevenue = () => {
    navigate(`/sell-train/${trainName}`);
  };
  return (
    <div className="train__item">
      <div className="train__item-top">
        <div className="train__item-tile">
          <h3>{trainName}</h3>
          <span>
            <i class="ri-heart-line"></i>
          </span>
        </div>
        <p>{category}</p>
      </div>
      <div className="train__img">
        <img src={imgUrl} alt="" />
      </div>

      <div className="train__item-bottom">
        <div className="train__bottom-left">
        <Button onClick={handleViewRevenue}>View Revenue</Button>{' '}
        </div>

        <p className="train__rent">${ticketPrice}/d</p>
        
      </div>
    </div>
  );
};

export default TrainItem;
