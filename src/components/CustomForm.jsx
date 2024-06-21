import "./CustomForm.css";

export default function CustomForm() {
  return (
    <>
      <div class="cont">
        <div class="sub-cont">
          <div class="img">
            <div class="img-text m-up">
              <h1>New here?</h1>
              <p>sign up and discover</p>
            </div>
            <div class="img-btn">
              <span class="m-up">Sign Up</span>
              <span class="m-in">Sign In</span>
            </div>
          </div>
          <div class="form sign-up">
            <h2>Sign Up</h2>
            <label>
              <span>Name</span>
              <input type="text" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" />
            </label>
            <label>
              <span>Confirm Password</span>
              <input type="password" />
            </label>
            <button type="button" class="submit">
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
