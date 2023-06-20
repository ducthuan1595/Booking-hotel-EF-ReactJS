import { useEffect, useState } from "react";
import { apiRequest } from "../../services/service";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import { Link } from "react-router-dom";

const ListAllHotel = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const getHotels = async() => {
      const res = await apiRequest.getAllHotel();
      if(res.data.message === 'ok') {
        setHotels(res.data.hotels)
      }
    }
    getHotels();
  }, []);

  return (
    <div>
    <Navbar />
    <Header type='list' />
    <div style={{ width: '1024px', margin: 'auto', marginTop: '50px' }}>
      {hotels && hotels.map(hotel => {
        return (
          <Link className="searchItem" key={hotel._id} to={`/hotels/${hotel._id}`} style={{ textDecoration: 'none' }}>
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
              {/* {free_cancel ? ( */}
                <div>
                  <span className="siCancelOp">Free cancellation </span>
                  <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                  </span>
                </div>
              {/* ) : (<div></div>)} */}
            </div>
            <div className="siDetails">
              <div className="siRating" style={{ justifyContent: 'flex-end'}}>
                {/* <span>{rate_text}</span> */}
                <button>{hotel.rating}</button>
              </div>
              <div className="siDetailTexts">
                <span className="siPrice">${hotel.cheapestPrice}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                {/* <button className="siCheckButton" onClick={handleBook.bind(null, hotel._id)}>See availability</button> */}
              </div>
            </div>
          </Link>
        )
      })}
      </div>
      <MailList />
      <Footer />
    </div>
  )
}

export default ListAllHotel;