import { useState } from "react";
import { Link } from "react-router-dom";
import "./featuredProperties.css";

const FeaturedProperties = ({ onHotels }) => {
  const [hotel, setHotel] = useState({});

  const hotels = onHotels.hotels;
  let hotelRating = [];
  if(hotels !== null) {
    const sortHotels = hotels.sort((a, b) =>  a.rating - b.rating ).reverse().slice(0, 3);
    hotelRating = sortHotels
  }
  // console.log('rating', hotelRating);

  return (
    <>
      <div className="fp">
        {hotelRating && hotelRating.length > 0 && 
        hotelRating.map(hotel => {
          return (
            <div key={hotel._id} className="fpItem">
              <img
                src={hotel.photos[2]}
                alt={hotel.name}
                className="fpImg"
              />
              <span className="fpName"><Link to={`/hotels/${hotel._id}`} >{hotel.name}</Link></span>
              <span className="fpCity">{hotel.city}</span>
              <span className="fpPrice">Starting from ${hotel.cheapestPrice}</span>
              <div className="fpRating">
                <button>{hotel.rating}</button>
                <span>Excellent</span>
              </div>
            </div>
          )
        })
      }
      </div>
    </>
  );
};

export default FeaturedProperties;
