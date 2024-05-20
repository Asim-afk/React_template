import { Button, Dropdown, Flex, Space, theme } from "antd";
import { useLayoutStore } from "../../../stores/layoutStore";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useAuthStore } from "../../../stores/authStore";

const items = [
  {
    key: "profile",
    label: "Profile",
  },
  {
    key: "logOut",
    label: "Log Out",
  },
];
function AdminHeader() {
  const { removeUser } = useAuthStore();
  const { collapsed, setCollapsed } = useLayoutStore();
  const {
    token: { colorIcon },
  } = theme.useToken();
  const navigate = useNavigate();

  const onClick = ({ key }) => {
    if (key === "logOut") {
      removeUser();
      navigate("/login", { state: { from: "admin/logout" } });
    }
  };

  return (
    <Flex style={{ height: "100%" }} justify="space-between" align="center">
      <Button
        type="link"
        style={{ color: colorIcon }}
        icon={
          !collapsed ? (
            <MenuFoldOutlined style={{ fontSize: "20px" }} />
          ) : (
            <MenuUnfoldOutlined style={{ fontSize: "20px" }} />
          )
        }
        onClick={() => setCollapsed(!collapsed)}
      />
      <Space size="middle" style={{ lineHeight: "0" }} align="center">
        <Dropdown
          menu={{
            items,
            onClick,
          }}
          placement="topRight"
        >
          <UserOutlined
            style={{
              fontSize: "30px",
              marginRight: "10px",
              paddingLeft: "20px",
              color: "#1677ff",
            }}
          />
        </Dropdown>
      </Space>
    </Flex>
  );
}

export default AdminHeader;
