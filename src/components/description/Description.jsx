import { useNavigate } from "react-router-dom";

const Description = ({ description, price, hotelId, name }) => {

  const navigate = useNavigate();
  const handleBook = () => {
    if(hotelId !== '') {
      navigate('/booking', { state: { hotelId: hotelId}});
      window.scrollTo(0,0);
    }
  }

  return (
    <>
      <div className="hotelDetails">
        <div className="hotelDetailsTexts">
          <h1 className="hotelTitle">{name}</h1>
          <p className="hotelDesc">
          {description}
          </p>
        </div>
        <div className="hotelDetailsPrice">
          <h1>Perfect for a 1-night stay!</h1>
          {/* <span>
            {detailHotel ? detailHotel.title : ''}
          </span> */}
          <h2>
            <b>${price}</b> (1 nights)
          </h2>
          <button onClick={handleBook}>Reserve or Book Now!</button>
        </div>
      </div>
    </>
  )

}

export default Description;