import React, { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { parseErrors } from "../../utils/parseErrors";
import Alerts from "../alert/Alerts";
import { useApi } from "../../components/hooks/useApi";

export default function register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [alert, setAlert] = useState({});
  const { post } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if password and confirm password are the same
    if (password !== confirmPassword) {
      setAlert({
        message: "Password and Confirm Password do not match",
        details: [],
      });
      return;
    }

    const data = {
      firstname,
      lastname,
      email,
      password,
      username: email, //this is in the postman user name is not a state, but since email is the username then we put like this. but if the user name is something different from the above states then we make a state for the username.
    };

    const handleSuccess = () => {
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAlert({
        message: "Registration is Successful",
        details: [],
        type: "success",
      }); //it removes all the error alert on the screen if all the details are correct and prints successful
    };

    await post("auth/local/register", {
      data: data,
      onSuccess: (res) => handleSuccess(),
      onFailure: (err) => setAlert(err),
    });
  };

  return (
    <>
      <Alerts data={alert} />
      <form className="form form--page" onSubmit={handleSubmit}>
        <div className="form__group form__group--page">
          <label className="form__label">First name</label>
          <input
            className="form__field"
            type="text"
            placeholder="First name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Last name</label>
          <input
            className="form__field"
            type="text"
            placeholder="Last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Email</label>
          <input
            className="form__field"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Choose password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Choose password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Confirm Password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Register" />
        </div>

        <footer>
          Already have an account? <Link to="/login">Login</Link>
        </footer>
      </form>
    </>
  );
}
