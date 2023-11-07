import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss";
import Alerts from "../alert/Alerts";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../components/hooks/useApi";

export default function forgot_password() {
  const [email, setEmail] = useState("");

  const [alert, setAlert] = useState("");

  const navigate = useNavigate(); //useNavigate is a function
  const { post } = useApi();

  const handleSuccess = () => {
    //reset the states to empty after submitting form
    setEmail("");

    //success message
    setAlert({
      type: "success",
      message: "Please check your email for further instruction.",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default for form submission

    await post("auth/forgot-password", {
      data: { email },
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Send Email" />
        </div>

        <footer>
          Have an account? <Link to="/login">Login</Link>
        </footer>
      </form>
    </>
  );
}
