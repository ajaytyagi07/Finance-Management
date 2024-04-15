import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../Styles/Login.css";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("users/login", values);
      setLoading(false);
      message.success("Login successfully");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      {loading && <Spinner />}
      <div className="resgister-page d-flex">
        <Form layout="vertical" onFinish={submitHandler}>
          <h2>Welcome to Finance Management!!</h2>
          <h3>Login Form</h3>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input the details!' }]}>
            <Input type="email" placeholder="User Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input the details!' }]}>
            <Input type="password" placeholder="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/register" className="text-dark">Not a user ? Cleck Here to regsiter</Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
