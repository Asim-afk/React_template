import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
export const items = [
  getItem("Dashboard", "dashboard", <DashboardOutlined />),
  getItem("Test", "test", <SettingOutlined />),
];
