import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Description from "../../components/description/Description";
import MailList from "../../components/mailList/MailList";
import { DateRange } from "react-date-range";
import format from "date-fns/format";

import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "./Booking.module.css";
import { apiRequest } from "../../services/service";
import { useSelector } from "react-redux";
import { getInformUser } from "../../store/userSlice";
import { set } from "date-fns";


const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // get current user
  const user = useSelector((state) => state.auth.informUser);

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
  const [infoRoom, setInfoRoom] = useState([]);
  const [total, setTotal] = useState(0);
  const [valueInput, setValueInput] = useState({
    fullName: '',
    email: Object.keys(user).length !== 0 ? user.user.email : '',
    phoneNumber: '',
    identity: ''
  });
  const [payment, setPayment] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [checkFullName, setCheckFulName] = useState('');
  const [checkPhoneNumber, setCheckPhoneNumber] = useState('');
  const [checkIdentity, setCheckIdentity] = useState('');
  const [checkMethod, setCheckMethod] = useState('');
  const [checkRoom, setCheckRoom] = useState('');
  const [checkSubmit, setCheckSubmit] = useState('');

  useEffect(() => {
    const detailHotel = async () => {
      const res = await apiRequest.getDetailHotel(location.state.hotelId);
      if (res.data.message === "ok") {
        setHotel(res.data.hotel);
      }
    };
    detailHotel();
  }, []);

  const handleBlurInput = (e, name) => {
    setCheckSubmit('');
    if(name === 'fullName') {
      setCheckFulName('Your fullname invalid!');
      if(valueInput.fullName.trim().length > 0) {
        setCheckFulName('');
        setIsValid(false);
      }
    }
    if(name === 'phoneNumber') {
      setCheckPhoneNumber('Your phone number invalid!');
      if(valueInput.phoneNumber.trim().length > 9) {
        setCheckPhoneNumber('');
        setIsValid(false);
      }
    }
    if(name === 'identity') {
      setCheckIdentity('Your identity invalid!');
      if(valueInput.identity.trim().length > 8) {
        setCheckIdentity('');
        setIsValid(false);
      }
    }
   
  }

  const handleChangeInput = (e, name) => {
    setCheckSubmit('');
    const cpState = { ...valueInput };
    cpState[name] = e.target.value;
    setValueInput(cpState);
  };

  const handleSelect = (e) => {
    setIsValid(true);
    setCheckRoom('');
    if(e.target.value) {
      setPayment(e.target.value);
      setCheckSubmit('');
      setCheckMethod('')
      setIsValid(false);
    }else {
      setCheckMethod('Please, choose paymethod!');
    }
  }

  const handleCheckInput = (e, numberRoom, roomId, priceRoom) => {
    setIsValid(true);
    setCheckRoom('');
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
      const newPriceObj = {...price};
      if(price[roomId] === priceRoom && newArr.length === 0){
        delete newPriceObj[roomId]
      }
      setPrice(newPriceObj);
    }
  };

  useEffect(() => {
    if (bookedState && price) {
      let total = 0;
      let arrayRoom = [];
      for (let p in price) {
        for (let r in bookedState) {
          if (p === r) {
            total = total + price[p] * bookedState[r].length;
            const newOj = {
              roomId: r,
              roomNumber: bookedState[r]
            };
            arrayRoom.push(newOj);
          }
        }
      }
      setInfoRoom(arrayRoom);
      // console.log('room', arrayRoom);
      setTotal(total);
    }
  }, [bookedState, price]);
  console.log('user', Object.keys(user).length === 0);
  const handleBooking = async() => {
    if(Object.keys(user).length === 0) {
      return navigate('/form/login');
    };
    if(valueInput.fullName.length === 0 || valueInput.phoneNumber.length === 0 || valueInput.identity.length === 0) {
      setIsValid(true);
      setCheckSubmit('Please, complete the registration procedure.');
      return;
    }
    if(infoRoom.length === 0) {
      setIsValid(true);
      return setCheckRoom('Please, choose room you want!')
    };
    if(payment.includes('underfined')){
      setIsValid(true);
      return setCheckMethod('Please, choose paymethod!');
    };
    console.log(isValid);
    if(!isValid) {
      try{
        const booking = {
          startDate: date[0].startDate,
          endDate: date[0].endDate,
          fullName: valueInput.fullName,
          email: valueInput.email,
          phoneNumber: valueInput.phoneNumber,
          identify: valueInput.identity,
          price: total,
          rooms: infoRoom,
          hotelId: hotel._id,
          payment: payment
        }
        await apiRequest.bookHotel({...booking});
        navigate('/transaction');
        window.scrollTo(0,0);
      }catch(err) {
        console.log(err)
      }
    }else {
      setCheckSubmit('Please, complete the registration procedure.');
    }
  };

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
                  onBlur={(e) => handleBlurInput(e, "fullName")}
                  type="text"
                  value={valueInput.fullName}
                  placeholder="Full name"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div className={styled.error}>{checkFullName}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Your Email
                </label>
                <input
                  onChange={(e) => handleChangeInput(e, "email")}
                  onBlur={(e) => handleBlurInput(e, "email")}
                  value={valueInput.email}
                  disabled={valueInput.email ? true : false}
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
                  onBlur={(e) => handleBlurInput(e, "phoneNumber")}
                  type="text"
                  value={valueInput.phoneNumber}
                  placeholder="Phone number"
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <div className={styled.error}>{checkPhoneNumber}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Your identity Card Number
                </label>
                <input
                  onChange={(e) => handleChangeInput(e, "identity")}
                  onBlur={(e) => handleBlurInput(e, "identity")}
                  type="text"
                  value={valueInput.identity}
                  placeholder="Card number"
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <div className={styled.error}>{checkIdentity}</div>
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
        <div className={styled.error}>{checkRoom}</div>
        <h2 className={styled.total}>Total Bill : ${total}</h2>
        <div className={styled.pay}>
          <div className={styled.method}>
            <select onChange={handleSelect}>
              <option value='underfined' >Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="credit card">Credit Card</option>
            </select>
            <div className={styled.error}>{checkMethod}</div>
          </div>
          <div className={styled.btn}>
            <button onClick={handleBooking}>Reserve Now</button>
          </div>
          <div className={styled['message-error']}>{checkSubmit}</div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Booking;
