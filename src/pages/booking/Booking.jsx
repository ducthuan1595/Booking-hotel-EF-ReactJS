import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Description from "../../components/description/Description";
import MailList from "../../components/mailList/MailList";
import { DateRange } from "react-date-range";
import format from "date-fns/format";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "./Booking.module.css";
import { apiRequest } from "../../services/service";
import { useSelector } from "react-redux";
import { getInformUser } from "../../store/userSlice";

const Booking = () => {
  const location = useLocation();
  const [date, setDate] = useState([
    {
      endDate: location.state.date
        ? location.state.date[0].endDate
        : new Date(),
      startDate: location.state.date
        ? location.state.date[0].startDate
        : new Date(),
      key: "selection",
    },
  ]);
  const [hotel, setHotel] = useState(null);
  const [price, setPrice] = useState({});
  const [bookedState, setBookedState] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const detailHotel = async () => {
      const res = await apiRequest.getDetailHotel(location.state.hotelId);
      if (res.data.message === "ok") {
        console.log("data-hotel", res.data);
        setHotel(res.data.hotel);
      }
    };
    detailHotel();
  }, []);

  const user = useSelector((state) => state.auth.informUser);

  const handleChangeInput = (e, name) => {
    console.log("inout", e.target.value);
  };

  const handleCheckInput = (e, numberRoom, roomId, priceRoom) => {
    console.log("info-room", e.target.checked, numberRoom, roomId, price);
    if (e.target.checked) {
        setBookedState({
          ...bookedState,
          [roomId]: (bookedState[roomId] || []).concat([numberRoom]),
        });
      setPrice({ ...price, [roomId]: (price[roomId] = priceRoom) });
    } else {
      let cpyObj = { ...bookedState };
      const newArr = cpyObj[roomId].filter((number) => number !== numberRoom);
      cpyObj[roomId] = newArr;
      if (newArr.length === 0) delete cpyObj[roomId];
      setBookedState(cpyObj);
      const newPriceObj = {...price}
      if(price[roomId] === priceRoom && newArr.length === 0){
        delete newPriceObj[roomId]
      }
      setPrice(newPriceObj);
    }
  };

  useEffect(() => {
    if (bookedState && price) {
      let total = 0;
      for (let p in price) {
        for (let r in bookedState) {
          if (p === r) {
            total = total + price[p] * bookedState[r].length;
          }
        }
      }
      setTotal(total);
    }
  }, [bookedState, price]);

  const handleBooking = () => {};

  console.log("total", total);
  console.log("bookedState", bookedState);
  console.log("price", price);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="container">
        <Description
          description={hotel ? hotel.desc : ""}
          price={hotel ? hotel.cheapestPrice : ""}
          name={hotel ? hotel.name : ""}
        />
        <div className={styled.booking}>
          <div className={styled.date}>
            <h4>Dates</h4>
            <DateRange
              onChange={(item) => setDate([item.selection])}
              ranges={date}
              minDate={new Date()}
            />
          </div>
          <div className={styled.info}>
            <h4>Reserve Info</h4>
            <div className={styled.form}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Your Full Name
                </label>
                <input
                  onChange={(e) => handleChangeInput(e, "fullName")}
                  type="text"
                  placeholder="Full name"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div></div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Your Email
                </label>
                <input
                  onChange={(e) => handleChangeInput(e, "email")}
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <div></div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Your Phone Number
                </label>
                <input
                  onChange={(e) => handleChangeInput(e, "phoneNumber")}
                  type="text"
                  placeholder="Phone number"
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <div></div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Your identity Card Number
                </label>
                <input
                  onChange={(e) => handleChangeInput(e, "identity")}
                  type="text"
                  placeholder="Card number"
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <h4>Select Rooms</h4>
        <div className={styled["select-room"]}>
          {hotel ? (
            hotel.rooms.map((room) => {
              return (
                <div key={room._id} className={styled["info-room"]}>
                  <div className={styled.rooms}>
                    <div className={styled.room}>
                      <h5>{room ? room.title : ""}</h5>
                      <div className={styled.promo}>
                        Free cancellation before{" "}
                        {format(date[0].startDate, "MM,dd,yyyy")}
                      </div>
                      <div>{room ? room.title : ""}</div>
                      <div>
                        Max people: <strong>{room.maxPeople}</strong>
                      </div>
                      <h5>${room.price}</h5>
                    </div>
                  </div>
                  <input type="hidden" />
                  <div className={styled.check}>
                    {room.roomNumbers &&
                      room.roomNumbers.map((n, index) => {
                        return (
                          <div className={styled.ground} key={index}>
                            <label>{n}</label>
                            <input
                              type="checkbox"
                              name={n}
                              value={n}
                              onChange={(e) =>
                                handleCheckInput(e, n, room._id, room.price)
                              }
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <h2>Total Bill : ${total}</h2>
        <div className={styled.pay}>
          <div className={styled.method}>
            <select name="cars" id="cars">
              <option defaultChecked>Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="credit card">Credit Card</option>
            </select>
          </div>
          <div className={styled.btn}>
            <button onClick={handleBooking}>Reserve Now</button>
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Booking;
