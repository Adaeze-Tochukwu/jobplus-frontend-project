import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss";
import axios from "axios";
import Alerts from "../alert/Alerts";
import { parseErrors } from "../../utils/parseErrors";
import { useNavigate, useLocation } from "react-router-dom";
import { useApi } from "../../components/hooks/useApi";

export default function reset_password() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [alert, setAlert] = useState("");

  const navigate = useNavigate(); //useNavigate is a function
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  const { post } = useApi;

  const handleSuccess = () => {
    //reset the states to empty after submitting form
    setPassword("");
    setPasswordConfirmation("");

    //navigate to login page
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default for form submission

    const data = {
      password,
      passwordConfirmation,
      code,
    };

    await post("auth/reset-password", {
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
          <label className="form__label">Password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Password"
            value={password}
            c
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Confirm Password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Reset Password" />
        </div>

        <footer>
          Remember Your Password? <Link to="/login">Login</Link>
        </footer>
      </form>
    </>
  );
}
