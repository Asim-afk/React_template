import { Outlet } from "react-router-dom";

import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import AdminSider from "./AdminSider";
import { Layout, theme } from "antd";
import { useLayoutStore } from "../../../stores/layoutStore";
import { useState } from "react";

const { Header, Content, Footer } = Layout;
function AdminLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG, bodyBg, colorBorder },
  } = theme.useToken();
  const { collapsed, setCollapsed } = useLayoutStore();
  const [breakpoint, setBreakpoint] = useState(false);

  return (
    <Layout hasSider style={{ height: "100vh" }}>
      <AdminSider breakpoint={breakpoint} setBreakpoint={setBreakpoint} />
      <Layout style={{ backgroundColor: bodyBg }}>
        {breakpoint && !collapsed && (
          <div
            onClick={() => {
              setCollapsed(true);
            }}
            style={{
              zIndex: "99",
              position: "absolute",
              height: "100vh",
              width: "100vw",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          ></div>
        )}
        <Header
          style={{
            background: colorBgContainer,
            borderBottom: `1px solid  ${colorBorder} `,
          }}
        >
          <AdminHeader />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            overflow: "auto",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer>
          <AdminFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
