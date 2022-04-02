import React from "react";

function LogInMain() {
  return (
    <div>
      <div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <div>
            <div>
              <h1>Welcome back!</h1>
              <p>It's great to have you back!</p>
            </div>

            <div>
              <label>Username</label>
              <input type="text" />
            </div>

            <div>
              <label>Password</label>
              <input type="password" />
            </div>

            <div>
              <div>
                <input type="checkbox" />
                <label>Remember me?</label>
              </div>

              <p>Forgot password?</p>
            </div>

            <div>
              <input type="submit" value="Login"/>
              <button>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInMain;
