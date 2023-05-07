import "./featured.css";
import { useEffect, useState } from "react";

const Featured = ({ onNumberOfHotel }) => {
  let number = onNumberOfHotel.numberHotelWithCity;
  
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="/city-image/Ha Noi.jpg"
          alt="hanoi"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Dublin</h1>
          <h2>{number ? number.hanoi : 0} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="/city-image/Da Nang.jpg"
          alt="danang"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Reno</h1>
          <h2>{number ? number.danang : 0} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="/city-image/HCM.jpg"
          alt="hcm"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Austin</h1>
          <h2>{number ? number.hcm : 0} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
