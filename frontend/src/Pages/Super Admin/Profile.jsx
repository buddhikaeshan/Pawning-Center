import "./Profile.css";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Profile() {
  const [formData, setFormData] = useState({
    password: "",
    cpassword: "",
  });

  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    capital: false,
    simple: false,
    number: false,
  });

  const [errors, setErrors] = useState({
    password: "",
    cpassword: "",
  });

  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [passwordObscure, setPasswordObscure] = useState(true);
  const [confirmPasswordObscure, setConfirmPasswordObscure] = useState(true);

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
        tempErrors.password =
          "Password must contain at least 1 lowercase letter";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setMessage("Form submitted successfully!");
      setAlertType("alert alert-success");
      setShowAlert(true);
    } else {
      setMessage("Please correct the errors and try again.");
      setAlertType("alert alert-danger");
      setShowAlert(true);
    }
  };

  const handleObscurePassword = () => {
    setPasswordObscure(!passwordObscure);
  };

  const handleObscureConfirmPassword = () => {
    setConfirmPasswordObscure(!confirmPasswordObscure);
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar/>
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Profile</legend>

              <div className="row">
                <div className="col-md-12">
                  <label className="form-label mt-4">Name</label>
                  <input type="text" className="form-control" />
                  </div>
                </div>

              <div className="row">
                <div className="col-md-12">
                  <label className="form-label mt-4">Password</label>
                  <div className="input-wrapper">
                    <input
                      type={passwordObscure ? "password" : "text"}
                      id="password"
                      className="form-control "
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      className="input-group-text cursor-pointer"
                      type="button"
                      id="obscure"
                      onClick={handleObscurePassword}
                    >
                      <FontAwesomeIcon
                        icon={passwordObscure ? faEye : faEyeSlash}
                      />
                    </button>
                  </div>
                  {errors.password && (
                    <div className="text-danger mt-2">{errors.password}</div>
                  )}
                  <div className="mt-2">
                    <ul>
                      <li
                        className={
                          passwordValidity.length
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        Password must be at least 8 characters
                      </li>
                      <li
                        className={
                          passwordValidity.capital
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        Password must contain at least 1 capital letter
                      </li>
                      <li
                        className={
                          passwordValidity.simple
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        Password must contain at least 1 lowercase letter
                      </li>
                      <li
                        className={
                          passwordValidity.number
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        Password must contain at least 1 number
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <label className="form-label mt-4">Confirm Password</label>
                  <div className="input-wrapper">
                    <input
                      type={confirmPasswordObscure ? "password" : "text"}
                      id="cpassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={formData.cpassword}
                      onChange={handleChange}
                    />
                    <button
                      className="input-group-text cursor-pointer"
                      type="button"
                      id="obscure"
                      onClick={handleObscureConfirmPassword}
                    >
                      <FontAwesomeIcon
                        icon={confirmPasswordObscure ? faEye : faEyeSlash}
                      />
                    </button>
                  </div>
                  {errors.cpassword && (
                    <div className="text-danger mt-2">{errors.cpassword}</div>
                  )}
                </div>
              </div>

              {showAlert && (
                <div className={alertType + " mt-3"} role="alert">
                  {message}
                </div>
              )}

              <div className="row mt-4">
                <div className="col-md-6">
                  <button className="btnall" type="submit">
                    Save Changes
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
