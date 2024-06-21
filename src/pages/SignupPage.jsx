import { useNavigate } from "react-router-dom";
import classes from "./SignupPage.module.css";
import { useRef, useState, useEffect } from "react";

export default function SignupPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [designations, setDesignations] = useState([]);

  const navigate = useNavigate();

  const fname = useRef("");
  const lname = useRef("");
  const doj = useRef("");
  const contact = useRef();
  const email = useRef("");
  const designation = useRef("");
  const password = useRef("");

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await fetch("http://localhost:8083/designations");

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          // {
          //   data.map((designation) =>
          //     console.log(designation.id + " " + designation.designationName)
          //   );
          // }
          setDesignations(data);
        } else {
          console.error("Error fetching designations:", response.status);
        }
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    fetchDesignations();
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;

    if (!isNaN(value) && value.length < 11) {
      setPhoneNumber(value);
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  function handleSignup() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const obj = {
      firstName: fname.current.value,
      lastName: lname.current.value,
      designation: designation.current.value,
      dateOfJoining: doj.current.value,
      contactNumber: contact.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    if (obj.firstName.length <= 2) {
      alert("firstname is short");
    } else if (obj.designation < 1) {
      alert("incorrect designation");
    } else if (
      new Date(obj.dateOfJoining) < new Date("2008-01-09") ||
      new Date(obj.dateOfJoining) > new Date()
    ) {
      alert("incorrect date..");
    } else if (obj.contactNumber.length < 10) {
      alert("Check contact no again..");
    } else if (!emailPattern.test(obj.email)) {
      alert("No such email..");
    } else if (obj.password.length < 8) {
      alert("password is too short");
    } else {
      const login = async () => {
        try {
          console.log(obj);
          const response = await fetch(
            "http://localhost:8083/employee/createEmployee",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(obj),
            }
          );

          console.log(response);
          if (!response.ok) {
            const data = await response.text();
            alert(data);
          } else {
            alert("Signup Succesful...");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      login();
    }
  }
  console.log("logged");
  return (
    <div className={classes["form-container"]}>
      <div className={classes["content-container"]}>
        <h2>Sign up</h2>
        <form className={classes["form-content"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              ref={fname}
              required
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" ref={lname} />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="dateOfJoining">Date of Joining:</label>
            <input
              type="date"
              id="dateOfJoining"
              name="dateOfJoining"
              min="2008-01-09"
              ref={doj}
              required
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="designation">Designation:</label>

            <select
              id="designation"
              name="designation"
              ref={designation}
              required
            >
              <option value="" disabled hidden selected>
                Select a designation
              </option>
              {designations.map((designation) => (
                <option key={designation.id} value={designation.id}>
                  {designation.designationName}
                </option>
              ))}
            </select>
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="contactno">Contact No.:</label>
            <input
              type="text"
              id="contactno"
              name="contactno"
              ref={contact}
              onChange={handleChange}
              value={phoneNumber}
              required
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" ref={email} required />
          </div>

          <div className={classes["form-group"]}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={password}
              required
            />
          </div>
          <div className={classes["form-group"]}></div>
          <button
            className={classes.formButton}
            type="button"
            onClick={handleSignup}
          >
            Signup
          </button>
        </form>
        <button className={classes.loginButton} onClick={handleLoginClick}>
          already a user
        </button>
      </div>
    </div>
  );
}
