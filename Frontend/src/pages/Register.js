import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("users/register", values);
      message.success("Registeration Successfull");
      setLoading(false);
      navigate("/login");
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
          <h3>Register Form</h3>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the details!' }]}>
            <Input placeholder="User Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input the details!' }]}>
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input the details!' }]}>
            <Input type="password" placeholder="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login" className="text-dark">Already Register ? Cleck Here to login</Link>
            <button className="btn btn-primary">Resgiter</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
