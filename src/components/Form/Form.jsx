import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { signIn, getInformUser } from "../../store/userSlice";
import { apiRequest } from "../../services/service";
import Navbar from "../navbar/Navbar";
import styled from "./Form.module.css";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkEmail, setCheckEmail] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [checkSubmit, setCheckSubmit] = useState('');
  const [isInvalid, setInvalid] = useState(true);

  const { params } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeInputEmail = (e) => {
    setEmail(e.target.value);
    setCheckEmail('');
    setCheckSubmit('');
  };

  const handleChangeInputPassword = (e) => {
    setPassword(e.target.value);
    setCheckPassword('');
    setCheckSubmit('');
  };

  const handleBlurPassword = () => {
    setCheckSubmit('');
    setCheckPassword('Password must be at least 8 chars');
    if(password.trim().length > 7) {
      setCheckPassword('')
      setInvalid(false);
    }
  };

  const handleBlurEmail = () => {
    setCheckSubmit('');
    setCheckEmail('Invalid email!');
    if(email.includes('@') && email.trim().length > 0) {
      setCheckEmail('')
      setInvalid(false);
    }
  };

  const handleClick = async(e) => {
    e.preventDefault();
    if(!isInvalid) {
      try{
        if(params === 'login') {
          const data = await apiRequest.login(email, password);
          console.log(data);
          const res = await apiRequest.getCurrentUser();
          if(res.data.message === 'ok') {
            // localStorage.setItem('currentUser', JSON.stringify(res.data));
            dispatch(signIn(res.data));
            dispatch(getInformUser());
            navigate('/');
          }
        }else {
          apiRequest.logUp(email, password);
          navigate('/form/login');
        }
        setEmail('');
        setPassword('');
      }catch(err) {
        setCheckSubmit('Excuse me! Your info invalid!');
        console.log(err)
      }
    }else {
      setCheckSubmit('Excuse me! Your info invalid!');
    }
  };
  return (
    <div>
      <Navbar />
      <form>
        <div className={styled.form}>
          <h1>{params === "login" ? "Login" : "Register"}</h1>
          <div className={styled.group}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChangeInputEmail}
              onBlur={handleBlurEmail}
            />
            <div className={styled.error} >{checkEmail}</div>
          </div>
          <div className={styled.group}>
            <input
              type="pass"
              name="password"
              value={password}
              // style={{ borderColor: checkPassword ? '#ea4a4a' : ''}}
              onChange={handleChangeInputPassword}
              onBlur={handleBlurPassword}
            />
            <div className={styled.error} >{checkPassword}</div>
          </div>
          <div className={styled.error}>{checkSubmit}</div>
          <button type='submit' onClick={handleClick}>
            {params === "login" ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
