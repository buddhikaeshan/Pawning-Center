import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleSignIn from "../components/GoogleSignIn.jsx"; 
import { auth } from "../config/Firebase.js"
import config from "../config.js";

const Login = ({ onLogin }) => {
  const [obscure, setObscure] = useState(true);
  const obscureIcon = obscure ? faEye : faEyeSlash;
  const inputType = obscure ? "password" : "text";

  const handleObscure = () => setObscure(!obscure);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "" });
  const [processing, setProcessing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validate = () => {
    let tempErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setProcessing(true);

      const postData = {
        email: formData.email,
        password: formData.password,
      };

      try {
        const response = await axios.post(config.BASE_URL + "/login", postData);
        const responseType = response.data.message_type;

        if (responseType === "error") {
          setMessage(response.data.message);
          setAlertType("alert alert-danger");
          setShowAlert(true);
        } else {
          onLogin(
            response.data.email,
            response.data.token,
            response.data.user_type,
            response.data.profile_completed
          );
        }
      } catch (error) {
        setMessage("Error submitting form: " + error);
        setAlertType("alert alert-danger");
        setShowAlert(true);
      } finally {
        setProcessing(false);
      }
    } else {
      console.log("Please correct the errors in the form.");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const postData = {
        name: user.displayName,
        email: user.email,
        social: "Google",
        image: user.photoURL,
      };

      const response = await axios.post(
        config.BASE_URL + "/social_sign",
        postData
      );
      const responseType = response.data.message_type;

      if (responseType === "error") {
        setMessage(response.data.message);
        setAlertType("alert alert-danger");
        setShowAlert(true);
      } else {
        onLogin(
          response.data.email,
          response.data.token,
          response.data.user_type,
          response.data.profile_completed
        );
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setMessage("Error signing in with Google: " + error);
      setAlertType("alert alert-danger");
      setShowAlert(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register or Login</h2>
      <p className="text-center mb-5">Enter your details</p>

      {showAlert && <div className={alertType}>{message}</div>}

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
              <div className="input-group mb-4">
                <label className="input-group-text" htmlFor="password">
                  Password
                </label>
                <input
                  type={inputType}
                  className="form-control"
                  id="password"
                  onChange={handleChange}
                  value={formData.password}
                />
                <button
                  className="input-group-text cursor-pointer"
                  type="button"
                  id="obscure"
                  onClick={handleObscure}
                >
                  <FontAwesomeIcon icon={obscureIcon} />
                </button>
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>
              <button type="submit" className="btn btn-dark w-100">
                {processing ? "Processing..." : "Login"}
              </button>
            </form>

            <div className="row mt-1">
              <div className="col-md-5">
                <hr />
              </div>
              <div className="col-md-2 mt-1">
                <p className="text-center">OR</p>
              </div>
              <div className="col-md-5">
                <hr />
              </div>
            </div>

            <div className="row mt-3 justify-content-center">
              <div className="col-md-2">
                <GoogleSignIn signIn={handleGoogleSignIn} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
