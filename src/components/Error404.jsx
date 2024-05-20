import { Card, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function Error404() {
  const [redirectTime, setRedirectTime] = useState(50000);
  const location = useLocation();
  const isAdmin = useMemo(() => {
    const pathSegments = location.pathname.split("/");
    return pathSegments[1] === "admin";
  }, [location.pathname]);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      if (redirectTime > 0) {
        setRedirectTime(redirectTime - 1);
      } else {
        clearInterval(timer);
        navigate("/admin/dashboard");
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [redirectTime, navigate]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff991f",
        height: isAdmin ? "60vh" : "100vh",
        width: "100%",
        borderRadius: isAdmin ? "10px" : "0px",
      }}
    >
      <Card
        className="error-card"
        bordered="false"
        style={{
          display: "flex",
          alignItems: "center",
          bottom: !isAdmin ? "100px" : "40px",
          justifyContent: "center",
          border: "none",
        }}
      >
        <Typography.Title level={3}>404 Page Not Found</Typography.Title>
        <p>
          <Link to="/admin/dashboard">Back to homepage</Link>
        </p>
        <Typography.Paragraph>
          Redirecting to the home page in
          <span style={{ color: "#1677ff" }}> {redirectTime}</span> seconds...
        </Typography.Paragraph>
      </Card>
    </div>
  );
}
