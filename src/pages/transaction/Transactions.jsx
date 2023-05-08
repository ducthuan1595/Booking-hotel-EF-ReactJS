import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styled from "./Transactions.module.css";
import { apiRequest } from "../../services/service";
import { format } from "date-fns";
import MailList from "../../components/mailList/MailList";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const user = useSelector((state) => state.auth.informUser);
  useEffect(() => {
    const getTransactions = async () => {
      const res = await apiRequest.getTransactionWithUser(user.user._id);
      if (res.data.message === "ok") {
        console.log("transactions", res.data.lists);
        setTransactions(res.data.lists);
      }
    };
    getTransactions();
  }, []);

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className='container'>
      
        <div className={styled.transaction}>
        <h4>Your Transactions</h4>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(transactions).length !== 0  ?
              transactions.map((item, index) => {
                const rooms = item.rooms.map(room => {
                  return room.roomNumber;
                }).flat().toString();
                let start = new Date(item.startDate);
                let end = new Date(item.endDate);
                let ys = new Intl.DateTimeFormat("en", {
                  year: "numeric",
                }).format(start);
                let ye = new Intl.DateTimeFormat("en", {
                  year: "numeric",
                }).format(end);
                let ms = new Intl.DateTimeFormat("en", {
                  month: "numeric",
                }).format(start);
                let me = new Intl.DateTimeFormat("en", {
                  month: "numeric",
                }).format(end);
                let ds = new Intl.DateTimeFormat("en", {
                  day: "2-digit",
                }).format(start);
                let de = new Intl.DateTimeFormat("en", {
                  day: "2-digit",
                }).format(end);
                const startDate=`${ms}/${ds}/${ys}`;
                const endDate=`${me}/${de}/${ye}`;
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.hotel[0].hotelId.name}</td>
                    <td>{rooms}</td>
                    <td>{startDate}-{endDate}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.payment.charAt(0).toUpperCase() +
                        item.payment.slice(1)}
                    </td>
                    <td>
                      <button className={styled.btn} style={{backgroundColor: item.status.includes('booked') ? '#54c14f' : '#dcbd65'}}>{item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}</button>
                    </td>
                  </tr>
                );
              }) : <div className={styled['message-error']}>Not found transaction.</div>}
          </tbody>
        </table>
        </div>
      </div>
      <MailList />
      <Footer />
    </>
  );
};

export default Transactions;
