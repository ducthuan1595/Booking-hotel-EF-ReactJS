import "./searchItem.css";
import { useDispatch, useSelector } from "react-redux";

import { searchListHotel } from "../../store/hotelSlice";
import { useNavigate, useParams } from "react-router-dom";


const SearchItem = ({
  name,
  distance,
  tag,
  type,
  description,
  free_cancel = true,
  price,
  rate,
  rate_text,
  img_url,
  date
}) => {

  const params = useParams();
  const navigate = useNavigate();
  const hotels = useSelector(state => state.hotel.searchListHotel);
  console.log('params', params);

  const handleBook = (id) => {
    navigate('/booking', { state: { date: date, hotelId: id}});
    window.scrollTo(0,0);
  }

  return (
    <>
      {hotels && hotels.map(hotel => {
        return (
          <div className="searchItem" key={hotel._id}>
            <img
              src={hotel.photos[2]}
              alt={hotel.title}
              className="siImg"
            />
            <div className="siDesc">
              <h1 className="siTitle">{hotel.name}</h1>
              <span className="siDistance">{hotel.distance} from center</span>
              <span className="siTaxiOp">Free Breakfast</span>
              <span className="siSubtitle">
                {hotel.address}
              </span>
              <span className="siFeatures">
                {hotel.type}
              </span>
              {/* If can cancel */}
              {free_cancel ? (
                <div>
                  <span className="siCancelOp">Free cancellation </span>
                  <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                  </span>
                </div>
              ) : (<div></div>)}
            </div>
            <div className="siDetails">
              <div className="siRating">
                <span>{rate_text}</span>
                <button>{hotel.rating}</button>
              </div>
              <div className="siDetailTexts">
                <span className="siPrice">${hotel.cheapestPrice}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <button className="siCheckButton" onClick={handleBook.bind(null, hotel._id)}>See availability</button>
              </div>
            </div>
          </div>
        )
      })}
    </>
  );
};

export default SearchItem;
