import React from "react";

function Login() {
  return (
    <div className="container-fluid mt-5">
      <div className="d-flex justify-content-center align-items-center">
        <div className="row">
          <form action="">
            <fieldset>
              <legend>SignIn</legend>
              <div className="row">
                <div className="col-md-12">
                  <label className="form-label" htmlFor="">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Enter Email"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="form-label" htmlFor="">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="Enter Password"
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
