import React, { useEffect, useState } from "react";
import "../css/register.css";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import base_url from "../api/bootapi";
import axios from "axios";

function Register() {
  useEffect(() => {
    document.title = "Register";
  }, []);

  let [uname, setUname] = useState("");
  let [ucity, setUcity] = useState("");
  let [uphone, setUphone] = useState("");
  let [uemail, setUemail] = useState("");
  let [upassword, setUpassword] = useState("");
  let [uconpassword, setUconpassword] = useState("");
  let [usecurityQues, setUsecurityQues] = useState("");
  let [usecurityAns, setUsecurityAns] = useState("");

  let unameinp = (e) => setUname(e.target.value);
  let ucityinp = (e) => setUcity(e.target.value);
  let uphoneinp = (e) => setUphone(e.target.value);
  let uemailinp = (e) => setUemail(e.target.value);
  let upasswordinp = (e) => setUpassword(e.target.value);
  let uconpasswordinp = (e) => setUconpassword(e.target.value);
  let usecurityquesinp = (e) => setUsecurityQues(e.target.value);
  let usecurityansinp = (e) => setUsecurityAns(e.target.value);

  let user = {
    name: uname,
    city: ucity,
    phone: uphone,
    email: uemail,
    password: upassword,
    conpassword: uconpassword,
    securityQues: usecurityQues,
    securityAns: usecurityAns,
  };

  //Register data
  const registeruser = (data) => {
    axios.post(`${base_url}/register`, data).then(
      (response) => {
        swal
          .fire({
            icon: "success",
            title: "Hurreh!!!",
            text: "You have registered to a great cause",
          })
          .then(function () {
            window.location = "/";  // control goes to Login Page
          });
        clearFields();
      },
      (error) => {
        console.log(error);
        swal.fire({
          icon: "error",
          title: "Enter Email ID first",
          text: "We need to check if the email is already registered or not",
        });
      }
    );
  };

  //Check Email
  const checkEmail = (data) => {
    axios.post(`${base_url}/findbyemail`, data).then(
      (response) => {
        console.log(response);
        if (response.data.length == 0) {
          registeruser(user);
          clearErrors();
          clearFields();
        } else {
          swal.fire({
            icon: "error",
            title: "Oh no!!!",
            text: "Email is already Registered",
          });
        }
      },
      (error) => {
        console.log(error);
        swal.fire({
          icon: "error",
          title: "Oh no!",
          text: "Server is down",
        });
      }
    );
  };

  let [ename, setEname] = useState();
  let [ecity, setEcity] = useState();
  let [eemail, setEemail] = useState();
  let [ephone, setEphone] = useState();
  let [epassword, setEpassword] = useState();
  let [econpassword, setEconpassword] = useState();
  let [esecurityQues, setEsecurityQues] = useState();
  let [esecurityAns, setEsecurityAns] = useState();
  let [etnc, setEtnc] = useState();

  function clearErrors() {
    document.getElementById("name").classList.remove("is-invalid");
    setEname("");

    document.getElementById("city").classList.remove("is-invalid");
    setEcity("");

    document.getElementById("phone").classList.remove("is-invalid");
    setEphone("");

    document.getElementById("email").classList.remove("is-invalid");
    setEemail("");

    document.getElementById("password").classList.remove("is-invalid");
    setEpassword("");

    document.getElementById("conpassword").classList.remove("is-invalid");
    setEconpassword("");

    document.getElementById("securityQues").classList.remove("is-invalid");
    setEsecurityQues("");

    document.getElementById("securityAns").classList.remove("is-invalid");
    setEsecurityAns("");

    document.getElementById("tnc").classList.remove("is-invalid");
    setEtnc("");
  }

  function clearFields() {
    setUname("");
    setUcity("");
    setUphone("");
    setUemail("");
    setUpassword("");
    setUconpassword("");
    setUsecurityQues("");
    setUsecurityAns("");
    document.getElementById("tnc").checked = false;
  }

  //email regular expression :  
  //          /^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/    or ^(?=.*[a-zA-Z])[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
  let validate = () => {
    if (
      uname.trim() === "" ||
      ucity === "" ||
      uphone.trim() === "" ||
      uemail.trim() === "" ||
      upassword.trim() === "" ||
      uconpassword.trim === "" ||
      usecurityQues.trim() === "" ||
      usecurityAns.trim() === ""
    ) {
      swal.fire("All fields are  required");
    } else if (
      uname.search(/^[a-zA-Z ]*$/) < 0 ||
      uname.length < 3 ||
      uname.length > 40
    ) {
      document.getElementById("name").classList.add("is-invalid");
      setEname(
        "Please enter characters only and must have length of minimum 3 and maximum 30"
      );
    } else if (ucity === "") {
      document.getElementById("city").classList.add("is-invalid");
      setEcity("Enter City");
    } else if (uphone === "" || uphone.search(/^[789][0-9]{9}$/) < 0 || uphone.search(/^[789][0-9]{9}$/) > 11) {
      document.getElementById("phone").classList.add("is-invalid");
      setEphone("Enter valid Mobile Number");
    } else if (
      uemail === "" || 
      uemail.search(/^(?!\d)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) < 0
    ) {
      document.getElementById("email").classList.add("is-invalid");
      setEemail("Enter valid Email ID");
    } else if (
      upassword === "" ||
      upassword.search(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
      ) < 0 ||
      upassword.length < 6
    ) {
      document.getElementById("password").classList.add("is-invalid");
      setEpassword(
        "Enter a password with atleast 8 characters and must include 1 capital, 1 number and 1 special character"
      );
    } else if (upassword !== uconpassword) {
      document.getElementById("conpassword").classList.add("is-invalid");
      setEconpassword("Password mismatch.");
    } else if (usecurityAns.length <= 3 || usecurityAns.length > 40) {
      document.getElementById("securityAns").classList.add("is-invalid");
      setEsecurityAns("Enter Answer lenght above 2 or less than 40");
    } else if (document.getElementById("tnc").checked == false) {
      document.getElementById("tnc").classList.add("is-invalid");
      setEtnc("Please accept terms and conditions");
    } else {
      checkEmail(user);
    }
  };

  return (
    
    <div>
     
      <div className="vh-100 d-flex reg">
        <div className="m-auto w-50 pt-2 ps-5 pe-5 pb-2  align-self-center text-white reg-form">
          <h1 className="text-center fw-bold mb-3" style={{ color: "yellow" }}>
           GYMPRO
          </h1>
          <h1 className="text-center display-6" style={{ color: "orange" }}>Register</h1>

          <form className="row g-3 mt-1">
            <div className="col-md-6">
              <label for="name" className="form-label fs-5 m-2">
                Name
              </label>
              <input
                type="text"
                className="form-control m-2"
                id="name"
                name="name"
                placeholder="Full name"
                onChange={unameinp}
                onFocus={clearErrors}
                value={uname}
                required
              />
              <div class="invalid-feedback fs-6 fw-bold">{ename}</div>
            </div>
            <div className="col-md-6">
              <label for="city" className="form-label fs-5 p-1">
                City
              </label>
              
              <select
                id="city"
                className="form-select mt-5"
                name="city"
                onChange={ucityinp}
                onFocus={clearErrors}
                value={ucity}
                required
              >
                <option value=""></option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Navi Mumbai">Navi Mumbai</option>
                <option value="Thane">Thane</option>
              </select>
              <div class="invalid-feedback fs-6 fw-bold">{ecity}</div>
            </div>
            <div className="col-md-6">
              <label for="phone" className="form-label fs-5 m-2">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control m-2"
                name="phone"
                id="phone"
                placeholder="Without +91"
                onChange={uphoneinp}
                onFocus={clearErrors}
                value={uphone}
                required
              />
              <div class="invalid-feedback fs-6 fw-bold">{ephone}</div>
            </div>
            <div className="col-md-6">
              <label for="email" className="form-label fs-5 m-2">
                Email-ID
              </label>
              <input
                type="email"
                className="form-control m-1"
                id="email"
                name="email"
                placeholder="Eg:-abc@gmail.com"
                onChange={uemailinp}
                onFocus={clearErrors}
                value={uemail}
                required
              />
              <div class="invalid-feedback fs-6 fw-bold">{eemail}</div>
            </div>
            <div className="col-md-6">
              <label for="password" className="form-label fs-5 m-2">
                Password
              </label>
              <input
                type="password"
                className="form-control m-2"
                id="password"
                name="password"
                placeholder="Enter a strong password"
                onChange={upasswordinp}
                onFocus={clearErrors}
                value={upassword}
                required
              />
              <div className="invalid-feedback fs-6 fw-bold">{epassword}</div>
            </div>
            <div className="col-md-6">
              <label for="conpassword" className="form-label fs-5 m-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control m-1"
                id="conpassword"
                name="conpassword"
                placeholder="Confirm entered password"
                onChange={uconpasswordinp}
                onFocus={clearErrors}
                value={uconpassword}
                required
              />
              <div className="invalid-feedback fs-6 fw-bold">
                {econpassword}
              </div>
            </div>

            <div className="col-md-6">
              <label for="securityQues" className="form-label fs-5 m-2">
                Security Question
              </label>
              <select
                id="securityQues"
                className="form-select p-1 m-2"
                name="securityQues"
                onChange={usecurityquesinp}
                onFocus={clearErrors}
                value={usecurityQues}
                required
              >
                <option value="">--Select--</option>
                <option value="Which was your first gym?">
                  Which was your first gym?
                </option>
                <option value="Which is your favourite Gym Instrument?">
                  Which is your favourite Gym Instrument?
                </option>
                <option value="Which is your favourate exersize?">
                  Which is your favourate exersize?
                </option>
              </select>
              <div class="invalid-feedback fs-6 fw-bold">{esecurityQues}</div>
            </div>
            <div className="col-md-6">
              <label for="securityAnswer" className="form-label fs-5 m-2">
                Your answer
              </label>
              <input
                type="text"
                className="form-control m-1"
                id="securityAns"
                name="securityAns"
                placeholder="Reuser this for forget password"
                onChange={usecurityansinp}
                onFocus={clearErrors}
                value={usecurityAns}
                required
              />
              <div class="invalid-feedback fs-6 fw-bold">{esecurityAns}</div>
            </div>

            <div className="col-md-7 text-right mt-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="tnc"
                name="tnc"
                required
              />
              <label for="tnc" className="form-label fs-5">
                Accept terms and conditions
              </label>
              <div class="invalid-feedback fs-6 fw-bold">{etnc}</div>
            </div>
            <div className="col-md-5 text-left mt-3">
              <Link
                to="/termsandconditions"
                href="#"
                className="text-decoration-none fs-5"
                id="tnc"
              >
                Terms and Conditions
              </Link>
            </div>
            <div className="col-md-12 text-center">
              <h4 className="fs-4">
                Already Have Account ?
                
                    
                {/* <button type="button" class="btn btn-success">
                <Link to="/" href="login.html" className="text-decoration-none ">
                    Login
                </Link>
                
                </button> */}
                
                <Link
                        to="/"
                        href="login.html"
                        className="  text-decoration-none"
                        style={{ color: "darkblue" }}
                      >
                        &nbsp; &nbsp;<button type="button" class="btn btn-success">Login</button>
                      </Link>
              
              </h4>
            </div>

            <div className="col-md-12 text-center">
              <input
                type="button"
                className="btn btn-lg btn-primary"
                value="Register"
                onClick={validate}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
