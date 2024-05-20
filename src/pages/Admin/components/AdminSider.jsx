/* eslint-disable react/prop-types */
import { Button, Layout, Menu, Typography, theme } from "antd";
import { items } from "../../../config/NavigationConfig";
import { useLayoutStore } from "../../../stores/layoutStore";
import { MenuFoldOutlined } from "@ant-design/icons";
import { APP_NAME } from "../../../config/AppConfig";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;
function AdminSider({ breakpoint, setBreakpoint }) {
  const navigate = useNavigate();

  const { collapsed, setCollapsed } = useLayoutStore();
  const {
    token: { colorBorder, colorIcon },
  } = theme.useToken();

  const onMenuClick = (data) => {
    navigate(`${data.key}`);
  };

  return (
    <Sider
      style={{
        height: "100vh",
        position: breakpoint ? "fixed" : "sticky",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        overflowY: "auto",
        boxShadow: breakpoint && "10px 0px 20px rgba(0,0,0,0.1)",
      }}
      theme="light"
      width={"250px"}
      breakpoint="lg"
      collapsedWidth={breakpoint ? "0" : "100px"}
      trigger={null}
      onBreakpoint={(broken) => {
        setBreakpoint(broken);
        setCollapsed(broken);
      }}
      collapsible={true}
      collapsed={collapsed}
    >
      <div
        style={{
          height: "64px",
          borderBottom: `1px solid ${colorBorder}`,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {!collapsed && (
          <Typography.Title level={2}>{APP_NAME}</Typography.Title>
        )}
        {breakpoint && !collapsed && (
          <Button
            onClick={() => setCollapsed(true)}
            type="link"
            style={{ color: colorIcon }}
            icon={<MenuFoldOutlined style={{ fontSize: "20px" }} />}
          />
        )}
      </div>
      <div
        style={{
          height: "calc(100% - 64px)",
          overflow: "auto",
          borderRight: !breakpoint ? `1px solid ${colorBorder}` : null,
          padding: "24px 0",
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          onClick={onMenuClick}
        />
      </div>
    </Sider>
  );
}

export default AdminSider;
