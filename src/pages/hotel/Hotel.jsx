import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Description from "../../components/description/Description";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { apiRequest } from "../../services/service";
import { useNavigate, useParams } from "react-router-dom";


const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [detailHotel, setDetailHotel] = useState();
  const [photos, setPhotos] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=> {
    const getDetailHotel = async() => {
      const res = await apiRequest.getDetailHotel(params.id);
      if(res.data.message === 'ok') {
        setDetailHotel(res.data.hotel);
        window.scrollTo(0,0);
      }
    };
    getDetailHotel();
  }, []);

  useEffect(() => {
    if(detailHotel) {
      setPhotos(detailHotel.photos.map(photo => photo))
    }
  }, [detailHotel])
  console.log('photo', photos)

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? photos.length -1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleBook = (hotelId) => {
    navigate('/booking', { state: { hotelId: hotelId }});
    window.scrollTo(0,0);
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleBook.bind(null, detailHotel ? detailHotel._id : '')}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{detailHotel ? detailHotel.name : ''}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{detailHotel ? detailHotel.address : ''}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {detailHotel ? detailHotel.distance : ''}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${detailHotel ? detailHotel.cheapestPrice : ''} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <Description 
            description={detailHotel ? detailHotel.desc : ''}
            price={detailHotel ? detailHotel.cheapestPrice : ''} 
            hotelId={detailHotel ? detailHotel._id : ''}
            name={detailHotel ? detailHotel.name : ''}
          />
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
