import { useContext } from "react";
import { StateContext } from "../store/context-store";
import Button from "../components/Button";
import classes from "./HomePage.module.css";
import CardWithImage from "../components/CardWithImage";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const stateCtx = useContext(StateContext);
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");
  console.log(user);
  const userDetails = user && JSON.parse(user);

  function handleClick() {
    console.log(userDetails);
    if (!user) navigate("/login");
    else if (userDetails.roleId === 1) {
      navigate("/admin/profile");
    } else {
      navigate("/user");
    }
  }

  function handleSignup() {
    navigate("/signup");
  }
  return (
    <>
      {console.log(stateCtx.roleId)}
      <h1>Welcome to hell!!</h1>
      <p>Its a pleasure having you here {user && userDetails.firstName}</p>
      {console.log(userDetails)}
      <div className={classes.buttonc}>
        {console.log("in home" + stateCtx.login)}
        <Button
          name="login"
          handleClick={handleClick}
          label={user ? "Welcome" : "Login"}
        />
        {!user && (
          <Button name="signin" handleClick={handleSignup} label={"Sign Up"} />
        )}
      </div>

      <CardWithImage
        imageUrl="https://img.atlasobscura.com/BNPmoJFzYzuFbfFE_FmNsCw0jmNgSC9CAELeduhNEnU/rt:fit/w:1280/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL2Fzc2V0/cy80NzFjZjA5MTlm/MzFlMDgzNzJfQXN0/cm90b3VyaXNtX01v/bnVtZW50X1ZhbGxl/eS5qcGVn.jpg"
        title="Technobase"
        description="For years, small groups of astronomy enthusiasts have traveled the globe chasing the rare solar eclipse. They have embarked on cruises to the middle of the ocean, taken flights into the eclipse’s path, and even traveled to Antarctica."
      />
    </>
  );
}
