import "./Profile.css";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Profile() {
  // password field
  const [obscurePassword, setObscurePassword] = useState(true);
  const passwordIcon = obscurePassword ? faEye : faEyeSlash;
  const passwordInputType = obscurePassword ? "password" : "text";
  const togglePasswordObscure = () => setObscurePassword(!obscurePassword);

  //  confirm password field
  const [obscureConfirmPassword, setObscureConfirmPassword] = useState(true);
  const confirmPasswordIcon = obscureConfirmPassword ? faEye : faEyeSlash;
  const confirmPasswordInputType = obscureConfirmPassword ? "password" : "text";
  const toggleConfirmPasswordObscure = () => setObscureConfirmPassword(!obscureConfirmPassword);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col-md-12">
          <form>
            <fieldset>
              <legend>Profile</legend>
              <div className="row">
                <div className="col-md-12">
                  <label className="form-label mt-4"> Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="form-label mt-4"> Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-10">
                  <label>Password:</label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type={passwordInputType}
                      name="Password"
                      id="password"
                      placeholder="Password"
                    />
                    <button
                      className="input-group-text cursor-pointer"
                      type="button"
                      id="obscure"
                      onClick={togglePasswordObscure}
                    >
                      <FontAwesomeIcon icon={passwordIcon} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10">
                  <label className="form-label mt-4">Confirm Password: </label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type={confirmPasswordInputType}
                      name="password"
                      id="password"
                      placeholder="Confirm password"
                    />
                    <button
                      className="input-group-text cursor-pointer"
                      type="button"
                      id="obscure"
                      onClick={toggleConfirmPasswordObscure}
                    >
                      <FontAwesomeIcon icon={confirmPasswordIcon} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
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
