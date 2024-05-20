import { Card } from "antd";
import Colorpicker from "../../components/Colorpicker";
import useColorPickerStore from "../../stores/colorPickerStore";
export default function Test() {
  const { secondaryColor } = useColorPickerStore();

  return (
    <Card
      bordered={false}
      className="box-shadow"
      style={{ width: "100%", background: secondaryColor }}
    >
      <Colorpicker />
    </Card>
  );
}
