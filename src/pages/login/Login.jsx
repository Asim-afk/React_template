/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Input, Form, Row, Card, Spin, Layout, Typography } from "antd";
import { login } from "../../Apis/TestApi";
import style from "../style.module.css";
import { useAuthStore } from "../../stores/authStore";
function Login() {
  const { setUserData } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUserData({
        isLoggedIn: data.isLoggedIn,
        role: data.role,
        token: data.token,
      }),
        navigate("/admin");
    },
    onError: (err) => {
      alert(err);
    },
  });
  const handleFormSubmit = async () => {
    mutation.mutate({ email: email, password });
  };
  const rules = {
    email: [
      {
        type: "email",
        message: "The input is not valid E-mail!",
      },
      {
        required: true,
        message: "Please enter your E-mail!",
      },
    ],
    password: [
      {
        required: true,
        message: "Please enter password!",
      },
    ],
  };
  function cusToken() {
    setUserData({
      isLoggedIn: true,
      role: "user",
      token: "token",
    });
    navigate("/admin");
  }
  return (
    <Spin spinning={mutation.isPending}>
      <Layout>
        <Row justify="center" align="top" style={{ height: "100vh" }}>
          <Card className={style.loginCard}>
            <Typography.Title level={2}>Login</Typography.Title>
            <br />
            <Form layout="vertical" onFinish={handleFormSubmit}>
              <Form.Item rules={rules.email} label="Username" name="uname">
                <Input
                  type="text"
                  placeholder="Enter Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                rules={rules.password}
                label="Password"
                placeholder="Enter Password"
                name="psw"
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" block htmlType="submit">
                  Login
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" block onClick={cusToken}>
                  Token
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Row>
      </Layout>
    </Spin>
  );
}

const LoginWrapper = () => {
  const { userData } = useAuthStore();
  return userData.isLoggedIn ? <Navigate to={"/admin"} /> : <Login />;
};

export default LoginWrapper;
