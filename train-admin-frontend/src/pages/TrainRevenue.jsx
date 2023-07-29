import React, { useEffect } from "react";
import "../styles/train-revenue.css";
import { useParams } from "react-router-dom";
import TrackingChart from "../charts/TrackingChart";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import trainStaticsData from "../assets/dummy-data/trainStatics";
import bookingTrains from "../assets/dummy-data/booking-train";

const TrainRevenue = () => {
  const { slug } = useParams();
  const singleTrainItem = bookingTrains.find((item) => item.trainName === slug);

  const percentage = 55;
  const percentage02 = 45;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleTrainItem]);

  return (
    <div className="sell__train">
      <div className="sell__train-wrapper">
        <h2 className="sell__train-title">Train Revenue</h2>
        <div className="sell__train-top">
          <div className="sell__train-img">
            <h2>{singleTrainItem.trainName}</h2>
            <img src={singleTrainItem.imgUrl} alt="" />
          </div>

          <div className="tracking__history">
            <h3>Revenue Statistic</h3>
            <TrackingChart />
          </div>
        </div>

        <div className="offer__wrapper">
          <div className="offer__top">
            <h2 className="sell__train-title">Offers</h2>
          </div>

          <div className="offer__list">
            <div className="offer__item">
              <div className="box__01">
                <h3 className="client__name">First Class</h3>
                <h6 className="avg__price">
                  LKR 1700 <span>Total Income</span>
                </h6>

                <h6 className="market__price">Selling average is 67.5%</h6>
                <span className="arrow__key">
                  <i class="ri-arrow-right-line"></i>
                </span>
              </div>

              <div className="circle__wrapper">
                <div className="box__02">
                  <CircularProgressbar
                    value={67.5}
                    text={`67.5%`}
                    styles={buildStyles({
                      pathColor: "#01d293",
                      textColor: "#fff",
                      trailColor: "#0b0c28",
                      textSize: "18px",
                    })}
                  />
                </div>
                <h4>Ticket Revenue</h4>
              </div>

              <div className="box__03">
                <span className="model__spend-icon">
                  <i class="ri-train-line"></i>
                </span>
                <h6 className="spend__amount">2</h6>
                <p className="spend__title">Ticket Sales</p>
              </div>

              <div className="box__04">
                <span className="model__spend-icon">
                  <i class="ri-share-forward-line"></i>
                </span>
                <h6 className="spend__amount">2</h6>
                <p className="spend__title">Ticket Booking</p>
              </div>

              <div className="box__05">
                <span className="model__spend-icon">
                  <i class="ri-money-dollar-circle-line"></i>
                </span>
                <h6 className="spend__amount">LKR 200</h6>
                <p className="spend__title">Discounts</p>
              </div>
            </div>
            <div className="offer__item">
              <div className="box__01">
                <h3 className="client__name">Secon Class</h3>
                <h6 className="avg__price">
                  $16,605 <span>average price</span>
                </h6>

                <h6 className="market__price">Selling average is LKR 16,244</h6>
                <span className="arrow__key">
                  <i class="ri-arrow-right-line"></i>
                </span>
              </div>

              <div className="circle__wrapper">
                <div className="box__02">
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                      pathColor: "#01d293",
                      textColor: "#fff",
                      trailColor: "#0b0c28",
                      textSize: "18px",
                    })}
                  />
                </div>
                <h4>Ticket Revenue</h4>
              </div>

              <div className="box__03">
                <span className="model__spend-icon">
                  <i class="ri-train-line"></i>
                </span>
                <h6 className="spend__amount">$1174</h6>
                <p className="spend__title">ticket values</p>
              </div>

              <div className="box__04">
                <span className="model__spend-icon">
                  <i class="ri-share-forward-line"></i>
                </span>
                <h6 className="spend__amount">$1174</h6>
                <p className="spend__title">ticket values</p>
              </div>

              <div className="box__05">
                <span className="model__spend-icon">
                  <i class="ri-money-dollar-circle-line"></i>
                </span>
                <h6 className="spend__amount">$811</h6>
                <p className="spend__title">ticket values</p>
              </div>
            </div>
            <div className="offer__item">
              <div className="box__01">
                <h3 className="client__name">Ticket Revenue</h3>
                <h6 className="avg__price">
                  $11,605 <span>average price</span>
                </h6>

                <h6 className="market__price">Average Sell is LKR11,244</h6>
                <span className="arrow__key">
                  <i class="ri-arrow-right-line"></i>
                </span>
              </div>

              <div className="circle__wrapper">
                <div className="box__02">
                  <CircularProgressbar
                    value={percentage02}
                    text={`${percentage02}%`}
                    styles={buildStyles({
                      pathColor: "#01d293",
                      textColor: "#fff",
                      trailColor: "#0b0c28",
                      textSize: "18px",
                    })}
                  />
                </div>
                <h4>ticket values</h4>
              </div>

              <div className="box__03">
                <span className="model__spend-icon">
                  <i class="ri-train-line"></i>
                </span>
                <h6 className="spend__amount">$1174</h6>
                <p className="spend__title">ticket values</p>
              </div>

              <div className="box__04">
                <span className="model__spend-icon">
                  <i class="ri-share-forward-line"></i>
                </span>
                <h6 className="spend__amount">$1174</h6>
                <p className="spend__title">ticket values</p>
              </div>

              <div className="box__05">
                <span className="model__spend-icon">
                  <i class="ri-money-dollar-circle-line"></i>
                </span>
                <h6 className="spend__amount">$811</h6>
                <p className="spend__title">ticket values</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainRevenue;
