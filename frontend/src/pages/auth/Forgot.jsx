import { Link } from "react-router-dom"
import LogoWhite from "../../assets/img/logo-white.png"

const Forgot = () => {
  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox d-flex justify-content-center align-items-center">
              <div className="">
                <div className="">
                  <h1>Forgot Password?</h1>
                  <p className="account-subtitle">Enter your email to get a password reset link</p>
                  
                  <form action="/login">
                    <div className="form-group">
                      <input className="form-control" type="text" placeholder="Email" />
                    </div>
                    <div className="form-group mb-0">
                      <button className="btn btn-primary btn-block" type="submit">Send</button>
                    </div>
                  </form>

                  <div className="text-center dont-have">Remember your password? <Link to={'/login'}>Login</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Forgot