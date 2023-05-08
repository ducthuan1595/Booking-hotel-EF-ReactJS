import "./featured.css";
import { useEffect, useState } from "react";

const Featured = ({ onNumberOfHotel }) => {
  let number = onNumberOfHotel.numberHotelWithCity;
  console.log(number);
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="/city-image/Ha Noi.jpg"
          alt="hanoi"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>{number ? number.hanoi[0].city : ''}</h1>
          <h2>{number ? number.hanoi.length : 0} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="/city-image/Da Nang.jpg"
          alt="danang"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{number ? number.danang.length : 0} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="/city-image/HCM.jpg"
          alt="hcm"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>{number ? number.hcm[0].city : ''}</h1>
          <h2>{number ? number.hcm.length : 0} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
