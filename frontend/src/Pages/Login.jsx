import React from 'react';

const Login = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register or Login</h2>
      <p className="text-center mb-5">Enter your details</p>

      <div className="row justify-content-center">
       

        {/* Login Form */}
        <div className="col-md-6">
          <div className="card p-4">
            <form>
              <div className="form-group mb-3">
                <label htmlFor="loginEmail">Email address</label>
                <input type="email" className="form-control" id="loginEmail" placeholder="name@example.com" />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="loginPassword">Password</label>
                <input type="password" className="form-control" id="loginPassword" placeholder="********" />
              </div>
              <button type="submit" className="btn btn-dark w-100">Login</button>
            </form>
          </div>
        </div>


 {/* Register Form */}
 <div className="col-md-6 mb-4">
          <div className="card p-4">
            <form>
              <div className="form-group mb-3">
                <label htmlFor="registerName">Name</label>
                <input type="text" className="form-control" id="registerName" placeholder="John Doe" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="registerEmail">Email address</label>
                <input type="email" className="form-control" id="registerEmail" placeholder="name@example.com" />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="registerPassword">Password</label>
                <input type="password" className="form-control" id="registerPassword" placeholder="********" />
              </div>
              <button type="submit" className="btn btn-dark w-100">Register</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
