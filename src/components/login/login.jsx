import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss";
import Alerts from "../alert/Alerts";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../components/hooks/useApi";

export default function login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState("");

  const navigate = useNavigate(); //useNavigate is a function
  const { post } = useApi();

  const handleSuccess = () => {
    //reset the states to empty after submitting form
    setIdentifier("");
    setPassword("");
    //navigate to homepage
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default for submission of form

    const data = {
      identifier,
      password,
    };

    await post("auth/local", {
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
          <label className="form__label">Email</label>
          <input
            className="form__field"
            type="email"
            placeholder="Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Login" />
        </div>

        <footer>
          Dont have an account? <Link to="/register">Register</Link>
          or <Link to="/forgot-password">Forgort Password</Link>
        </footer>
      </form>
    </>
  );
}
