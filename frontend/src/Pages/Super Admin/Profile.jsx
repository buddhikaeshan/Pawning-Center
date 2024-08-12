import React, { useState } from "react";
import {
  faCheck,
  faEye,
  faEyeSlash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import config from "../../config";
import './Profile.css';

function Profile() {
  const base_url = config.BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({ password: "", cpassword: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [obscure, setObscure] = useState(true);
  const obscureIcon = obscure ? faEye : faEyeSlash;
  const inputType = obscure ? "password" : "text";
  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    capital: false,
    simple: false,
    number: false,
  });

  const handleObscure = () => setObscure(!obscure);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (id === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    setPasswordValidity({
      length: password.length >= 8,
      capital: /[A-Z]/.test(password),
      simple: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    });
  };

  const validate = () => {
    let tempErrors = { password: "", cpassword: "" };
    let isValid = true;

    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else {
      if (!passwordValidity.length) {
        tempErrors.password = "Password must be at least 8 characters";
        isValid = false;
      }
      if (!passwordValidity.capital) {
        tempErrors.password = "Password must contain at least 1 capital letter";
        isValid = false;
      }
      if (!passwordValidity.simple) {
        tempErrors.password = "Password must contain at least 1 simple letter";
        isValid = false;
      }
      if (!passwordValidity.number) {
        tempErrors.password = "Password must contain at least 1 number";
        isValid = false;
      }
    }
    if (formData.password !== formData.cpassword) {
      tempErrors.cpassword = "Passwords do not match";
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
        const response = await axios.post(
          base_url + "/change_password",
          postData
        );
        const responseType = response.data.message_type;

        if (responseType === "error") {
          setMessage(response.data.message);
          setAlertType("alert alert-danger");
          setShowAlert(true);
        } else {
          setMessage(response.data.message);
          setAlertType("alert alert-" + responseType);
          setShowAlert(true);
        }
      } catch (error) {
        setMessage("Error submitting form:" + error);
        setAlertType("alert alert-danger");
        setShowAlert(true);
      } finally {
        setProcessing(false);
      }
    }
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />

        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <h5>Profile</h5>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className="custom-form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="custom-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="custom-form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <input
                      type={inputType}
                      id="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <button
                      type="button"
                      onClick={handleObscure}
                      className="input-group-text cursor-pointer"
                    >
                      <FontAwesomeIcon icon={obscureIcon} />
                    </button>
                  </div>
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                  <div className="mt-2">
                    <p
                      className={
                        passwordValidity.length ? "text-success" : "text-danger"
                      }
                    >
                      <FontAwesomeIcon
                        icon={passwordValidity.length ? faCheck : faTimes}
                      />{" "}
                      At least 8 characters
                    </p>
                    <p
                      className={
                        passwordValidity.capital
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      <FontAwesomeIcon
                        icon={passwordValidity.capital ? faCheck : faTimes}
                      />{" "}
                      At least 1 capital letter
                    </p>
                    <p
                      className={
                        passwordValidity.simple ? "text-success" : "text-danger"
                      }
                    >
                      <FontAwesomeIcon
                        icon={passwordValidity.simple ? faCheck : faTimes}
                      />{" "}
                      At least 1 simple letter
                    </p>
                    <p
                      className={
                        passwordValidity.number ? "text-success" : "text-danger"
                      }
                    >
                      <FontAwesomeIcon
                        icon={passwordValidity.number ? faCheck : faTimes}
                      />{" "}
                      At least 1 number
                    </p>
                  </div>
                </div>
                <div className="custom-form-group">
                  <label htmlFor="cpassword">Confirm Password</label>
                  <input
                    type={inputType}
                    id="cpassword"
                    placeholder="Confirm Password"
                    value={formData.cpassword}
                    onChange={handleChange}
                    className="form-control"
                  />
                  {errors.cpassword && (
                    <small className="text-danger">{errors.cpassword}</small>
                  )}
                </div>

                <div className="custom-form-group">
                  <button type="submit" className="btnall btnSave btn-primary">
                    {processing ? "Submitting..." : "Save Changes"}
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
