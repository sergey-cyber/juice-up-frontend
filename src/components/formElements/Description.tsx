import { Form, Input } from "antd";
import { CSSProperties } from "react";

export const Description = (props: { style?: CSSProperties }) => {
  return (
    <Form.Item name={"description"} label="Description">
      <Input.TextArea style={{ minHeight: "15vh", ...props.style }} />
    </Form.Item>
  );
};
