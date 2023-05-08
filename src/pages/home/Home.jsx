import { useEffect, useState } from "react";

import { apiRequest } from "../../services/service";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  const [type, setType] = useState(null);
  const [hotels, setHotels] = useState(null);
  const [numberHotelWithCity, setNumberHotelWithCity] = useState(null);

  useEffect(() => {
    const getAllHotels = async() => {
      const res = await apiRequest.getAllHotel();
      if(res.data.message === 'ok') {
        console.log('data-hotels', res.data);
        setHotels(res.data.hotels);
        let numberHotelWithHanoi = [];
        let numberHotelWithDanang = [];
        let numberHotelWithHCM = [];
        let typeHotel = [];
        let typeApartment = [];
        let typeResort = [];
        let typeVillas = [];
        let typeCabin = [];
        res.data.hotels.map(hotel => {
          if(hotel.city.toLowerCase().includes('ha noi')) {
            numberHotelWithHanoi.push(hotel);
          };
          if(hotel.city.toLowerCase().includes('da nang')) {
            numberHotelWithDanang.push(hotel);
          };
          if(hotel.city.toLowerCase().includes('ho chi minh')) {
            numberHotelWithHCM.push(hotel);
          };
          if(hotel.type === 'hotel') {
            typeHotel.push(hotel);
          };
          if(hotel.type === 'apartment') {
            typeApartment.push(hotel);
          };
          if(hotel.type === 'resort') {
            typeResort.push(hotel);
          };
          if(hotel.type === 'villa') {
            typeVillas.push(hotel);
          };
          if(hotel.type === 'cabin') {
            typeCabin.push(hotel);
          };
        });
        const types = {
          hotel: typeHotel.length,
          apartments: typeApartment.length,
          resorts: typeResort.length,
          villas: typeVillas.length,
          cabins: typeCabin.length
        };
        setType(types);
        const number = {
          hanoi: numberHotelWithHanoi,
          danang: numberHotelWithDanang,
          hcm: numberHotelWithHCM
        };
        // console.log('number',types);
        setNumberHotelWithCity(number);
      }
    };
    getAllHotels();
  }, [])

  console.log('number', numberHotelWithCity);

  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured onNumberOfHotel={{numberHotelWithCity}} />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList  onType={{type}} />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties onHotels={{hotels}} />
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
